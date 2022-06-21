import { Moralis } from "moralis";

const { REACT_APP_STAGE } = process.env;

export const fetchTokenImage = async (token_address, token_id) => {
  const options = {
    address:
      REACT_APP_STAGE === "prod"
        ? token_address
        : "0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d",
    token_id: REACT_APP_STAGE === "prod" ? token_id : "3650",
    chain: REACT_APP_STAGE === "prod" ? "eth" : "eth",
    // address: "0x3fe1a4c1481c8351e91b64d5c398b159de07cbc5",
    // token_id: 9,
    // chain: "eth",
  };
  // Moralis.settings.setAPIRateLimit({
  //   anonymous: 100,
  //   authenticated: 200,
  //   windowMs: 60000,
  // });
  const tokenIdMetadata = await Moralis.Web3API.token.getTokenIdMetadata(
    options
  );
  // if (tokenIdMetadata.token_uri != undefined) {
  //   const image = tokenIdMetadata.token_uri;

  //   const imageExtract = image.data.image;

  //   if (imageExtract.slice(0, 7) === "ipfs://") {
  //     const slicedUrl = imageExtract.slice(7, image.length);
  //     const fixedUrl = `https://ipfs.io/ipfs/${slicedUrl}`;
  //     return fixedUrl;
  //   } else {
  //     return imageExtract;
  //   }
  // }
};

export const fetchCurrencyMetadata = async ({ currencyAddress }) => {
  const options = {
    chain: "eth",
    addresses:
      REACT_APP_STAGE === "prod"
        ? currencyAddress
        : "0x0d8775f648430679a709e98d2b0cb6250d2887ef",
  };
  const tokenMetadata = await Moralis.Web3API.token.getTokenMetadata(options);

  return tokenMetadata;
};
