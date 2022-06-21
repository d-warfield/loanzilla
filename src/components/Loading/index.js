import { CircularProgress } from "@material-ui/core";
import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 93vh;
  width: 100%;
`;

export default function Loading(props) {
  return (
    <Container>
      <CircularProgress />
    </Container>
  );
}
