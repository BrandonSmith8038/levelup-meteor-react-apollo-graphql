import React from 'react'
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';

const styles = {
  root: {
    flexGrow: 1,
  },
  appBar: {
    background: '#3F51B5',
    textAlign: 'center',
    textTransform: 'uppercase'
  },
  title: {
    fontSize: '30px',
    textAlign: 'center'
  }
};

const NavBar = props => {
  const { classes } = props
  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <Typography 
            align="center"
            variant="title" 
            color="inherit"
            className={classes.title}
          >
            Resolutions
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default  withStyles(styles)(NavBar)