import React from "react";
import gql from "graphql-tag";
import { graphql } from "react-apollo";
import { withApollo } from 'react-apollo'


import ResolutionForm from './ResolutionForm'
import UserForm from './UserForm'
import Resolutions from './resolutions/Resolutions'

const App = ({ loading, resolutions, client, user }) => {
  
  if(loading) return null
  return ( 
    <div>
      <UserForm
        user={user}
        client={client}
      />
      {user._id && <ResolutionForm /> }
      {user._id && <Resolutions resolutions={resolutions} /> }
    </div>
  )
}


const resolutionsQuery = gql`
  query Resolutions {
  resolutions {
    name
    _id
    completed
    goals {
      _id
      name
      completed
    }
  }
  user {
    _id
  }
}
`;

export default graphql(resolutionsQuery, {
  props: ({data}) => ({ ...data })
})(withApollo(App));