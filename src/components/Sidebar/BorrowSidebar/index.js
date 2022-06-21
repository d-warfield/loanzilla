import * as React from "react";
import styled from "styled-components";
import Accordion from "components/Accordion/Sidebar";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 100%;
`;

export function BorrowSidebar() {
  return (
    <Container>
      <Accordion title={"Amount"} body={"KJaklsdjfasdf"} />
      <Accordion title={"Duration"} body={"KJaklsdjfasdf"} />
      <Accordion title={"Currencies"} body={"KJaklsdjfasdf"} />
      <Accordion title={"Collection"} body={"KJaklsdjfasdf"} />
    </Container>
  );
}

export default BorrowSidebar;
