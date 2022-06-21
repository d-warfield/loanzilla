import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const styles = (theme) => ({
  root: {
    width: "100%",
    borderBottom: "var(--p-border)",
    borderRadius: "0px",
    boxShadow: "none",
  },
  summary: {
    backgroundColor: "#ffffff",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
    padding: "15px 0",
    fontFamily: "F-Medium",
    margin: "0 15px",
    backgroundColor: "#fffff",
  },
  expanded: {
    "&$expanded": {
      margin: 0,
      borderRadius: "0px",
      backgroundColor: "#EAEEF0",
      fontFamily: "F-Medium",
    },
  },
});

function SimpleExpansionPanel(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <ExpansionPanel
        elevation={0}
        square={true}
        borderRadius={0}
        classes={{ expanded: classes.expanded }}
        sx={{
          borderBottom: "var(--p-border)",
          backgroundColor: "var(--s-color)",
        }}
      >
        <AccordionSummary
          className={classes.summary}
          expandIcon={<ExpandMoreIcon />}
        >
          <Typography className={classes.heading}>{props.title}</Typography>
        </AccordionSummary>
        <ExpansionPanelDetails>
          <Typography
            style={{ fontFamily: "F-Regular", backgroundColor: "transparent" }}
          >
            {props.body}
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  );
}

SimpleExpansionPanel.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleExpansionPanel);
