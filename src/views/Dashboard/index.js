import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import NftDashboard from "components/Nft/NftDashboard";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 93vh;
  background-color: var(--s-background-color);
`;

const ContainerRight = styled.div`
  display: flex;
  flex-direction: column;
  align-item: center;
  justify-content: flex-start;
  width: 90%;
  height: 100%;
  background-color: white;
  border-radius: var(--p-border-radius);
  box-shadow: var(--p-b-s);
`;

const HeaderContainer = styled.div`
  display: flex;
  align-item: center;
  justify-content: center;
  width: 100%;
`;

const Header = styled.div`
  display: flex;
  flex-direction: row;
  align-item: center;
  justify-content: center;
  width: 100%;
  background-color: white;
  padding: 25px 25px;
  border-bottom: var(--p-border);
  border-top-right-radius: var(--p-border-radius);
  border-top-left-radius: var(--p-border-radius);
`;

const NftContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  max-width: 90%;
  padding: 0 0 25px 0;
`;

const Block = styled.div`
  flex: 1;
  font-size: 14px;
  color: var(--s-text-color);
`;

export function Dashboard() {
  const [loans, setLoans] = useState();
  const [alignment, setAlignment] = useState("borrowed");

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  return (
    <Container>
      <ToggleButtonGroup
        color="primary"
        value={alignment}
        exclusive
        onChange={handleChange}
        style={{
          display: "flex",
          justifyContent: "flex-start",
          width: "90%",
          padding: "40px 0",
        }}
      >
        <ToggleButton
          style={{
            padding: "12px 0",
            fontFamily: "F-Medium",
            minWidth: "9rem",
            border: "none",
            color: alignment === "borrowed" ? "white" : "var(--s-text-color)",
            backgroundColor:
              alignment === "borrowed" ? "var(--p-color)" : "white",
            borderTopLeftRadius: "var(--p-border-radius)",
            borderBottomLeftRadius: "var(--p-border-radius)",
            textTransform: "capitalize",
          }}
          value="borrowed"
        >
          Borrowed
        </ToggleButton>
        <ToggleButton
          style={{
            padding: "12px 0",
            fontFamily: "F-Medium",
            minWidth: "9rem",
            border: "none",
            color: alignment === "lending" ? "white" : "var(--s-text-color)",
            backgroundColor:
              alignment === "lending" ? "var(--p-color)" : "white",
            borderTopRightRadius: "var(--p-border-radius)",
            borderBottomRightRadius: "var(--p-border-radius)",
            textTransform: "capitalize",
          }}
          value="lending"
        >
          Lending
        </ToggleButton>
      </ToggleButtonGroup>
      {alignment === "borrwed" ? (
        <ContainerRight>
          <HeaderContainer>
            <Header>
              <Block style={{ minWidth: "26%" }}>Item</Block>
              <Block>Currency</Block>
              <Block>Amount</Block>
              <Block>Interest</Block>
              <Block style={{ maxWidth: "13%" }}>Maturity</Block>
              <Block></Block>
            </Header>
          </HeaderContainer>
          <NftContainer>
            {loans?.map((loan, index) => {
              return (
                <NftDashboard
                // key={index}
                // borrower={loan.borrower}
                // tokenAddress={loan.tokenAddress}
                // tokenId={loan.tokenId}
                // currency={loan.currency}
                // principle={loan.principle}
                // interestRate={loan.interestRate}
                // duration={loan.duration}
                // listed={loan.timestamp}
                />
              );
            })}
          </NftContainer>
        </ContainerRight>
      ) : (
        <ContainerRight>
          <HeaderContainer>
            <Header>
              <Block style={{ minWidth: "26%" }}>Item</Block>
              <Block>Currency</Block>
              <Block>Amount</Block>
              <Block>Interest</Block>
              <Block style={{ maxWidth: "13%" }}>Maturity</Block>
            </Header>
          </HeaderContainer>
          <NftContainer>
            {loans?.map((loan, index) => {
              return (
                <NftDashboard
                // key={index}
                // borrower={loan.borrower}
                // tokenAddress={loan.tokenAddress}
                // tokenId={loan.tokenId}
                // currency={loan.currency}
                // principle={loan.principle}
                // interestRate={loan.interestRate}
                // duration={loan.duration}
                // listed={loan.timestamp}
                />
              );
            })}
          </NftContainer>
        </ContainerRight>
      )}
    </Container>
  );
}

export default Dashboard;
