import React from "react";
import Box from "@mui/material/Box";
import styled from "styled-components";
import Modal from "@mui/material/Modal";

const Title = styled.div`
  width: 100%;
  text-align: center;
  padding: 25px 0;
  font-family: F-Medium;
  border-bottom: var(--p-border);
`;

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  outline: "none",
  borderRadius: "var(--p-border-radius)",
};

export default function BasicModal({ handleClose, open, children, title }) {
  return (
    <Modal
      open={open}
      onClose={() => handleClose()}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Title>{title}</Title>

        <div style={{ padding: 22 }}>{children}</div>
      </Box>
    </Modal>
  );
}
