import React from "react";
import { experimentalStyled as styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { Skeleton } from "@mui/material";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: "center",
  color: theme.palette.text.secondary,
  boxShadow: "none",
  boderRadius: "none",
  border: "none",
}));

export default function TokenTraitStats({ tokenTraits, tokenCount }) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid
        container
        spacing={{ xs: 2, md: 1.2 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
        style={{ marginTop: 0 }}
      >
        {tokenTraits?.map((token, index) => {
          return (
            <Grid
              style={{
                boxShadow: "none",
              }}
              item
              xs={2}
              sm={2}
              md={4}
              key={index}
            >
              <div
                style={{
                  border: "var(--p-border)",
                  borderRadius: "var(--p-border-radius)",
                  overflow: "hidden",
                  padding: "20px 0",
                }}
              >
                <Item
                  style={{
                    color: "var(--s-text-color)",
                    fontFamily: "F-Regular",
                    fontSize: 12,
                  }}
                  elevation={0}
                >
                  {token.trait_type}
                </Item>
                <Item
                  style={{
                    fontFamily: "F-Medium",
                    fontSize: 15,
                    padding: "8px 0",
                  }}
                  elevation={0}
                >
                  {token.value.length > 14
                    ? token.value.slice(0, 12) + "..."
                    : token.value}
                </Item>
                <Item
                  style={{ fontSize: 12, fontFamily: "F-Regular" }}
                  elevation={0}
                >
                  {((token.trait_count / tokenCount) * 100).toFixed(2)}
                  {"%"}
                </Item>
              </div>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}
