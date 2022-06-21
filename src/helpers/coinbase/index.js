const { STAGE } = process.env;

export const fetchPairPrice = async (currencyTicker) => {
  const req = await fetch(
    `https://api.coinbase.com/v2/prices/${
      STAGE === "prod" ? currencyTicker : "ETH"
    }-USD/spot`
  );
  const response = await req.json();
  const price = parseFloat(response.data.amount);
  return price;
};
