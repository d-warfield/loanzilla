import React from "react";
import styled from "styled-components";
import { formatAddress } from "helpers/general";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  width: 100%;
`;

const Detail = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  width: 100%;
  padding: 20px 0;
`;

const ContainerLeft = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  font-size: 15px;
  color: var(--s-text-color);
`;

const ContainerRight = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  font-family: F-Medium;
`;

export default function CollectionDetails({ etherscanTokenInfo }) {
  console.log(etherscanTokenInfo);
  return (
    <Container>
      <Detail>
        <ContainerLeft>Collection Name</ContainerLeft>
        <ContainerRight>{etherscanTokenInfo?.tokenName}</ContainerRight>
      </Detail>
      <Detail>
        <ContainerLeft>Contract Address</ContainerLeft>
        <ContainerRight>
          {formatAddress(etherscanTokenInfo?.contractAddress)}
        </ContainerRight>
      </Detail>
      <Detail>
        <ContainerLeft>Token Type</ContainerLeft>
        <ContainerRight>{etherscanTokenInfo?.tokenType}</ContainerRight>
      </Detail>
      <Detail>
        <ContainerLeft>Total Supply</ContainerLeft>
        <ContainerRight>{etherscanTokenInfo?.totalSupply}</ContainerRight>
      </Detail>
    </Container>
  );
}
