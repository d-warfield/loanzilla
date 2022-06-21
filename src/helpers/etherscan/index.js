const { REACT_APP_API, REACT_APP_STAGE } = process.env;

export const fetchTokenInfo = async (tokenAddress) => {
  console.log(tokenAddress);

  const req = await fetch(
    `${REACT_APP_API}/etherscan-fetch-token-contract-info`,
    {
      method: "POST",
      body: JSON.stringify(
        REACT_APP_STAGE === "prod"
          ? tokenAddress
          : "0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d"
      ),
    }
  );
  const response = await req.json();

  return response;
};
