import React, { Component } from "react";
import { withStyles } from "material-ui/styles";
import Card, { CardActions, CardContent } from "material-ui/Card";
import FlipMove from "react-flip-move";

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
    fontSize: "40px",
    marginBottom: "60px",
    textTransform: "uppercase"
  }
};

class Resolutions extends Component {
  render() {
    const { resolutions, classes } = this.props;
    const striked = [classes.strike, classes.resolutionTitle];
    return (
      <ul>
        {resolutions.map(({ _id, name, completed, goals }) => (
          <FlipMove key={_id}>
            <Card className={classes.card}>
              <li className={classes.fullWidth} style={{ textAlign: "center" }}>
                <h1
                  className={
                    completed ? striked.join(" ") : classes.resolutionTitle
                  }
                >
                  {name}
                </h1>

                <div className={classes.flex}>
                  <ul>
                    {goals.map(goal => {
                      return (
                        <FlipMove key={goal._id}>
                          <Goal goal={goal} />
                        </FlipMove>
                      );
                    })}
                  </ul>
                  <GoalForm resolutionId={_id} />
                </div>
              </li>
            </Card>
          </FlipMove>
        ))}
      </ul>
    );
  }
}

export default withStyles(styles)(Resolutions);
