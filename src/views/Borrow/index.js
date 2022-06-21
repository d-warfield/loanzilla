import React from "react";
import styled from "styled-components";
import { useStateValue } from "../../context";
import Grid from "@mui/material/Grid";
import NftVertical from "components/Nft/NftVertical";
import { useHistory } from "react-router-dom";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 93vh;
`;

const AssetContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  height: 100%;
`;

const Error = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
`;

export function Borrow(props) {
  const [{ tokens }] = useStateValue();
  const history = useHistory();

  return (
    <>
      {tokens.length === 0 ? (
        <Container>
          <Error>You don't have any NFTs</Error>
        </Container>
      ) : (
        <Container>
          <AssetContainer style={{ maxWidth: "60rem", paddingBottom: 100 }}>
            <Grid
              container
              columns={50}
              container
              direction="row"
              alignItems="center"
              justifyContent="center"
            >
              {tokens?.map((token, index) => {
                return (
                  <NftVertical
                    key={index}
                    onClick={() =>
                      history.push(
                        `/asset/${token.token_contract}/${token.tokenId}`
                      )
                    }
                  />
                );
              })}
            </Grid>
          </AssetContainer>
        </Container>
      )}
    </>
  );
}

export default Borrow;
