import React, { Component } from "react";
import { withStyles } from "material-ui/styles";
import AppBar from "material-ui/AppBar";
import Toolbar from "material-ui/Toolbar";
import Typography from "material-ui/Typography";
import Button from "material-ui/Button";

const styles = {
  root: {
    flexGrow: 1
  },
  appBar: {
    background: "#3F51B5",
    textAlign: "center",
    textTransform: "uppercase"
  },
  title: {
    fontSize: "30px",
    textAlign: "center"
  },
  button: {
    marginLeft: "auto",
    marginTop: "15px",
    background: "#3F51B5",
    color: "white",
    transition: ".3s",
    "&:hover": {
      background: "#303F9F"
    }
  }
};
class NavBar extends Component {
  constructor(props) {
    super(props);
  }
  renderLogOut() {
    return (
      <Button
        className={this.props.classes.button}
        onClick={() => {
          Meteor.logout();
          this.props.client.resetStore();
        }}
      >
        Logout
      </Button>
    );
  }

  render() {
    const { classes } = this.props;
    const { user, client } = this.props;
    return (
      <div className={classes.root}>
        <AppBar position="static" className={classes.appBar}>
          <Toolbar>
            <Typography
              align="center"
              variant="title"
              color="inherit"
              className={classes.title}
            >
              Resolutions
            </Typography>
            <div style={{ width: "100%", textAlign: "right" }}>
              {this.props.user._id && this.renderLogOut()}
            </div>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default withStyles(styles)(NavBar);
