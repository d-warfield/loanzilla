import React from "react";
import styled from "styled-components";
import { formatNumber } from "helpers/general";
import ETH from "assets/icons/eth.svg";
import { Skeleton } from "@mui/material";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
  box-shadow: var(--p-b-s);
  border-radius: var(--p-border-radius);
  // border: var(--p-border);
  margin: 0 0 25px 0;
  background-color: white;
`;

const Stat = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 8rem;
`;

const StatHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-family: F-Medium;
  font-size: 20px;
`;

const StatDescription = styled.div`
  text-align: center;
  font-size: 13px;
  color: var(--s-text-color);
  margin: 5px 0 0 0;
`;

const Breaker = styled.div`
  height: 5rem;
  width: 1px;
  background-color: #d7dce1;
`;

const EthIcon = styled.img`
  height: 1.1rem;
  width: 1.1rem;
  margin: 0 6px 0 0;
  margin: -3px 0 0 0;
`;

export default function CollectionStats({ collectionStats, loading }) {
  return (
    <Container>
      <Stat>
        {loading ? (
          <Skeleton style={{ height: 80, width: 140 }} />
        ) : (
          <>
            <StatHeader>
              <EthIcon src={ETH} />
              {formatNumber(collectionStats?.total_volume.toFixed(0))}
            </StatHeader>
            <StatDescription>total volume</StatDescription>
          </>
        )}
      </Stat>
      <Breaker />
      <Stat>
        {loading ? (
          <Skeleton style={{ height: 80, width: 140 }} />
        ) : (
          <>
            <StatHeader>
              <EthIcon src={ETH} />
              {formatNumber(collectionStats?.thirty_day_volume.toFixed(0))}
            </StatHeader>
            <StatDescription>30 day volume</StatDescription>
          </>
        )}
      </Stat>
      <Breaker />
      <Stat>
        {loading ? (
          <Skeleton style={{ height: 80, width: 140 }} />
        ) : (
          <>
            <StatHeader>
              {formatNumber(collectionStats?.total_sales)}
            </StatHeader>
            <StatDescription>total sales</StatDescription>
          </>
        )}
      </Stat>{" "}
      {/* <Stat style={{ borderRight: "none" }}>
        <StatHeader>
          {formatNumber(collectionStats?.thirty_day_sales)}
        </StatHeader>
        <StatDescription>30 day sales</StatDescription>
      </Stat>{" "} */}
    </Container>
  );
}
