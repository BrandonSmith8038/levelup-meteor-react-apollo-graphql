import React from "react";
import gql from "graphql-tag";
import { graphql } from "react-apollo";
import { withApollo } from 'react-apollo'

import RegisterForm from './RegisterForm'
import LoginForm from './LoginForm'
import ResolutionForm from './ResolutionForm'

const App = ({ loading, resolutions, client }) => {
  if(loading) return null
  return ( 
    <div>
      <button onClick={() => {
        Meteor.logout()
        client.resetStore()
      }}>
        Logout
      </button>
      <RegisterForm client={client}/>
      <LoginForm client={client}/>
      <ResolutionForm />
      <ul>
        {resolutions.map(({_id, name}) => (
          <li key={_id}>{name}</li>  
        ))}
      </ul>
    </div>
  )
}


const resolutionsQuery = gql`
  query Resolutions{
    resolutions {
      name
      _id
    }
  }
`;

export default graphql(resolutionsQuery, {
  props: ({data}) => ({ ...data })
})(withApollo(App));