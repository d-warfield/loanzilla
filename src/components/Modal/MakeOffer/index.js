import React, { useState, useEffect } from "react";
import styled from "styled-components";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import InfoIcon from "@mui/icons-material/Info";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
  border-radius: var(--p-border-radius);
`;

const TermConditionContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
`;
const TermCondition = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  margin: 0 0 38px 0;
  width: 100%;
`;

const Button = styled.button`
  border: none;
  outline: none;
  font-family: F-Medium;
  background-color: var(--p-color);
  color: white;
  padding: 20px;
  border-radius: var(--p-border-radius);
  font-size: 15px;
  width: 100%;
`;

const TermNote = styled.div`
  font-size: 12px;
  color: var(--s-text-color);
`;

export default function MakeOffer({ currencyMetadata }) {
  const [state, setState] = useState({
    currency: currencyMetadata.contractAddress,
    principle: 0,
    interestRate: 0,
    duration: 0,
  });

  useEffect(() => {
    // check to see if lender has approved contract to control funds
  }, []);

  const handleSubmitOffer = async () => {
    // submit offer on blockchain
  };

  return (
    <Container>
      <TermConditionContainer style={{ marginTop: 20 }}>
        {/* <TermCondition>
          <TermTitle>Currency</TermTitle>
          <TermBody>
            <TermHeader>{currencyMetadata.name}</TermHeader>
            <TermSubheader>{currencyMetadata.symbol}</TermSubheader>
          </TermBody>
        </TermCondition> */}
        <TermCondition>
          <TextField
            sx={{ width: "100%" }}
            id="outlined-basic"
            label="Principle"
            variant="outlined"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  {currencyMetadata.symbol}
                </InputAdornment>
              ),
            }}
          />
        </TermCondition>
        <TermCondition>
          <TextField
            sx={{ width: "100%" }}
            id="outlined-basic"
            label="Interest Rate"
            variant="outlined"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">% APR</InputAdornment>
              ),
            }}
          />
        </TermCondition>
        <TermCondition>
          <TextField
            sx={{ width: "100%" }}
            id="outlined-basic"
            label="Duration"
            variant="outlined"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">days</InputAdornment>
              ),
            }}
          />
        </TermCondition>

        <TermCondition style={{ justifyContent: "flex-start" }}>
          <InfoIcon
            style={{
              color: "var(--s-text-color)",
              marginRight: 3,
              marginTop: -2,
              fontSize: 17,
            }}
          />
          <TermNote>
            Your {currencyMetadata.symbol} will leave your wallet if your offer
            is accepted
          </TermNote>
        </TermCondition>
      </TermConditionContainer>

      <Button onClick={handleSubmitOffer}>Submit Offer</Button>
    </Container>
  );
}
