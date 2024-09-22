import { yellow } from "@material-ui/core/colors";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import React from "react";

const styles = theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: yellow,
    marginTop: '100px'
  }
});

function Home(props) {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <h1>Welcome, hunters</h1>
    </div>
  );
}

Home.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Home);
