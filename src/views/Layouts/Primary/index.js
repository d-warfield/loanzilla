import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 92vh;
`;

const ContainerLeft = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
  width: 20vw;
  border-right: var(--p-border);
  height: 92vh;
`;

const ContainerRight = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
  height: 92vh;
  background-color: var(--s-background-color);
  overflow-y: scroll;
`;

export function Primary({ childrenLeft, childrenRight }) {
  return (
    <Container>
      <ContainerLeft>{childrenLeft}</ContainerLeft>
      <ContainerRight>{childrenRight}</ContainerRight>
    </Container>
  );
}

export default Primary;
