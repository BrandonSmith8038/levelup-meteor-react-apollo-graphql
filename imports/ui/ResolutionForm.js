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
    marginTop: '40px',
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
  }
}

class ResolutionForm extends Component{
  constructor(props){
    super(props)
    
    this.state = {
      error: null
    }
  }
  
  submitForm = () => {
    this.props.createResolution({
      variables: {
        name: this.name.value
      }
    }).then(({ data }) => {
      this.name.value = ""
    }).catch(error => {
      this.setState({
        error: error.message
      })
    })
  }
  
  render(){
    const { classes } = this.props
    return(
      <div className={classes.flex}>
        <h1>Add Resolution</h1>
        <input type="text" ref={input => (this.name = input)}/>
        <Button
          className = {classes.button} 
          onClick={this.submitForm}
          varient="raised"
        >
          Add
        </Button>
        {this.state.error && <p>{this.state.error}</p>}
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