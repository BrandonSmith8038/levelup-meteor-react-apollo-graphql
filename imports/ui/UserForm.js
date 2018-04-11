import React, { Component } from "react";
import RegisterForm from "./RegisterForm";
import LoginForm from "./LoginForm";
import Typography from "material-ui/Typography";
import { withStyles } from "material-ui/styles";
import Card, { CardActions, CardContent } from "material-ui/Card";
import Button from "material-ui/Button";

const styles = {
  flex: {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center"
  },
  button: {
    marginTop: "40px",
    background: "#BDBDBD",
    color: "black",
    padding: "15px 0",
    transition: ".3s",
    "&:hover": {
      background: "#9E9E9E"
    }
  },
  card: {
    marginTop: "30px",
    padding: "20px",
    width: "40%"
  }
};

class UserForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      login: true
    };
  }

  render() {
    const { classes } = this.props;
    const { user, client } = this.props;
    const { login } = this.state;
    // if(user._id){
    //   return (
    //     <button onClick={() => {
    //       Meteor.logout()
    //       client.resetStore()
    //     }}>
    //       Logout
    //     </button>
    //   )
    // }

    return (
      <Card className={classes.card}>
        <CardActions className={classes.flex}>
          {login ? (
            <LoginForm client={client} />
          ) : (
            <RegisterForm client={client} />
          )}
          <Button
            className={classes.button}
            variant="raised"
            fullWidth
            onClick={() => this.setState({ login: !login })}
          >
            {login ? "Register An Account" : "Login"}
          </Button>
        </CardActions>
      </Card>
    );
  }
}

export default withStyles(styles)(UserForm);
