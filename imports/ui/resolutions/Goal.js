import React, { Component } from "react";
import gql from "graphql-tag";
import { graphql } from "react-apollo";
import { withStyles } from "material-ui/styles";

const test = ".";

const styles = {
  goalTitle: {
    color: "rgba(0,0,0,0.7)",
    fontSize: "18px"
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
  "@keyframes strike": {
    from: { width: "0" },
    to: { width: "100%" }
  }
};

class Goal extends Component {
  toggleGoal = () => {
    this.props.toggleGoal({
      variables: {
        id: this.props.goal._id
      }
    });
  };

  render() {
    const { goal, classes } = this.props;
    return (
      <li style={{ listStyle: "none" }} className={classes.goalTitle}>
        <input
          type="checkbox"
          onChange={this.toggleGoal}
          checked={goal.completed}
        />
        <span className={goal.completed ? classes.strike : ""}>
          {goal.name}
        </span>
      </li>
    );
  }
}

const toggleGoal = gql`
  mutation toggleGoal($id: String!) {
    toggleGoal(_id: $id) {
      _id
    }
  }
`;

export default graphql(toggleGoal, {
  name: "toggleGoal",
  options: {
    refetchQueries: ["Resolutions"]
  }
})(withStyles(styles)(Goal));
