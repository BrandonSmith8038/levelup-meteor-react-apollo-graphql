import React from "react";
import gql from "graphql-tag";
import { graphql } from "react-apollo";
import { withApollo } from 'react-apollo'

import RegisterForm from './RegisterForm'
import LoginForm from './LoginForm'
import ResolutionForm from './ResolutionForm'
import GoalForm from './GoalForm'

const App = ({ loading, resolutions, client, user }) => {
  if(loading) return null
  return ( 
    <div>
      { user._id ? (
        <button onClick={() => {
          Meteor.logout()
          client.resetStore()
        }}>
          Logout
        </button>
        ) : (
          <div>
            <RegisterForm client={client}/>
            <LoginForm client={client}/>
          </div>
        ) }
      <ResolutionForm />
      <ul>
        {resolutions.map(({_id, name}) => (
          <li key={_id}>
            {name}
            <GoalForm resolutionId={_id} />
          </li>  
        ))}
      </ul>
    </div>
  )
}


const resolutionsQuery = gql`
  query Resolutions {
  resolutions {
      name
      _id
    }
    user {
      _id
    }
  }

`;

export default graphql(resolutionsQuery, {
  props: ({data}) => ({ ...data })
})(withApollo(App));