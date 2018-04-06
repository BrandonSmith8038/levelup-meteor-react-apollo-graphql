import React from "react";
import gql from "graphql-tag";
import { graphql } from "react-apollo";

import ResolutionForm from './ResolutionForm'

const App = ({ data }) => {
  if(data.loading) return null
  return ( 
    <div>
      <h1>{data.hi}</h1>
      <ResolutionForm />
      <ul>
        {data.resolutions.map(({_id, name}) => (
          <li key={_id}>{name}</li>  
        ))}
      </ul>
    </div>
  )
}


const hiQuery = gql`
  {
    hi
    resolutions {
      name
      _id
    }
  }
`;

export default graphql(hiQuery)(App);