import React, { Component } from "react";
import gql from "graphql-tag";
import { graphql } from "react-apollo";
import Button from "material-ui/Button";
import TextField from "material-ui/TextField";
import { withStyles } from "material-ui/styles";

const createGoal = gql`
  mutation createGoal($name: String!, $resolutionId: String!) {
    createGoal(name: $name, resolutionId: $resolutionId) {
      _id
    }
  }
`;
const styles = {
  button: {
    marginLeft: "15px",
    marginTop: "15px",
    background: "#3F51B5",
    color: "white",
    transition: ".3s",
    "&:hover": {
      background: "#303F9F"
    }
  },
  form: {
    marginBottom: '40px',
    width: "60%"
  },
  heading: {
    color: "rgba(0, 0, 0, 0.7)",
    fontSize: "25px",
    textTransform: "uppercase"
  },
  error: {
    color: "#F44336",
    fontSize: "12px",
    textTransform: "uppercase"
  },
  error: {
    color: "#F44336",
    fontSize: "12px",
    textTransform: "uppercase"
  }
};

class GoalForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      name: ""
    };
  }

  submitForm = () => {
    this.setState({
      error: null
    });
    if (this.state.name === "") {
      this.setState({
        error: "You Must Provide A goal"
      });
      return;
    }
    this.props
      .createGoal({
        variables: {
          name: this.state.name,
          resolutionId: this.props.resolutionId
        }
      })
      .then(() => {
        this.state.name = "";
      })
      .catch(error => {
        console.log(error);
      });
  };

  handleChange(e) {
    const { value, name } = e.target;
    this.setState({
      [name]: value
    });
  }

  render() {
    const { classes } = this.props;
    return (
      <div style={{ marginTop: "30px", width: "70%" }}>
        <p
          className={classes.heading}
          style={{ marginBottom: 0, marginTop: 0 }}
        >
          Add Goal
        </p>
        <TextField
          className={classes.form}
          margin="normal"
          name="name"
          onChange={this.handleChange.bind(this)}
          placeholder="Goal"
          type="name"
          value={this.state.name}
        />
        <Button className={classes.button} onClick={this.submitForm}>
          Add Goal
        </Button>
        {this.state.error && (
          <p className={classes.error}>{this.state.error}</p>
        )}
      </div>
    );
  }
}

export default graphql(createGoal, {
  name: "createGoal",
  options: {
    refetchQueries: ["Resolutions"]
  }
})(withStyles(styles)(GoalForm));
