import React from "react";
import gql from "graphql-tag";
import { graphql } from "react-apollo";

import ResolutionForm from './ResolutionForm'

const App = ({ loading, resolutions }) => {
  if(loading) return null
  return ( 
    <div>
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
})(App);