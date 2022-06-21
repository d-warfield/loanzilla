import React from "react";
import styled from "styled-components";
import OPENSEA from "../../assets/icons/opensea.svg";
import ETH from "../../assets/icons/eth-grey.svg";
import MORALIS from "../../assets/icons/moralis.svg";

const Container = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  height: 100vh;
  z-index: 0;
  overflow: hidden;
  background-color: var(--p-color);
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  z-index: 2;
  width: 100%;
  border-bottom: 1px solid rgba(255, 255, 255, 0.3);
  padding: 16px 00;
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  font-family: F-Zilla;
  font-size: 24px;
  color: white;
  margin: 0 0 0 20px;
`;

const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex-direction: row;
  margin: 0 20px 0 0;
`;

const Description = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  z-index: 1;
  color: var(--secondary-text-color);
  font-size: 15px;
  color: white;
  margin: 0 0 30px 0;
  width: 85%;
  line-height: 25px;
`;
const CoverBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  bottom: 0px;
  width: 100%;
  height: 10vh;
  z-index: 1;
  background-color: white;
`;

const PartnerContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
`;

const Partner = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  color: #939293;
  font-size: 12px;
  font-family: F-Semi;
  margin: 0 20px;
`;

const PartnerIcon = styled.img`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 4rem;
  width: 4rem;
  z-index: 2;
`;

const TextContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Tag = styled.div`
  background-color: white;
  color: var(--p-color);
  font-family: F-Bold;
  font-size: 10px;
  border-radius: 4px;
  text-transform: uppercase;
  padding: 8px 10px;
`;

export function DummyHome(props) {
  return (
    <Container>
      <Header>
        <HeaderLeft>lendzilla</HeaderLeft>
        <HeaderRight>
          <Tag>Desktop Only</Tag>
        </HeaderRight>
      </Header>
      {/* <CoverLeft src={CITY_LEFT} /> */}

      {/* <TextContainer>
        <Title>
          Instant loans using your{"\n"}
          nft as collateral
        </Title>
        <Description>A marketplace for NFT collateralized loans</Description>
      </TextContainer> */}

      <TextContainer>
        <Description>👋 Hey!</Description>
        <Description>
          Lendzilla is marketplace for NFT collateralized loans. In other words,
          we'll instantly lend you crypto if you put your NFT up as collateral.
        </Description>
        <Description>
          Lendzilla only works on desktop at the moment, so be sure to try it
          out on your computer.
        </Description>
        <Description>
          Feel free to send us your feedback as well - we are always looking to
          improve our service.
        </Description>
        <Description>🏠 Lendzilla Team</Description>
      </TextContainer>

      <CoverBar>
        <PartnerContainer>
          <Partner>
            <PartnerIcon
              style={{ height: "1rem", width: "1rem", marginRight: 4 }}
              src={ETH}
            />
            Ethereum
          </Partner>
          <Partner>
            <PartnerIcon src={OPENSEA} />
          </Partner>
          <Partner>
            <PartnerIcon src={MORALIS} />
          </Partner>
          {/* <Partner></Partner>
          <Partner></Partner> */}
        </PartnerContainer>
      </CoverBar>
    </Container>
  );
}

export default DummyHome;
