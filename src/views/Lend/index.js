import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Layout from "views/Layouts/Primary";
import LendSideBar from "components/Sidebar/LendSidebar";
import Nft from "components/Nft/NftHorizontal";
import { getUnfulfilledLoans } from "helpers/aws";
import Loading from "components/Loading";

const ChildrenRightContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-item: center;
  justify-content: flex-start;
  width: 95%;
  background-color: white;
  border-radius: var(--p-border-radius);
  border: var(--p-border);
  margin: 25px 0 0 0;
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
  justify-content: flex-start;
  flex-direction: column;
  width: 100%;
  padding: 0 0 25px 0;
`;

const Block = styled.div`
  flex: 1;
  font-size: 14px;
  color: var(--s-text-color);
`;

export function Lend() {
  const [loans, setLoans] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!loans) {
      (async () => {
        const fetchedLoans = await getUnfulfilledLoans();
        setLoans(fetchedLoans.Items);
      })();
    }
  }, []);

  // if (loading) {
  //   return <Loading />;
  // }

  return (
    <Layout
      childrenLeft={<LendSideBar />}
      childrenRight={
        <>
          <ChildrenRightContainer>
            <HeaderContainer>
              <Header>
                <Block style={{ minWidth: "26%" }}>Item</Block>
                <Block>Currency</Block>
                <Block>Amount</Block>
                <Block>Interest</Block>
                <Block style={{ maxWidth: "13%" }}>Duration</Block>
                <Block style={{ maxWidth: "10%" }}>Listed By</Block>
              </Header>
            </HeaderContainer>
            <NftContainer>
              {loans?.map((loan, index) => {
                return (
                  <Nft
                    key={index}
                    borrower={loan.borrower}
                    tokenAddress={loan.tokenAddress}
                    tokenId={loan.tokenId}
                    currency={loan.currency}
                    principle={loan.principle}
                    interestRate={loan.interestRate}
                    duration={loan.duration}
                    listed={loan.timestamp}
                  />
                );
              })}
            </NftContainer>
          </ChildrenRightContainer>
        </>
      }
    />
  );
}

export default Lend;
