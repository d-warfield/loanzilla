import * as React from "react";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";

export default function NftHorizontalSkeleton() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "95%",
      }}
    >
      <Skeleton width={150} height={190} />
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Skeleton
          variant="circular"
          width={50}
          height={50}
          sx={{ marginRight: 1 }}
        />
        <Skeleton width={150} height={90} />
      </Box>
      <Skeleton width={150} height={90} />
      <Skeleton width={150} height={90} />
      <Skeleton width={130} height={90} />
      <Skeleton width={130} height={90} />
    </Box>
  );
}
