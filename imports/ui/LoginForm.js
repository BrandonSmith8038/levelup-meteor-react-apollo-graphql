import React, { Component } from 'react'
import { Accounts } from 'meteor/accounts-base'
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';

const styles = {
  flex: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    width: '100%',
  },
  button: {
    marginTop: '40px',
    background: '#3F51B5',
    color: 'white',
    padding: '15px 0',
    transition: '.3s',
     '&:hover': {
       background: '#303F9F'
     }
  },
  title: {
    color: 'rgba(0,0,0,0.7)',
    fontSize: '35px',
    textTransform: 'uppercase',
  }
};

class LoginForm extends Component {
  
  login = (e) => {
    e.preventDefault()
    Meteor.loginWithPassword(this.email.value,this.password.value, (error) => {
      if(!error){
        this.props.client.resetStore()
      }
      
      console.log(error)
    })
  }
  
  render(){
    const { classes } = this.props
    return (
      <form onSubmit={this.login} className={classes.flex}>
        <h1 className={classes.title}>Login</h1>
        <TextField
          label="Email"
          fullWidth
          margin="normal"
          type="email"
          ref={(input) => (this.email = input)}
        />
        <TextField
          label="Password"
          fullWidth
          margin="normal"
          type="password"
          ref={(input) => (this.password = input)}
        />
        <Button fullWidth type="submit" className={classes.button}>
          Login
        </Button>
      </form>
    )
  }
}

export default withStyles(styles)(LoginForm)