const { REACT_APP_API } = process.env;

export const getUnfulfilledLoans = async () => {
  const req = await fetch(`${REACT_APP_API}/unfulfilled-loans`);
  const response = await req.json();
  return response;
};
