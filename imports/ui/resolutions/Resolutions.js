import React, { Component } from "react";
import { withStyles } from "material-ui/styles";
import Card, { CardActions, CardContent } from "material-ui/Card";
import Button from "material-ui/Button";
import gql from "graphql-tag";
import { graphql } from "react-apollo";

import GoalForm from "../GoalForm";
import Goal from "./Goal";

const styles = {
  card: {
    alignItems: "center",
    display: "flex",
    justifyContent: "center",
    margin: "15px auto",
    padding: "15px 0",
    width: "70%"
  },
  button: {
    marginRight: "15px",
    float: "right",
    marginTop: "15px",
    background: "#F44336",
    color: "white",
    transition: ".3s",
    "&:hover": {
      background: "#D32F2F"
    }
  },
  flex: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start"
  },
  fullWidth: {
    listStyle: "none",
    width: "100%"
  },
  strike: {
    position: "relative",
    "&:after": {
      position: "absolute",
      top: "50%",
      left: "0",
      width: "100%",
      height: "1px",
      background: "black",
      content: "''",
      animationName: "strike",
      animationDuration: "1s",
      animationTimingFunction: "linear",
      animationIterationCount: "1",
      animationFillMode: "forwards"
    }
  },
  resolutionTitle: {
    color: "rgba(0,0,0,0.7)",
    fontSize: "30px",
    marginBottom: "40px",
    textTransform: "uppercase"
  }
};

class Resolutions extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  deleteResolution = props => {
    this.props
      .deleteResolution({
        variables: {
          id: "bckCrAgvoJNqayq2Y"
        }
      })
      .then(() => this.props.client.resetStore())
      .catch(error => {
        console.log(props);
        console.log(error);
      });
  };

  render() {
    const { resolutions, classes } = this.props;
    const striked = [classes.strike, classes.resolutionTitle];
    return (
      <ul>
        {resolutions.map(({ _id, name, completed, goals }) => (
          <Card key={_id} className={classes.card} _id={_id}>
            <li className={classes.fullWidth} style={{ textAlign: "center" }}>
              <Button
                className={classes.button}
                onClick={this.deleteResolution.bind(this)}
              >
                Delete
              </Button>
              <h1
                className={
                  completed ? striked.join(" ") : classes.resolutionTitle
                }
              >
                {name}
              </h1>

              <div className={classes.flex}>
                <GoalForm resolutionId={_id} />
                <ul>
                  {goals.map(goal => {
                    return <Goal goal={goal} key={goal._id} />;
                  })}
                </ul>
              </div>
            </li>
          </Card>
        ))}
      </ul>
    );
  }
}

const deleteResolution = gql`
  mutation deleteResolution($id: String!) {
    deleteResolution(_id: $id) {
      id
    }
  }
`;

export default graphql(deleteResolution, {
  name: "deleteResolution",
  options: {
    refetchQueries: ["Resolutions"]
  }
})(withStyles(styles)(Resolutions));
