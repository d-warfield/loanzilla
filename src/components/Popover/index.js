import React, { useState } from "react";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import styled from "styled-components";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: var(--p-b-s);
  background-color: black;
  border-radius: var(--p-border-radius);
  padding: 16px;
`;

export default function MouseOverPopover({ children, header, description }) {
  const [anchorEl, setAnchorEl] = useState(null);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <div style={{ overflow: "visible !important" }}>
      <Typography
        aria-owns={open ? "mouse-over-popover" : undefined}
        aria-haspopup="true"
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
      >
        {children}
      </Typography>
      <Popover
        id="mouse-over-popover"
        sx={{
          pointerEvents: "none",
          marginTop: -6,
          overflow: "visible !important",
        }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "center",
          horizontal: "center",
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <Container>
          <Typography
            sx={{
              color: "white",
              fontFamily: "F-Medium !important",
              fontSize: "14px !important",
              backgroundColor: "transparent",
            }}
          >
            {header}
          </Typography>
          <Typography
            sx={{
              color: "white",
              fontFamily: "F-Regular !important",
              fontSize: "12px !important",
              backgroundColor: "transparent",
            }}
          >
            {description}
          </Typography>
          <PlayArrowRoundedIcon
            style={{
              color: "blue",
              transform: "rotate(90deg)",
              fontSize: 25,
              position: "absolute",
              bottom: -10,
            }}
          />
        </Container>
      </Popover>
    </div>
  );
}
