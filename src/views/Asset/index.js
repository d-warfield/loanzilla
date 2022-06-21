import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Accordion from "components/Accordion/Asset";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import ETH from "assets/icons/eth.svg";
import CreateLoanRequest from "components/LoanTerms/CreateLoanRequest";
import LendOrMakeOffer from "components/LoanTerms/LendOrMakeOffer";
import Offers from "./Offers";
import Activity from "./Activity";
import PriceHistory from "./PriceHistory";
import CollectionDetails from "./CollectionDetails";
import { useLocation } from "react-router-dom";
import { fetchTokenInfo } from "helpers/etherscan";
import VerifiedIcon from "@mui/icons-material/Verified";
import SocialMedia from "components/SocialMedia";
import HomeIcon from "@mui/icons-material/Home";
import { formatAddress, formatNumber } from "helpers/general";
import { fetchSingleAsset } from "helpers/opensea";
import CollectionStats from "components/Stats/CollectionStats";
import TokenTraitStats from "components/Stats/TokenTraitStats";
import Loading from "components/Loading";
import { fetchPairPrice } from "helpers/coinbase";
import { Moralis } from "moralis";
import { Skeleton } from "@mui/material";

const { REACT_APP_ETHERSCAN_URL, REACT_APP_STAGE } = process.env;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
  padding: 30px 50px 0 50px;
  background-color: #f7f6f6;
`;

const ContainerLeft = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
`;

const ContainerMiddle = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  height: 100%;
  margin: 0 50px;
`;

const ContainerRight = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
  min-width: 24rem;
  max-width: 24rem;
  box-shadow: var(--p-b-s);
`;

const MediaContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  max-height: 100rem;
  height: 32rem;
  width: 100%;
  min-width: 32rem;
  min-height: 20rem;
  border-radius: var(--p-border-radius);
  margin: 0 0 40px 0;
  box-shadow: var(--p-b-s);
  overflow: hidden;
`;

const Media = styled.img`
  position: absolute;
  height: 104%;
  width: 104%;
`;

const Collection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
`;

const CollectionTitleWrap = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  color: var(--p-color);
  font-size: 15x;
  font-family: F-Medium;
  width: 100%;
`;

const CollectionTitle = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  color: var(--p-color);
  font-size: 15x;
  font-family: F-Medium;
`;

const AssetName = styled.div`
  padding: 20px 0;
  font-family: F-Medium;
  font-size: 32px;
`;

const Owner = styled.div`
  color: var(--s-text-color);
  font-size: 15px;
`;

const FloorPrice = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  padding: 40px 0;
`;

const FloorPriceEth = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  margin: 0 0 -8px 8px;
  color: var(--s-text-color);
  font-size: 14px;
`;

const FloorPricceUsd = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  font-family: F-Medium;
  font-size: 32px;
`;

const EthIcon = styled.img`
  height: 1.5rem;
  width: 1.5rem;
  margin: -5px 6px 0 0;
