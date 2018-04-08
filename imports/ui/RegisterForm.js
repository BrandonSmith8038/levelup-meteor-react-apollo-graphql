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

class RegisterForm extends Component {
  
  constructor(props){
    super(props)
    
    this.state = {
      email: '',
      password: ''
    }
  }
  
  handleChange(e){
    const { value, name } = e.target
    this.setState({
      [name]: value
    })
  }
  
  registerUser = (e) => {
    e.preventDefault()
    Accounts.createUser({
      email: this.email.value,
      password: this.password.value
    }, (error) => {
      if(!error){
        this.props.client.resetStore()
      }
      console.log(error)
    })
  }
  
  render(){
    const { classes } = this.props
    return (
      <form onSubmit={this.registerUser} className={classes.flex}>
        <h1 className={classes.title}>Sign Up</h1>
        <TextField
          label="Email"
          fullWidth
          name="email"
          margin="normal"
          type="email"
          onChange={this.handleChange.bind(this)}
        />
        <TextField
          label="Password"
          fullWidth
          name="password"
          margin="normal"
          type="password"
          onChange={this.handleChange.bind(this)}
        />
        <Button type="submit" className={classes.button} variant="raised" fullWidth>
          Register User
        </Button>
      </form>
    )
  }
}

export default withStyles(styles)(RegisterForm)