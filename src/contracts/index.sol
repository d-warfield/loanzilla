// SPDX-License-Identifier: MIT

pragma solidity ^0.8.10;

import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

contract LendZilla is IERC721Receiver, Ownable {
    mapping(uint256 => Loan) public loans;
    mapping(uint256 => LoanOffer[]) public loanOffers;
    mapping(address => uint256) public feeBalances;
    uint256 loanCount;
    uint256 public fee;
    bool public paused;

    struct Loan {
        address borrower;
        address lender;
        bool collateralInUse;
        LoanTerms loanTerms;
        LoanToken loanToken;
    }

    struct LoanTerms {
        IERC20 currency;
        uint256 principle;
        uint256 interestRate;
        uint256 duration;
        uint256 maturity;
    }

    struct LoanToken {
        ERC721 tokenAddress;
        uint256 tokenId;
    }

    struct LoanOffer {
        address lender;
        uint256 principle;
        uint256 interestRate;
        uint256 duration;
        uint256 expires;
    }

    event BorrowerCreatedLoanRequest(
        uint256 loanId,
        address borrower,
        bytes termsData,
        bytes tokenData
    );

    event LenderMadeLoanOffer(
        uint256 loanId,
        address lender,
        uint256 principle,
        uint256 interestRate,
        uint256 duration,
        uint256 expires
    );

    event LenderAcceptOffer(
        uint256 loanId,
        address borrower,
        address lender,
        bytes loanTerms
    );

    event BorrowerAcceptOffer(
        uint256 loanId,
        address borrower,
        address lender,
        bytes loanTerms
    );

    event LoanRepaid(uint256 loanId, address borrower, address lender);
    event LenderWithdrewCollateral(
        uint256 loanId,
        address lender,
        address borrower
    );
    event BorrowerWithdrewCollateral(
        uint256 loanId,
        address borrower,
        address lender
    );

    constructor() {
        paused = false;
        fee = 25;
    }

    /**
     * @dev Requires msg.sender to be loan owner
     */
    modifier isLoanOwner(uint256 loanId) {
        require(
            loans[loanId].borrower == msg.sender,
            "You are not the loan owner"
        );
        _;
    }

    /**
        * @dev Requires msg.sender to be loan borrower

        */
    modifier collateralNotInUse(uint256 loanId) {
        require(
            loans[loanId].collateralInUse == false,
            "This collateral is already in use"
        );
        _;
    }

    /**
     * @dev Requires msg.sender to be loan lender
     */
    modifier isLender(uint256 loanId) {
        Loan memory loan = loans[loanId];
        require(msg.sender == loan.lender, "You are not the lender.");
        _;
    }

    /**
     * @dev Allows smart contract to receive ERC721 tokens
     *
     * Requirements:
     * - Requires `safeTransferFrom` with `data` argument to receive NFT
     */
    function onERC721Received(
        address,
        address from,
        uint256 tokenId,
        bytes calldata data
    ) external returns (bytes4) {
        require(!paused, "This contract is not issuing loans");
        (
            IERC20 currency,
            uint256 principle,
            uint256 interestRate,
            uint256 duration
        ) = decode(data);
        require(principle > 0, "The principle needs to be greater than 0");
        require(
            interestRate > 0,
            "The interest rate needs to be greater than 0"
        );
        require(
            duration > 0,
            "The duration of the loans needs to be greater than 0 days long"
        );
        loanCount = loanCount + 1;
        uint256 loanId = generateLoanId(msg.sender, tokenId, loanCount);

        loans[loanId] = Loan({
            borrower: from,
            lender: address(0),
            collateralInUse: false,
            loanTerms: LoanTerms(
                currency,
                principle,
                interestRate,
                duration,
                0
            ),
            loanToken: LoanToken(ERC721(msg.sender), tokenId)
        });

        emit BorrowerCreatedLoanRequest(
            loanId,
            from,
            abi.encode(address(currency), principle, interestRate, duration),
            abi.encode(ERC721(msg.sender), tokenId)
        );

        return this.onERC721Received.selector;
    }

    function lenderMakeOffer(
        uint256 loanId,
        uint256 principle,
        uint256 interestRate,
        uint256 duration,
        uint256 expires
    ) public collateralNotInUse(loanId) {
        // write function to check if already made offer, if made update, else create a new loan offer
        LoanOffer[] storage loanOffer = loanOffers[loanId];
        loanOffer.push(
            LoanOffer(
                msg.sender,
                principle,
                interestRate,
                duration,
                block.timestamp + (expires * 1 days)
            )
        );

        emit LenderMadeLoanOffer(
            loanId,
            msg.sender,
            principle,
            interestRate,
            duration,
            block.timestamp + (expires * 1 days)
        );
    }

    // lender accepts
    function lenderAcceptOffer(uint256 loanId)
        public
        collateralNotInUse(loanId)
    {
        Loan storage loan = loans[loanId];
        loan.collateralInUse = true;
        loan.lender = msg.sender;
        loan.loanTerms.maturity =
            block.timestamp +
            (loan.loanTerms.duration * 1 days);
        loan.loanTerms.currency.transferFrom(
            msg.sender,
            loan.borrower,
            loan.loanTerms.principle
        );

        delete loanOffers[loanId];

        emit LenderAcceptOffer(
            loanId,
            loan.borrower,
            msg.sender,
            abi.encode(loan.loanTerms)
        );
    }

    // borrower accepts loan offer
    function borrowerAcceptOffer(uint256 loanId, uint256 acceptIndex)
        public
        isLoanOwner(loanId)
        collateralNotInUse(loanId)
    {
        Loan storage loan = loans[loanId];
        LoanOffer storage loanOffer = loanOffers[loanId][acceptIndex];
        require(
            block.timestamp < loanOffer.expires,
            "This loan offer has expired"
        );
        loan.collateralInUse = true;
        loan.lender = loanOffer.lender;
        loan.loanTerms = LoanTerms({
            currency: loan.loanTerms.currency,
            principle: loanOffer.principle,
            interestRate: loanOffer.interestRate,
            duration: loanOffer.duration,
            maturity: block.timestamp + (loanOffer.duration * 1 days)
        });

        loan.loanTerms.currency.transferFrom(
            loan.lender,
            loan.borrower,
            loan.loanTerms.principle
        );

        delete loanOffers[loanId];

        emit BorrowerAcceptOffer(
            loanId,
            loan.borrower,
            loan.lender,
            abi.encode(loan.loanTerms)
        );
    }

    /**
     * @dev Allows borrower to repay lender and deletes the loan
     *
     * Requirements:
     * - Borrower or someone else needs to repay loan on or before the loan maturity date
     */
    function repayLoan(uint256 loanId) public isLoanOwner(loanId) {
        Loan memory loan = loans[loanId];
        require(
            block.timestamp < loan.loanTerms.maturity,
            "Your loan repayment is too late"
        );
        IERC721 token = IERC721(loan.loanToken.tokenAddress);
        IERC20 currency = loan.loanTerms.currency;
        uint256 principle = loan.loanTerms.principle;
        uint256 interest = (principle * loan.loanTerms.interestRate) / 1000;
        uint256 repaymentAmount = principle + interest;

        uint256 totalFees = (repaymentAmount * fee) / 1000;
        feeBalances[address(currency)] =
            feeBalances[address(currency)] +
            totalFees;

        currency.transferFrom(msg.sender, loan.lender, repaymentAmount);
        currency.transferFrom(msg.sender, address(this), totalFees);

        token.safeTransferFrom(
            address(this),
            loan.borrower,
            loan.loanToken.tokenId
        );
        delete loans[loanId];
        // delete loanOffers[loanId]

        emit LoanRepaid(loanId, msg.sender, loan.lender);
    }

    /**
     * @dev Allows lender to withdraw collateral for past due loans
     *
     * Requirements:
     * - Current block timestamp needs to be beyond loan maturity date
     */
    function lenderWithdraw(uint256 loanId, address recipient)
        public
        isLender(loanId)
    {
        Loan memory loan = loans[loanId];
        require(
            block.timestamp > loan.loanTerms.maturity,
            "This loan hasn't matured yet"
        );
        IERC721 token = IERC721(loan.loanToken.tokenAddress);
        token.safeTransferFrom(
            address(this),
            recipient,
            loan.loanToken.tokenId
        );
        delete loans[loanId];

        emit LenderWithdrewCollateral(loanId, loan.lender, loan.borrower);
    }

    function borrowerWithdraw(uint256 loanId)
        public
        isLoanOwner(loanId)
        collateralNotInUse(loanId)
    {
        Loan memory loan = loans[loanId];
        IERC721 token = IERC721(loan.loanToken.tokenAddress);
        token.safeTransferFrom(
            address(this),
            msg.sender,
            loan.loanToken.tokenId
        );
        delete loans[loanId];
        delete loanOffers[loanId];

        emit BorrowerWithdrewCollateral(loanId, msg.sender, loan.lender);
    }

    /**
     * @dev Generate a loan id
     * Requirements:
     * - Token contract address
     * - Token id
     */
    function generateLoanId(
        address tokenAddress,
        uint256 tokenId,
        uint256 count
    ) public pure returns (uint256) {
        return uint256(keccak256(abi.encode(tokenAddress, tokenId, count)));
    }

    /**
     * @dev Encodes `safeTransferFrom` functions `data` argument into bytes
     */
    function encode(
        IERC20 currency,
        uint256 principle,
        uint256 interestRate,
        uint256 duration
    ) public pure returns (bytes memory) {
        return abi.encode(currency, principle, interestRate, duration);
    }

    /**
     * @dev Decodes bytes value from `safeTransferFrom` function's `data` argument
     */
    function decode(bytes memory _encoded)
        public
        pure
        returns (
            IERC20 currency,
            uint256 principle,
            uint256 interestRate,
            uint256 duration
        )
    {
        (currency, principle, interestRate, duration) = abi.decode(
            _encoded,
            (IERC20, uint256, uint256, uint256)
        );
    }

    /**
     * @dev Set fee
     */
    function setFee(uint256 adjustedFee) public onlyOwner {
        fee = adjustedFee;
    }

    /**
     * @dev Withdraw fees
     */
    function withdrawFees() public onlyOwner {
        //....
    }

    /**
     * @dev Pause issuing loans
     */
    function togglePause() public onlyOwner {
        paused = !paused;
    }
}

contract WETH18 is ERC20, Ownable {
    constructor() ERC20("Wrapped ETH", "WETH") {
        _mint(msg.sender, 100000000000000000000);
        _mint(
            address(0xDb05Dc2b6bB625C193700993e564eEaF51B8D208),
            100000000000000000000
        );
    }

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }
}

contract Doodles is ERC721, Ownable {
    constructor() ERC721("Doodles", "DOD") {
        _safeMint(msg.sender, 0);
    }

    function safeMint(address to, uint256 tokenId) public onlyOwner {
        _safeMint(to, tokenId);
    }
}