`;

export function Asset() {
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [tokenTransfers, setTokenTransfers] = useState();
  const [etherscanTokenInfo, setEtherscanTokenInfo] = useState();
  const [tokenStats, setTokenStats] = useState();
  const [ethPrice, setEthPrice] = useState();
  const {
    tokenAddress,
    tokenId,
    duration,
    tokenMetadata,
    currencyMetadata,
    amounts,
  } = location.state;

  useEffect(() => {
    (async () => {
      const options = {
        address:
          REACT_APP_STAGE === "prod"
            ? tokenAddress
            : "0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d",
        token_id: REACT_APP_STAGE === "prod" ? tokenId : "4038",
        chain: "eth",
      };
      const transfers = await Moralis.Web3API.token.getWalletTokenIdTransfers(
        options
      );

      const tokenInfoByContract = await fetchTokenInfo(tokenAddress);

      const tokenStats = await fetchSingleAsset(tokenAddress, tokenId);

      const price = await fetchPairPrice(currencyMetadata.symbol);

      setEtherscanTokenInfo(tokenInfoByContract[0]);
      setTokenStats(tokenStats);
      setTokenTransfers(transfers);
      setEthPrice(price);

      setLoading(false);
    })();
  }, []);

  return (
    <Container>
      <ContainerLeft>
        <MediaContainer>
          <Media
            src={
              "https://lh3.googleusercontent.com/grHHS7VLjgmEDagQ7nBar0sFHb0c-BP7v_w_R8aJVpaMrCzk-Yd_CCp3cO9PFlzuDBc_NPLyaZwJpS_Fvz-mHPdl2hs4ukP0e334vw=w600"
            }
          />
        </MediaContainer>

        <Accordion
          expanded={true}
          icon={<HomeIcon />}
          title={"Collection"}
          body={<CollectionDetails etherscanTokenInfo={etherscanTokenInfo} />}
        />
        <Accordion
          expanded={true}
          icon={<HomeIcon />}
          title={"Traits"}
          body={
            <TokenTraitStats
              tokenTraits={tokenStats?.traits}
              tokenCount={tokenStats?.collection?.stats?.count}
            />
          }
        />
      </ContainerLeft>
      <ContainerMiddle>
        <Collection>
          <CollectionTitleWrap>
            <CollectionTitle>
              {loading ? (
                <Skeleton style={{ height: 35, width: 100 }} />
              ) : (
                <>
                  {tokenMetadata?.name}
                  {etherscanTokenInfo?.blueCheckmark && (
                    <VerifiedIcon style={{ fontSize: 16, marginLeft: 4 }} />
                  )}
                </>
              )}
            </CollectionTitle>
            {loading ? (
              <Skeleton style={{ height: 70, width: 140 }} />
            ) : (
              <SocialMedia etherscanTokenInfo={etherscanTokenInfo} />
            )}
          </CollectionTitleWrap>

          {loading ? (
            <Skeleton style={{ height: 70, width: 300 }} />
          ) : (
            <AssetName>{tokenMetadata?.symbol}</AssetName>
          )}
          <Owner>
            Owned by{" "}
            <span
              onClick={() =>
                window.open(
                  `${REACT_APP_ETHERSCAN_URL}/address/${tokenMetadata?.owner_of}#tokentxnsErc721`
                )
              }
              style={{
                cursor: "pointer",
                color: "var(--p-color)",
                fontFamily: "F-Medium",
              }}
            >
              {formatAddress(tokenMetadata?.owner_of)}
            </span>
          </Owner>

          <FloorPrice>
            {loading ? (
              <Skeleton style={{ height: 70, width: 220 }} />
            ) : (
              <>
                <FloorPricceUsd>
                  <EthIcon src={ETH} />
                  {tokenStats?.collection?.stats?.seven_day_average_price.toFixed(
                    2
                  )}
                </FloorPricceUsd>
                <FloorPriceEth>
                  ($
                  {formatNumber(
                    (
                      ethPrice *
                      tokenStats?.collection?.stats?.seven_day_average_price
                    ).toFixed(2)
                  )}{" "}
                  USD)
                </FloorPriceEth>
              </>
            )}
          </FloorPrice>
        </Collection>
        <CollectionStats
          loading={loading}
          collectionStats={tokenStats?.collection?.stats}
        />

        {/* <Accordion
          expanded={true}
          icon={<AttachMoneyIcon />}
          title={"Offers"}
          body={<Offers />}
        /> */}

        <Accordion
          expanded={true}
          icon={<ShowChartIcon />}
          title={"Price History"}
          body={
            <PriceHistory loading={loading} tokenTransfers={tokenTransfers} />
          }
        />

        <Accordion
          expanded={true}
          icon={<SwapHorizIcon />}
          title={"Activity"}
          body={<Activity loading={loading} tokenTransfers={tokenTransfers} />}
        />
      </ContainerMiddle>
      <ContainerRight>
        {/* <CreateLoanRequest /> */}

        <LendOrMakeOffer
          amounts={amounts}
          duration={duration}
          currencyMetadata={currencyMetadata}
        />
      </ContainerRight>
    </Container>
  );
}

export default Asset;
