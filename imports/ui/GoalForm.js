import React, { Component } from 'react'
import gql from "graphql-tag";
import { graphql } from "react-apollo";

const createGoal = gql`
  mutation createGoal($name: String!, $resolutionId: String!) {
    createGoal(name: $name, resolutionId: $resolutionId) {
      _id
    }
  }
`
class GoalForm extends Component{
  submitForm = () => {
    this.props.createGoal({
      variables: {
        name: this.name.value,
        resolutionId: this.props.resolutionId
      }
    }).then(({ data }) => {
      //this.props.refetch()
    }).catch(error => {
      console.log(error)
    })
  }
  
  render(){
    return(
      <div>
        <p style={{ marginBottom: 0, marginTop: 0 }}>Add Goal</p>
        <input type="text" ref={input => (this.name = input)}/>
        <button onClick={this.submitForm}>Submit</button>
      </div>
    )
  }
}

export default graphql(createGoal, {
  name: 'createGoal',
  options: {
    refetchQueries: ['Resolutions']
  }
})(GoalForm)