import React, { Component } from 'react'
import gql from "graphql-tag";
import { graphql } from "react-apollo";

const createResolution = gql`
  mutation createResolution($name: String!) {
    createResolution(name: $name) {
      _id
    }
  }
`
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
    return(
      <div>
        <h1>Add Resolution</h1>
        <input type="text" ref={input => (this.name = input)}/>
        <button onClick={this.submitForm}>Submit</button>
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
})(ResolutionForm)