import React, { Component } from 'react'
import gql from "graphql-tag";
import { graphql } from "react-apollo";
import Button from 'material-ui/Button';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import { withStyles } from 'material-ui/styles';


const createResolution = gql`
  mutation createResolution($name: String!) {
    createResolution(name: $name) {
      _id
    }
  }
`
const styles = {
  button: {
    marginTop: '15px',
    background: '#3F51B5',
    color: 'white',
    transition: '.3s',
    '&:hover': {
      background: '#303F9F'
    }
  },
  flex: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column"
  },
  form: {
    width: '50%'
  },
  heading: {
    color: 'rgba(0, 0, 0, 0.7)'
  },
  error: {
    color: '#F44336',
    fontSize: '12px',
    textTransform: 'uppercase'

  }
}

class ResolutionForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      error: null,
      name: null
    }
  }

  handleChange(e) {
    const { value, name } = e.target
    this.setState({
      [name]: value
    })
  }

  submitForm = () => {
    this.setState({
      error: null
    })
    this.props.createResolution({
      variables: {
        name: this.state.name
      }
    }).then(({ data }) => {
      this.state.name = ""
    }).catch(error => {
      if (this.state.name === null) {
        this.setState({
          error: 'You must enter a resolution'
        })
      } else {
        this.setState({
          error: error.message
        })
      }
    })
  }

  render() {
    const { classes } = this.props
    return (
      <div className={classes.flex}>
        <h1 className={classes.heading}>Add Resolution</h1>
        <TextField
          className={classes.form}
          margin="normal"
          name="name"
          onChange={this.handleChange.bind(this)}
          placeholder="Resolution"
          type="resolution"
          value={this.state.name}
        />
        <Button
          className={classes.button}
          onClick={this.submitForm}
          varient="raised"
        >
          Add
        </Button>
        {this.state.error && <p className={classes.error}>{this.state.error}</p>}
      </div>
    )
  }
}

export default graphql(createResolution, {
  name: 'createResolution',
  options: {
    refetchQueries: ['Resolutions']
  }
})(withStyles(styles)(ResolutionForm))