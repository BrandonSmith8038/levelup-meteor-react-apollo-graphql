import React from "react";
import gql from "graphql-tag";
import { graphql } from "react-apollo";

const App = ({ data }) => {
  if(data.loading) return null
  return ( 
    <div>
      <h1>{data.hi}</h1>
      <ul>
        {data.resolutions.map(({_id, name}) => {
          return (
            <li key={_id}>{name}</li>  
          )
        })}
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