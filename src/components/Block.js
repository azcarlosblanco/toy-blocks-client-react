import React from "react";
import PropTypes from "prop-types";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import {
  ExpansionPanel,
  ExpansionPanelSummary,
  Typography,
  ExpansionPanelDetails,
  makeStyles,
  Box,
  Grid,
} from "@material-ui/core";
import colors from "../constants/colors";
import Status from "./Status";
import Blocks from "../containers/Blocks";

const Block = ({ item: {attributes}  }) => {
  const classes = useStyles();

  return (
    <Grid className={classes.grid} item xs={12}>
      <Typography className={classes.text1}>{('000' + attributes.index).substr(-3)}</Typography>
      <Typography className={classes.text2}>{attributes.data}</Typography>
    </Grid>
  );
};

const useStyles = makeStyles((theme) => ({
  grid: {
    margin: "5px 0",
    padding: "5px",
    backgroundColor: "#CCCCCC",
    borderRadius: "5px"
  },
  text1: {
    color: "blue",
    fontSize: '10px',
    fontWeight: "bold"
  },
  text2: {
    color: "black",
  },
  
}));

Block.propTypes = {
  item: PropTypes.object.isRequired
};

export default Block;
