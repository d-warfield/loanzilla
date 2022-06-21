import React, { useState } from "react";
import styled from "styled-components";
import GavelIcon from "@mui/icons-material/Gavel";
import Modal from "components/Modal";
import MakeOffer from "components/Modal/MakeOffer";
import Popover from "components/Popover";
import { formatNumber } from "helpers/general";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  // border: var(--p-border);
  width: 100%;
  border-radius: var(--p-border-radius);
  box-shadow: var(--p-b-s);
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
  align-items: flex-start;
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
  margin: 0 0 50px 0;
`;

const TermTitle = styled.div`
  color: var(--s-text-color);
  font-size: 15px;
  margin: 0 0 8px 0;
`;

const TermBody = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex-direction: row;
  width: 100%;
`;

const TermHeader = styled.div`
  text-align: center;
  font-family: F-Medium;
  font-size: 15px;
`;

const TermSubheader = styled.div`
  position: absolute;
  font-size: 12px;
  color: var(--s-text-color);
  top: 20px;
`;

const CurrencyIcon = styled.img`
  height: 2.3rem;
  width: 2.3rem;
  margin: 0 8px 0 0;
`;

export function LendOrMakeOffer({
  duration,
  currencyMetadata,
  amounts,
  ethPrice,
}) {
  const [open, setOpen] = useState(false);

  console.log(amounts);

  const handleLend = async () => {
    // check if user approved currency
    // if approved, send transaction
    // if not, open approve modal
  };

  return (
    <>
      <Modal
        handleClose={() => setOpen(false)}
        open={open}
        title={"Make Offer"}
      >
        <MakeOffer currencyMetadata={currencyMetadata} />
      </Modal>
      <Container>
        <Header>
          <GavelIcon style={{ fontSize: 18, marginLeft: 25 }} />{" "}
          <HeaderTitle>Desired Terms</HeaderTitle>
        </Header>
        <TermConditionContainer style={{ marginTop: 40 }}>
          <TermCondition>
            <TermTitle>Currency</TermTitle>
            <TermBody>
              <TermSubheader style={{ top: -6 }}>
                <Popover header={"Basic Attention Token"} description={"BAT"}>
                  <CurrencyIcon src={currencyMetadata?.logo} />
                </Popover>
              </TermSubheader>

              {/* <CurrencyTextContainer>
                <TermHeader>{currencyMetadata.name}</TermHeader>
                <TermSubheader>{currencyMetadata.symbol}</TermSubheader>
              </CurrencyTextContainer> */}
            </TermBody>
          </TermCondition>
          <TermCondition>
            <TermTitle>Principle</TermTitle>
            <TermBody>
              <TermHeader>
                {formatNumber(amounts.principle)} {currencyMetadata.symbol}
              </TermHeader>
              <TermSubheader>
                ${formatNumber(amounts.principleUsd)} USD
              </TermSubheader>
            </TermBody>
          </TermCondition>
          <TermCondition>
            <TermTitle>Interest</TermTitle>
            <TermBody>
              <TermHeader>{amounts.interestRate / 10}% APR</TermHeader>
              <TermSubheader>
                {formatNumber(
                  (amounts.interestRate / 1000) * amounts.principle
                )}{" "}
                {currencyMetadata.symbol}
              </TermSubheader>
            </TermBody>
          </TermCondition>
          <TermCondition style={{ marginRight: 0 }}>
            <TermTitle>Duration </TermTitle>
            <TermBody>
              <TermHeader>{duration} days</TermHeader>
            </TermBody>
          </TermCondition>
        </TermConditionContainer>

        <Buttons>
          <Button onClick={handleLend} style={{ marginBottom: 8 }}>
            Lend
          </Button>
          <Button
            onClick={() => setOpen(true)}
            style={{
              backgroundColor: "var(--s-color)",
              color: "var(--p-color)",
            }}
          >
            Make Offer
          </Button>
        </Buttons>
      </Container>
    </>
  );
}

export default LendOrMakeOffer;
