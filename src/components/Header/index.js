import React, { useState } from "react";
import styled from "styled-components";
import { useStateValue } from "../../context";
import { useHistory } from "react-router-dom";
import { Moralis } from "moralis";
import { useMoralis } from "react-moralis";
import Popover from "@mui/material/Popover";
import LogoutIcon from "@mui/icons-material/Logout";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Web3 from "web3";
import WarningIcon from "@mui/icons-material/Warning";
import MetamaskInstallModal from "components/Metamask/InstallModal";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import Search from "components/Search";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  min-height: 8vh;
  border-bottom: var(--p-border);
  z-index: 0;
`;

const ContainerLeft = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 0 0 60px;
  min-width: 20%;
`;

const ContainerMiddle = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ContainerRight = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  margin: 0 60px 0 0;
  min-width: 20%;
`;

const LogoButton = styled.button`
  cursor: pointer;
  padding: 8px 0px;
  border: none;
  outline: none;
  background-color: transparent;
  font-family: F-Zilla;
  font-size: 28px;
  text-transform: lowercase;
  line-height: 10px;
  margin: 0 0 -3px 0;
  color: var(--p-color);
`;

const Button = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin: 0 0 0 10px;
  height: 45px;
  padding: 0px 16px;
  border: none;
  outline: none;
  background-color: transparent;
  font-size: 15px;
  font-family: F-Medium;
  border-radius: var(--p-border-radius);

  &:hover {
    color: var(--p-color);
  }
`;

const PopoverContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-width: 12rem;
  padding: 20px;
`;

const PopoverOption = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  cursor: pointer;
`;

const PopoverLeft = styled.div``;

const PopoverRight = styled.div`
  font-family: F-Medium;
`;

const Alert = styled.div`
  background-color: var(--p-color);
  color: white;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  height: 6vh;
`;

export function Header() {
  const [{ auth, userAddress }, dispatch] = useStateValue();
  const [openModal, setOpenModal] = useState(false);
  const history = useHistory();
  const [showAlert, setShowAlert] = useState();
  const [anchorEl, setAnchorEl] = useState(null);

  const { authenticate } = useMoralis();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const web3 = new Web3(window.ethereum);

  if (web3.givenProvider !== null) {
    web3.eth.net.getId().then((res, err) => {
      if (res !== 1) {
        setShowAlert(true);
      } else {
        setShowAlert(false);
      }
    });
  }

  const handleLogin = async (redirect) => {
    if (web3.givenProvider != null) {
      Moralis.authenticate({
        signingMessage: `Welcome to Lendzilla 👋\n\n We use your signature as proof that you are the owner of this account.\n\n Happy lending 💸\n\n- Lendzilla Team\n\n\n`,
      }).then(async function (user) {
        const userAddress = await user.get("ethAddress");
        dispatch({
          type: "SET_USER_ADDRESS",
          payload: userAddress,
        });
        dispatch({
          type: "SET_AUTH",
          payload: true,
        });
        history.push(`/${redirect}`);
      });
    } else {
      setOpenModal(true);
    }
  };

  const handleLogout = async () => {
    handleClose();
    Moralis.User.logOut().then(() => {
      history.push("/");
    });
    dispatch({
      type: "SET_USER_ADDRESS",
      payload: "",
    });
    dispatch({
      type: "SET_AUTH",
      payload: false,
    });
  };

  return (
    <>
      <MetamaskInstallModal
        openModal={() => setOpenModal(true)}
        closeModal={() => setOpenModal(false)}
        modalActive={openModal}
      />
      {showAlert && (
        <Alert>
          <WarningIcon
            style={{ fontSize: 18, marginTop: -4, marginRight: 5 }}
          />{" "}
          You are not connected to the mainnet
        </Alert>
      )}
      <Container>
        <ContainerLeft>
          <LogoButton onClick={() => history.push("/")}>LENDZILLA</LogoButton>
        </ContainerLeft>
        <ContainerMiddle>
          <Search />
        </ContainerMiddle>
        <ContainerRight>
          <Button onClick={() => history.push("/lend")}>Lend</Button>
          <Button onClick={() => history.push("/borrow")}>Borrow</Button>

          <Button onClick={() => history.push("/dashboard")}>Dashboard</Button>
          <Button onClick={() => history.push("/dashboard")}>Earn</Button>

          {auth ? (
            <>
              <Button
                aria-describedby={id}
                variant="contained"
                onClick={handleClick}
                style={{ marginLeft: 0 }}
              >
                <ArrowDropDownIcon style={{ color: "var(--p-color)" }} />
                {userAddress.slice(0, 4) +
                  "..." +
                  userAddress.slice(
                    userAddress.length - 4,
                    userAddress.length
                  )}{" "}
              </Button>
              <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: "center",
                  horizontal: "center",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "center",
                }}
              >
                <PopoverContainer>
                  <PopoverOption onClick={handleLogout}>
                    <PopoverLeft>
                      <LogoutIcon />
                    </PopoverLeft>
                    <PopoverRight>Logout</PopoverRight>
                  </PopoverOption>
                </PopoverContainer>
              </Popover>
            </>
          ) : (
            <Button
              style={{
                backgroundColor: "var(--p-color)",
                minWidth: "9rem",
                color: "white",
                marginLeft: 20,
              }}
              onClick={() => handleLogin("borrow")}
            >
              Connect
              <AccountBalanceWalletOutlinedIcon
                style={{ fontSize: 20, marginLeft: 10, marginTop: -2.2 }}
              />{" "}
            </Button>
          )}
        </ContainerRight>
      </Container>
    </>
  );
}

export default Header;
