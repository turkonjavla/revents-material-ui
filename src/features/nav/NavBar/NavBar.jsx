import React, { Component } from 'react';
import PropTypes from 'prop-types';

/* Material UI Components */
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AddIcon from '@material-ui/icons/Add';
import Drawer from '@material-ui/core/Drawer';

/* Components */
import SignedOutLinks from '../Menu/SignedOutLinks';
import SignedInLinks from '../Menu/SignedInLinks';

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -1,
    marginRight: 1,
  },
  list: {
    width: 250,
  }
};

class NavBar extends Component {
  state = {
    auth: false,
    left: false
  }

  handleSignIn = () => {
    this.setState({
      auth: true
    })
  }

  handleSignOut = () => {
    this.setState({
      auth: false
    })
  }

  handleDrawerToggle = (side, open) => () => {
    this.setState({
      [side]: open
    })
  }

  render() {
    const { classes } = this.props;
    const { auth } = this.state;
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerToggle('left', true)}
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" className={classes.grow}>
              Revents
          </Typography>
            {
              auth ?
                <SignedInLinks signOut={this.handleSignOut}
                /> :
                <SignedOutLinks signIn={this.handleSignIn} />
            }
          </Toolbar>
        </AppBar>
        <Drawer open={this.state.left} onClose={this.handleDrawerToggle('left', false)}>
          <div
            tabIndex={0}
            role="button"
            onClick={this.handleDrawerToggle('left', false)}
            onKeyDown={this.handleDrawerToggle('left', false)}
          >
            <ListItem button>
              <ListItemText primary="Create Event" />
              <ListItemIcon>
                <AddIcon />
              </ListItemIcon>
            </ListItem>
          </div>
        </Drawer>
      </div>
    )
  }
}

NavBar.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(NavBar);
