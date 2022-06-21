import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const Icon = styled.div`
display: flex,
align-items: center;
justify-content: center;
margin: 0 6px 0 0;

`;

const styles = (theme) => ({
  root: {
    width: "100%",
    // border: "var(--p-border)",
    boxShadow: "var(--p-b-s)",
    marginBottom: 20,
    borderRadius: "var(--p-border-radius)",
    overflow: "hidden",
  },
  summary: {
    backgroundColor: "#ffffff",

    borderBottom: "var(--p-border)",
  },
  heading: {
    display: "flex",
    alignItems: "center",
    fontSize: theme.typography.pxToRem(16),
    fontWeight: theme.typography.fontWeightRegular,
    fontFamily: "F-Medium",
    padding: "2px 0",
    margin: "0px !important",
  },
  expanded: {
    "&$expanded": {
      borderRadius: "var(--p-border-radius)",
    },
  },
});

function SimpleExpansionPanel(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <ExpansionPanel
        expanded={props.expanded}
        elevation={0}
        classes={{ expanded: classes.expanded }}
        // disableSpacing={true}
        TransitionProps={{
          timeout: 0,
        }}
        sx={{
          boxShadow: "none",
          borderBottom: "var(--p-border)",
        }}
      >
        <AccordionSummary
          className={classes.summary}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row",
          }}
          expandIcon={<ExpandMoreIcon />}
        >
          <Typography className={classes.heading}>
            <Icon>{props.icon}</Icon>

            {props.title}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>{props.body}</AccordionDetails>
      </ExpansionPanel>
    </div>
  );
}

SimpleExpansionPanel.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleExpansionPanel);
