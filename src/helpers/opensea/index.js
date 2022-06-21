const { REACT_APP_STAGE } = process.env;

export const fetchSingleAsset = async ({ tokenAddress, tokenId }) => {
  const req = await fetch(
    `https://api.opensea.io/api/v1/asset/${
      REACT_APP_STAGE === "prod"
        ? tokenAddress
        : "0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d"
    }/${REACT_APP_STAGE === "prod" ? tokenId : "3650"}`
  );

  const response = await req.json();
  return response;
};
