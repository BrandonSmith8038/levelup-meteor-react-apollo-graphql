import React from "react";
import gql from "graphql-tag";
import { graphql } from "react-apollo";
import { withApollo } from 'react-apollo'

import RegisterForm from './RegisterForm'
import LoginForm from './LoginForm'
import ResolutionForm from './ResolutionForm'
import GoalForm from './GoalForm'
import Goal from './resolutions/Goal'

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
      {user._id ? (
        <div>
          <ResolutionForm />
          <ul>
            {resolutions.map(({_id, name, completed, goals}) => (
              <li key={_id}>
                <span style={{
                  textDecoration: completed ? "line-through" : ""
                }}>
                  {name}
                </span>
                <ul>
                  {goals.map(goal => (
                    <Goal goal={goal} key={goal._id} />
                  ))}
                </ul>
                <GoalForm resolutionId={_id} />
              </li>  
            ))}
          </ul>
        </div>
      ) : (
        ""
      )}
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