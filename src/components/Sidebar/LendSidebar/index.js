import * as React from "react";
import styled from "styled-components";
import Accordion from "components/Accordion/Sidebar";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Input from "@mui/material/Input";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import Slider from "@mui/material/Slider";
import Box from "@mui/material/Box";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 100%;
`;

const ApplyButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: F-Medium;
  padding: 18px 0;
  margin: 8px 0 0 0;
  border: none;
  outline: none;
  background-color: var(--s-color);
  color: white;
  border-radius: var(--p-border-radius);
  width: 100%;
  font-size: 15px;
  cursor: pointer;
`;

export function LendSidebar(props) {
  const { classes } = props;
  const [values, setValues] = React.useState({
    amount: "",
    password: "",
    weight: "",
    weightRange: "",
    showPassword: false,
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };
  return (
    <Container>
      <Accordion
        title={"Amount"}
        body={
          <Container>
            <FormControl
              fullWidth
              sx={{
                m: 1,
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Input
                id="input-with-icon-adornment"
                variant="filled"
                startAdornment={
                  <InputAdornment position="start">
                    <AttachMoneyIcon />
                  </InputAdornment>
                }
                placeholder="Min"
                sx={{
                  bgcolor: "background.paper",
                  boxShadow: 1,
                  borderRadius: "var(--p-border-radius)",
                  p: 1.2,
                  border: "var(--p-border)",
                  boxShadow: "none",
                  fontFamily: "F-Regular",
                }}
                disableUnderline={true}
              />
              <span style={{ margin: "0px 5px" }}>to</span>
            </FormControl>
            <Input
              id="input-with-icon-adornment-2"
              variant="filled"
              startAdornment={
                <InputAdornment position="start">
                  <AttachMoneyIcon />
                </InputAdornment>
              }
              placeholder="Max"
              sx={{
                bgcolor: "background.paper",
                boxShadow: 1,
                borderRadius: "var(--p-border-radius)",
                p: 1.2,
                border: "var(--p-border)",
                boxShadow: "none",
                fontFamily: "F-Regular",
              }}
              disableUnderline={true}
            />
            <ApplyButton>Apply</ApplyButton>
          </Container>
        }
      />
      <Accordion
        title={"Duration"}
        body={
          <Box width={300}>
            <Slider
              defaultValue={50}
              aria-label="Default"
              valueLabelDisplay="on"
              valueLabelFormat={(value) => <span>{value} days</span>}
              sx={{ paddingTop: 10 }}
            />
            <ApplyButton>Apply</ApplyButton>
          </Box>
        }
      />
      <Accordion title={"Currencies"} body={"KJaklsdjfasdf"} />
      <Accordion title={"Collection"} body={"KJaklsdjfasdf"} />
    </Container>
  );
}

export default LendSidebar;
