import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Skeleton from "@mui/material/Skeleton";
import VerifiedIcon from "@mui/icons-material/Verified";
import { Moralis } from "moralis";
import { fetchTokenImage } from "helpers/moralis";
import ETH from "assets/icons/eth-grey.svg";

const { REACT_APP_MORALIS_STAGE } = process.env;

const Asset = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  min-width: 17rem;
  max-width: 17rem;
  max-height: 24rem;
  min-height: 24rem;
  margin: 0.6rem;
  cursor: pointer;
  border-radius: var(--primary-border-radius);
  border: var(--primary-border);
  overflow: hidden;
`;

const AssetTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 100%;
  min-width: 100%;
  overflow: hidden;
  min-height: 250px;
`;

const Image = styled.img`
  height: 108%;
  width: 108%;
  object-fit: cover;
`;

const NoImage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  object-fit: cover;
  background-color: var(--s-grey);
  width: 100%;
  min-height: 250px;
`;

const Info = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 90%;
  flex: 1;
  min-height: 6rem;
`;

const Collection = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: center;
  font-family: F-Medium;
  margin: 0 0 8px 0;
`;

const Id = styled.div`
  font-size: 14px;
  color: var(--secondary-text-color);
`;

const EthIcon = styled.img`
  height: 2rem;
  width: 2rem;
`;

export function NFT({ token, handleStep, index }) {
  const [image, setImage] = useState();
  const [loading, setLoading] = useState(true);
  const [placeholder, setPlaceholder] = useState(false);

  useEffect(() => {
    (async () => {
      if (token) {
        const tokenImage = await fetchTokenImage(
          token.token_address,
          token.token_id,
          REACT_APP_MORALIS_STAGE
        );
        setImage(tokenImage);

        if (tokenImage === undefined) {
          setPlaceholder(true);
        }
        setLoading(false);
      }
    })();
  }, [token]);

  return (
    <Asset onClick={handleStep} key={index}>
      {loading ? (
        <AssetTop>
          <Skeleton style={{ marginTop: -100 }} width={290} height={450} />
        </AssetTop>
      ) : (
        <AssetTop>
          {placeholder ? (
            <NoImage>
              <EthIcon src={ETH} />
            </NoImage>
          ) : (
            <Image src={image} />
          )}
        </AssetTop>
      )}

      <Info>
        {loading ? (
          <Skeleton style={{ marginBottom: -10 }} width={120} height={40} />
        ) : (
          <Collection>
            {token?.name}
            <VerifiedIcon
              style={{
                fontSize: 15,
                marginLeft: 4,
                color: "var(--p-blue-color)",
              }}
            />
          </Collection>
        )}

        {loading ? (
          <Skeleton style={{ marginBottom: 20 }} width={50} height={40} />
        ) : (
          <Id>#{token?.token_id}</Id>
        )}
      </Info>
    </Asset>
  );
}

export default NFT;
