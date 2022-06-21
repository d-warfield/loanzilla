import React, { useState, useRef } from "react";
import styled from "styled-components";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import InfoIcon from "@mui/icons-material/Info";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import SelectCurrency from "./SelectCurrency";
import Slide from "@mui/material/Slide";
import Box from "@mui/material/Box";
import Switch from "@mui/material/Switch";
import Paper from "@mui/material/Paper";

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: var(--p-border);
  width: 100%;
  border-radius: var(--p-border-radius);
  box-shadow: var(--p-b-s);
  overflow: hidden;
`;

const Header = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  border-bottom: var(--p-border);
  width: 100%;
  padding: 28px 0;
`;

const HeaderTitle = styled.div`
  margin: 0 0 0 10px;
  font-family: F-Medium;
`;

const Buttons = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 0 0 20px 0;
`;

const Button = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px 0;
  width: 90%;
  background-color: var(--p-color);
  color: white;
  font-family: F-Medium;
  border-radius: var(--p-border-radius);
  cursor: pointer;
`;

const TermConditionContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 90%;
`;
const TermCondition = styled.div`
  flex: 1;
  width: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: row;
  margin: 0 0 38px 0;
`;

const TermNote = styled.div`
  font-size: 12px;
  color: var(--s-text-color);
`;

export function CreateLoan({ duration, currencyMetadata, amounts }) {
  const [checked, setChecked] = React.useState(false);
  const containerRef = React.useRef(null);

  const handleChange = () => {
    setChecked((prev) => !prev);
  };
  const handleRequestLoan = async () => {
    // check if user approved currency
    // if approved, send transaction
    // if not, open approve modal
  };

  const currencies = (
    <Paper
      sx={{ width: "100%", height: "100%", position: "absolute", zIndex: 1 }}
    >
      <SelectCurrency />
    </Paper>
  );

  return (
    <>
      {/* <Modal handleClose={() => setOpen(false)} open={open} title={"Approve"}>
        <Approve currencyMetadata={currencyMetadata} />
      </Modal> */}
      <Container ref={containerRef}>
        <Header>
          <BorderColorIcon style={{ fontSize: 18, marginLeft: 25 }} />{" "}
          <HeaderTitle>Request Loan</HeaderTitle>
        </Header>
        <TermConditionContainer style={{ marginTop: 40 }}>
          <TermCondition>
            <Button onClick={() => setChecked(!checked)}>kasdfkljasdf</Button>
          </TermCondition>
          <TermCondition>
            <TextField
              autoComplete="off"
              sx={{ width: "100%" }}
              id="outlined-basic"
              label="Principle"
              variant="outlined"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    {/* {currencyMetadata.symbol} */}
                  </InputAdornment>
                ),
              }}
            />
          </TermCondition>
          <TermCondition>
            <TextField
              autoComplete="off"
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
              autoComplete="off"
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
              Your nft will be sent to escrow. You can withdraw it at anytime if
              it is not being used as collateral.
            </TermNote>
          </TermCondition>
        </TermConditionContainer>

        <Buttons>
          <Button onClick={handleRequestLoan}>Request Loan</Button>
        </Buttons>
        <Slide direction="up" in={checked} container={containerRef.current}>
          {currencies}
        </Slide>
      </Container>
    </>
  );
}

export default CreateLoan;
