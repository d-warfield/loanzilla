import { ethers } from "ethers";

export const formatAddress = (tokenAddress) => {
  const formattedAddress = `${
    tokenAddress?.slice(0, 4) +
    "..." +
    tokenAddress?.slice(tokenAddress.length - 4, tokenAddress.length)
  }`;
  return formattedAddress;
};

export const formatRelativeTime = (timestamp, d2 = new Date()) => {
  // in miliseconds
  var units = {
    year: 24 * 60 * 60 * 1000 * 365,
    month: (24 * 60 * 60 * 1000 * 365) / 12,
    day: 24 * 60 * 60 * 1000,
    hour: 60 * 60 * 1000,
    minute: 60 * 1000,
    second: 1000,
  };

  var rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

  var elapsed = timestamp - d2;

  // "Math.abs" accounts for both "past" & "future" scenarios
  for (var u in units)
    if (Math.abs(elapsed) > units[u] || u == "second")
      return rtf.format(Math.round(elapsed / units[u]), u);
};

export const formatNumber = (amount) => {
  var formatter = new Intl.NumberFormat("en-US", { minimumFractionDigits: 2 });
  return formatter.format(parseFloat(amount)).replace(/\D00(?=\D*$)/, "");
};

export const formatCurrency = (amount) => {
  let res = ethers.utils.formatEther(amount);
  res = (+res).toFixed(4);
  let f = formatNumber(res);
  return f;
};
