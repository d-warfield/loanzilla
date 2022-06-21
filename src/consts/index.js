import dev_contract_abi from "contracts/dev_contract_abi.json";
import prod_contract_abi from "contracts/prod_contract_abi.json";
import prod_wrapped_eth_abi from "contracts/prod_wrapped_eth_abi.json";
import dev_wrapped_eth_abi from "contracts/dev_wrapped_eth_abi.json";
import dev_token_abi from "contracts/dev_token_abi.json";

import Web3 from "web3";

export const {
  REACT_APP_STAGE: STAGE,
  REACT_APP_LENDZILLA_CONTRACT_ADDRESS: CONTRACT_ADDRESS,
  REACT_APP_WETH_CONTRACT_ADDRESS: WETH_CONTRACT_ADDRESS,
} = process.env;

export const CONTRACT_ABI =
  STAGE === "prod" ? prod_contract_abi : dev_contract_abi;

export const WETH_CONTRACT_ABI =
  STAGE === "prod" ? prod_wrapped_eth_abi : dev_wrapped_eth_abi;

export const DEV_TOKEN_ABI = dev_token_abi;

const prodWhiteListedTokenContracts = [
  "0x3fe1a4c1481c8351e91b64d5c398b159de07cbc5",
  "0x9a534628b4062e123ce7ee2222ec20b86e16ca8f",
  "0x8a90cab2b38dba80c64b7734e58ee1db38b8992e",
  "0x60e4d786628fea6478f785a6d7e704777c86a7c6",
  "0xe785e82358879f061bc3dcac6f0444462d4b5330",
  "0x49cf6f5d44e70224e2e23fdcdd2c053f30ada28b",
  "0xc1caf0c19a8ac28c41fe59ba6c754e4b9bd54de9",
  "0x1a92f7381b9f03921564a437210bb9396471050c",
  "0xba30e5f9bb24caa003e9f2f0497ad287fdf95623",
  "0xed5af388653567af2f388e6224dc7c4b3241c544",
  "0xd78b76fcc33cd416da9d3d42f72649a23d7ac647",
  "0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d",
  "0x50f5474724e0ee42d9a4e711ccfb275809fd6d4a",
  "0xb5c747561a185a146f83cfff25bdfd2455b31ff4",
  "0xf87e31492faf9a91b02ee0deaad50d51d56d5d4d",
  "0xad9fd7cb4fc7a0fbce08d64068f60cbde22ed34c",
  "0x7bd29408f11d2bfc23c34f18275bbf23bb716bc7",
  "0xa3aee8bce55beea1951ef834b99f3ac60d1abeeb",
  "0x75e95ba5997eb235f40ecf8347cdb11f18ff640b",
  "0xff9c1b15b16263c61d017ee9f65c50e4ae0113d7",
  "0x0c2e57efddba8c768147d1fdf9176a0a6ebd5d83",
  "0xf4ee95274741437636e748ddac70818b4ed7d043",
  "0xd0318da435dbce0b347cc6faa330b5a9889e3585",
  "0x1cb1a5e65610aeff2551a50f76a87a7d3fb649c6",
  "0x469823c7b84264d1bafbcd6010e9cdf1cac305a3",
  "0xfdb3e529814afc5df5a5faf126989683b17daef9",
];

const devWhiteListedTokenContracts = [
  "0x0c3933081f2E6A890D32e4ed1FC5C937cBfF17d5",
  "0x6d3FB63bf114Bf5fdBCaC6fBAE8d2eB743126AE7",
  "0xbd08925aebd0e436f052fe52ed1f30bcfd5b584a",
  "0x60e4d786628fea6478f785a6d7e704777c86a7c6",
  "0x315228d5a196981367ffa64a0b40f19b864613cb",
];

export const WHITE_LISTED_CONTRACTS =
  STAGE === "prod"
    ? prodWhiteListedTokenContracts
    : devWhiteListedTokenContracts.map((tokenContract) =>
        tokenContract.toLowerCase()
      );

const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");

const contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
const wethContract = new web3.eth.Contract(
  WETH_CONTRACT_ABI,
  WETH_CONTRACT_ADDRESS
);

export const CONTRACT = contract;
export const WETH_CONTRACT = wethContract;

export const ABI = CONTRACT_ABI;

export const SERVER_URL = "https://behodquthleq.usemoralis.com:2053/server";
export const APP_ID = "jAysZt5sv1wYcqvmFRCxkAJGotQe1rbtqZn0Qx31";
