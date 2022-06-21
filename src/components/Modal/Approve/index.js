import React, { useState, useEffect } from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
  border-radius: var(--p-border-radius);
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const Icon = styled.img`
  height: 5rem;
  width: 5rem;
  background-color: transparent;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
`;
const Description = styled.div`
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

export default function Approve({ currencyMetadata }) {
  const handleApprove = async () => {
    // approve currency on blockchain
  };

  return (
    <Container>
      <Icon src={currencyMetadata.logo} />
      <TextContainer>
        <Header>Please approve</Header>
        <Description>
          You'll need to allow the Lendzilla smart contract to control your{" "}
          {currencyMetadata.symbol} if you want to make loans.
        </Description>
      </TextContainer>
      <Button onClick={handleApprove}>Approve</Button>
    </Container>
  );
}
