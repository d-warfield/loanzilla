import React, { useState, useEffect } from "react";
import styled from "styled-components";
import VerifiedIcon from "@mui/icons-material/Verified";
import { fetchTokenImage } from "helpers/moralis";
import ETH from "assets/icons/eth-grey.svg";
import { useHistory } from "react-router-dom";
import { Moralis } from "moralis";
import {
  formatRelativeTime,
  formatNumber,
  formatCurrency,
  formatAddress,
} from "helpers/general";
import { fetchCurrencyMetadata } from "helpers/moralis";
import { fetchPairPrice } from "helpers/coinbase";
import { ethers } from "ethers";

const { REACT_APP_MORALIS_STAGE } = process.env;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 95%;
  cursor: pointer;
  background-color: white;
  cursor: pointer;
  padding: 25px 0 0 0;
`;

const Block = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const BlockColumn = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
`;
const Title = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  margin: 0 0 8px 0;
  text-transform: capitalize;
  font-family: F-Medium;
`;

const Name = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  font-size: 14px;
  color: var(--s-text-color);
`;

const Media = styled.img`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 7rem;
  width: 7rem;
  border-radius: var(--p-border-radius);
  margin: 0 14px 0 0;
  background-color: white;
`;

const NoMedia = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 7rem;
  width: 7rem;
  background-color: var(--s-background-color);
  border-radius: var(--p-border-radius);
  margin: 0 14px 0 0;
`;

const EthIcon = styled.img`
  height: 1.2rem;
  width: 1.2rem;
`;

const Currency = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const CurrencyIcon = styled.img`
  height: 2.2rem;
  width: 2.2rem;
  border-radius: 100px;
  margin: 0 10px 0 0;
  box-shadow: 0px 1px 10px rgba(1, 1, 1, 0.06);
  background-color: transparent;
`;

const CurrencyNumbers = styled.div``;

const CurrencyNative = styled.div``;

const CurrencyUsd = styled.div`
  font-size: 12px;
  color: var(--s-text-color);
  margin: 6px 0 0 0;
`;

export function NftDashboard({
  borrower,
  tokenAddress,
  tokenId,
  currency,
  principle,
  interestRate,
  duration,
  listed,
}) {
  const [media, setMedia] = useState();
  const [tokenMetadata, setTokenMetadata] = useState();
  const [currencyMetadata, setCurrencyMetadata] = useState();
  const [loading, setLoading] = useState(true);
  const [placeholder, setPlaceholder] = useState(false);
  const history = useHistory();

  const [amounts, setAmounts] = useState({
    principle: formatCurrency(principle),
    principleUsd: 0,
    interest: formatNumber(
      ethers.utils.formatEther(principle) * (interestRate / 1000)
    ),
    interestRate: interestRate / 10,
  });

  useEffect(() => {
    (async () => {
      const options = {
        address: tokenAddress,
        token_id: tokenId,
        chain: REACT_APP_MORALIS_STAGE,
      };
      const tokenIdMetadata = await Moralis.Web3API.token.getTokenIdMetadata(
        options
      );
      setTokenMetadata(tokenIdMetadata);
      if (tokenAddress && tokenId) {
        const tokenMedia = await fetchTokenImage(
          tokenAddress,
          tokenId,
          REACT_APP_MORALIS_STAGE
        );
        setMedia(tokenMedia);

        if (tokenMedia === undefined) {
          setPlaceholder(true);
        }
        setLoading(false);
      }
    })();
  }, [tokenId, tokenAddress]);

  useEffect(() => {
    if (currency) {
      (async () => {
        const currencyMetadata = await fetchCurrencyMetadata(currency);
        setCurrencyMetadata(currencyMetadata[0]);
      })();
    }
  }, [currency]);

  useEffect(() => {
    if (currency && principle) {
      (async () => {
        const res = await fetchPairPrice(currencyMetadata?.symbol);

        const price = res * ethers.utils.formatEther(principle);

        setAmounts({ ...amounts, principleUsd: formatNumber(price) });
      })();
    }
  }, [currency]);

  return (
    <Container
      onClick={() =>
        history.push(`asset/${tokenAddress}/${tokenId}`, {
          tokenAddress,
          tokenId,
          media,
          currency,
          duration,
          listed,
          tokenMetadata,
          currencyMetadata,
          amounts,
        })
      }
    >
      <Block style={{ minWidth: "26%" }}>
        {placeholder ? (
          <NoMedia>
            <EthIcon src={ETH} />
          </NoMedia>
        ) : (
          <Media src={media} />
        )}
        <BlockColumn>
          <Title>
            {tokenMetadata?.name}
            <VerifiedIcon
              style={{
                color: "var(--p-color)",
                fontSize: "16px",
                marginLeft: 6,
              }}
            />
          </Title>

          <Name>{tokenMetadata?.symbol}</Name>
        </BlockColumn>
      </Block>
      <Block>
        <Currency>
          <CurrencyIcon src={currencyMetadata?.logo} />
          <CurrencyNumbers>
            <CurrencyNative>
              {currencyMetadata?.name.length > 15
                ? currencyMetadata?.name.slice(0, 15) + "..."
                : currencyMetadata?.name}
            </CurrencyNative>
            <CurrencyUsd>{currencyMetadata?.symbol}</CurrencyUsd>
          </CurrencyNumbers>
        </Currency>
      </Block>
      <Block>
        <Currency>
          <CurrencyNumbers>
            <CurrencyNative>{amounts.principle} </CurrencyNative>
            <CurrencyUsd>${amounts.principleUsd} USD</CurrencyUsd>
          </CurrencyNumbers>
        </Currency>
      </Block>
      <Block>
        <Currency>
          <CurrencyNumbers>
            <CurrencyNative>{interestRate / 10}%</CurrencyNative>
            <CurrencyUsd>{amounts.interest} LINK</CurrencyUsd>
          </CurrencyNumbers>
        </Currency>
      </Block>
      <Block style={{ maxWidth: "13%" }}> Repay</Block>
      <Block style={{ maxWidth: "10%" }}>
        <Currency>
          <CurrencyNumbers>
            <CurrencyNative>{formatAddress(borrower)}</CurrencyNative>
            <CurrencyUsd>{formatRelativeTime(listed)}</CurrencyUsd>
          </CurrencyNumbers>
        </Currency>
      </Block>
    </Container>
  );
}

export default NftDashboard;
