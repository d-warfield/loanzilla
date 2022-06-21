export const {
  REACT_APP_STAGE: STAGE,
  REACT_APP_LENDZILLA_CONTRACT_ADDRESS: CONTRACT_ADDRESS,
  REACT_APP_WETH_CONTRACT_ADDRESS: WETH_CONTRACT_ADDRESS,
} = process.env;

const prodWhitelistedCurrencyContractAddress = [];

const devWhitelistedCurrencyContractAddresses = [
  "0xa36085F69e2889c224210F603D836748e7dC0088",
  "0x59e7daeccd2c9d4bac099ef13b52f5aa8f66dbbc",
];

export const WHITELISTED_CURRENCY_CONTRACT_ADDRESSES =
  STAGE === "prod"
    ? prodWhitelistedCurrencyContractAddress
    : devWhitelistedCurrencyContractAddresses.map((tokenContract) =>
        tokenContract.toLowerCase()
      );
