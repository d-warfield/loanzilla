import React from "react";
import styled from "styled-components";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import METAMASKICON from "../../../assets/icons/metamask.svg";

const style = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  position: "absolute",
  top: "50%",
  left: "50%",
  width: 280,
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 12,
  borderRadius: "var(--p-border-radius)",
  p: 4,
};

const MetamaskIcon = styled.img`
  height: 5rem;
  width: 5rem;
`;

const ModalText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 25px 0;
`;

const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: F-Medium;
`;
const ModalDescription = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  color: var(--secondary-text-color);
  margin: 6px 0 0 0;
  max-width: 14rem;
  text-align: center;
  line-height: 20px;
`;

const MetamaskOnboardButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: F-Medium;
  color: white;
  border: none;
  outline: none;
  background-color: var(--p-color);
  border-radius: var(--p-border-radius);
  width: 100%;
  padding: 16px 0;
  cursor: pointer;
`;

export function InstallModal({ closeModal, modalActive }) {
  return (
    <Modal
      open={modalActive}
      onClose={closeModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <MetamaskIcon src={METAMASKICON} />
        <ModalText>
          <ModalHeader>Install Metamask</ModalHeader>
          <ModalDescription>
            You'll need a Web3 wallet to use to this website.
          </ModalDescription>
        </ModalText>
        <MetamaskOnboardButton
          onClick={() => {
            window.open(
              "https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn",
              "_blacnk"
            );
            closeModal();
          }}
        >
          Install
        </MetamaskOnboardButton>
      </Box>
    </Modal>
  );
}

export default InstallModal;
