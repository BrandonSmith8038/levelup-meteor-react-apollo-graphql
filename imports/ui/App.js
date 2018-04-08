import React from "react";
import gql from "graphql-tag";
import { graphql } from "react-apollo";
import { withApollo } from 'react-apollo'
import { withStyles } from 'material-ui/styles';


import ResolutionForm from './ResolutionForm'
import UserForm from './UserForm'
import Resolutions from './resolutions/Resolutions'
import NavBar from './Navbar'

const styles = {
  flex: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  },
};

const App = ({ loading, resolutions, client, user, classes }) => {
  if(loading) return null
  return ( 
    <div>
    <NavBar />
      <div className={classes.flex}>
        <UserForm
          user={user}
          client={client}
        />
      </div>
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
})(withApollo(withStyles(styles)(App)));