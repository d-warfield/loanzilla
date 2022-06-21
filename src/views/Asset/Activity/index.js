import React from "react";
import styled from "styled-components";
import moment from "moment";
import SendIcon from "@mui/icons-material/Send";
import ETHERSCAN from "assets/icons/etherscan-light.svg";
import { useHistory } from "react-router-dom";
import { CircularProgress } from "@material-ui/core";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  padding: 0 30px 0 30px;
  max-height: 20rem;
  overflow-y: scroll;
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

const ActivityComp = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  width: 100%;
  padding: 30px 0;
  cursor: pointer;
`;

const ActivityLeft = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: row;
`;

const ActivityIcon = styled.div`
  margin: 0 15px 0 0;
`;

const ActivityLeftWrap = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
`;

const ActivityLeftWrapTop = styled.div`
  font-family: F-Medium;
`;

const ActivityLeftWrapBottom = styled.div`
  font-family: F-Medium;
`;

const ActivityRight = styled.div``;

const EtherscanIcon = styled.img`
  box-shadow: var(--p-b-s);
  border-radius: 1000px;
  height: 1.5rem;
`;

export default function Activity({ tokenTransfers, loading }) {
  if (loading) {
    <CircularProgress />;
  }

  return (
    <Container>
      {tokenTransfers?.length === 0 || tokenTransfers === undefined ? (
        <Empty>
          <EmptyText>No Activity</EmptyText>
        </Empty>
      ) : (
        <>
          {tokenTransfers?.result?.reverse().map((token, index) => {
            let date = new Date(token.block_timestamp);
            let formatted = moment(date).format("DD, MMMM YYYY");
            return (
              <ActivityComp
                key={index}
                onClick={() =>
                  window.open(
                    `https://etherscan.io/tx/${token.transaction_hash}`
                  )
                }
              >
                <ActivityLeft>
                  <ActivityIcon>
                    <SendIcon
                      style={{
                        color: "var(--p-color)",
                        transform: "rotate(-45deg)",
                      }}
                    />
                  </ActivityIcon>
                  <ActivityLeftWrap>
                    <ActivityLeftWrapTop>
                      <span
                        style={{ color: "var(--s-text-color)", marginRight: 5 }}
                      >
                        Transferred to
                      </span>
                      {token.to_address.slice(0, 4)}...
                      {token.to_address.slice(
                        token.to_address.length - 4,
                        token.to_address.length
                      )}
                    </ActivityLeftWrapTop>
                    <ActivityLeftWrapBottom
                      style={{ fontSize: 14, marginTop: 6 }}
                    >
                      <span
                        style={{ color: "var(--s-text-color)", marginRight: 5 }}
                      >
                        From
                      </span>
                      {token.from_address.slice(0, 4)}...
                      {token.from_address.slice(
                        token.from_address.length - 4,
                        token.from_address.length
                      )}
                    </ActivityLeftWrapBottom>
                  </ActivityLeftWrap>
                </ActivityLeft>
                <ActivityRight>{formatted}</ActivityRight>
                <ActivityRight>
                  <EtherscanIcon src={ETHERSCAN} />
                </ActivityRight>
              </ActivityComp>
            );
          })}
        </>
      )}
    </Container>
  );
}
