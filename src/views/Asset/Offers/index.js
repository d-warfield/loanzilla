import React from "react";
import styled from "styled-components";

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

export default function Offers(props) {
  return (
    <Container>
      <Empty>
        <EmptyText>No Offers</EmptyText>
      </Empty>
    </Container>
  );
}
