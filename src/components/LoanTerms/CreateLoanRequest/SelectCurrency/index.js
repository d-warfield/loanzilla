import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { WHITELISTED_CURRENCY_CONTRACT_ADDRESSES } from "consts/currencies";
import { fetchCurrencyMetadata } from "helpers/moralis";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const CurrencyContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  padding: 25px 25px 0 25px;
  cursor: pointer;
`;

const CurrencyIcon = styled.img`
  height: 2rem;
  width: 2rem;
  margin: 0 10px 0 0;
`;

const CurrencyRight = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
`;

const CurrencyHeader = styled.div`
  font-family: F-Medium;
  font-size: 14px;
`;

const CurrencySymbol = styled.div`
  font-size: 13px;
  color: var(--s-text-color);
  margin: 6px 0 0 0;
`;

export default function SelectCurrency() {
  const [currencyContract, setCurrencyContract] = useState("");
  const [currencies, setCurrencies] = useState();

  const handleChange = (event) => {
    setCurrencyContract(event);
  };

  useEffect(() => {
    let tempCurrencies = [];
    WHITELISTED_CURRENCY_CONTRACT_ADDRESSES?.map(
      async (currencyContract, index) => {
        const currencyMetadata = await fetchCurrencyMetadata(currencyContract);
        tempCurrencies.push(currencyMetadata[0]);
      }
    );
    setCurrencies(tempCurrencies);
  }, []);

  return (
    <Container>
      <TextField
        id="outlined-basic"
        label="Outlined"
        variant="outlined"
        sx={{ width: "90%", marginTop: 2.3 }}
      />
      {currencies?.map((currency, index) => {
        return (
          <Box
            style={{ width: "100%" }}
            onClick={() => handleChange(currency.address)}
            key={index}
            value={currency}
          >
            <CurrencyContainer>
              <CurrencyIcon src={currency?.logo} />
              <CurrencyRight>
                <CurrencyHeader>{currency?.name}</CurrencyHeader>
                <CurrencySymbol>{currency?.symbol}</CurrencySymbol>
              </CurrencyRight>
              <ArrowForwardIosIcon
                style={{
                  position: "absolute",
                  right: 18,
                  fontSize: 14,
                  marginTop: -10,
                  color: "var(--s-text-color)",
                }}
              />
            </CurrencyContainer>
          </Box>
        );
      })}
    </Container>
  );
}
