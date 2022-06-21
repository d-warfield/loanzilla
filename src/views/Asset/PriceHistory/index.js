import React, { useState, useEffect, createRef } from "react";
import styled from "styled-components";
import Chart from "react-apexcharts";
import { ethers } from "ethers";
import moment from "moment";
import CircularProgress from "components/Loading/CircularProgress";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 100%;
`;

const Empty = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  padding: 30px 0;
`;

const EmptyText = styled.div`
  color: var(--s-text-color);
  font-size: 14px;
  margin: 8px 0 0 0;
`;

const Loading = styled.div`
  padding: 50px 0;
  width: 100%;
`;

export default function PriceHistory({ tokenTransfers, loading }) {
  const [width, setWidth] = useState();
  const [prices, setPrices] = useState();
  const [dates, setDates] = useState();

  useEffect(() => {
    let tempDates = [];
    let tempPrices = [];
    tokenTransfers?.result?.reverse().forEach(async (token) => {
      let date = new Date(token.block_timestamp);
      let formatted = moment(date).format("MMMM YYYY");
      tempDates?.push(formatted);
      tempPrices?.push(ethers.utils.formatEther(token.value));
    });

    setPrices(tempPrices);
    setDates(tempDates);
  }, [tokenTransfers]);

  const ref = createRef(null);
  useEffect(() => {
    if (!loading) {
      setWidth(ref.current ? ref.current.offsetWidth : 0);
    }
  }, [ref.current, loading]);

  const state = {
    options: {
      colors: ["var(--p-color)"],
      stroke: {
        curve: "smooth",
      },
      chart: {
        id: "line",
        toolbar: {
          show: false,
        },
        animations: {
          enabled: false,
        },
      },
      xaxis: {
        categories: dates,
      },
    },
    series: [
      {
        name: "Price",
        data: prices,
      },
    ],
  };

  if (loading) {
    return <CircularProgress padding={4} />;
  } else {
    return (
      <Container ref={ref}>
        {tokenTransfers?.length === 0 || tokenTransfers === undefined ? (
          <Empty>
            <EmptyText>No Price History</EmptyText>
          </Empty>
        ) : (
          <Chart
            options={state?.options}
            series={state?.series}
            type="line"
            width={`${width}px`}
          />
        )}
      </Container>
    );
  }
}
