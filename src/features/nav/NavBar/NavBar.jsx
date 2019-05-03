import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';

/* Redux */
import { connect } from 'react-redux';
import { compose } from 'redux';

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
import HomeIcon from '@material-ui/icons/Home';
import PeopleIcon from '@material-ui/icons/People';
import Drawer from '@material-ui/core/Drawer';

/* Components */
import SignedOutMenu from '../Menu/SignedOutMenu';
import SignedInMenu from '../Menu/SignedInMenu';

/* Modal Actions */
import { openModal } from '../../modals/modalActions';

/* Auth Action */
import { logout } from '../../auth/authActions';

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
    textDecoration: 'none'
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
    left: false,
    selectedIndex: 1
  }

  handleSignIn = () => {
    this.props.openModal('LoginModal');
  }

  handleRegister = () => {
    this.props.openModal('RegisterModal');
  }

  handleSignOut = () => {
    this.props.logout();
    this.props.history.push('/events')
  }

  handleDrawerToggle = (side, open) => () => {
    this.setState({
      [side]: open
    })
  }

  handleListItemClick = (event, index) => {
    this.setState({ selectedIndex: index });
  }

  render() {
    const { classes, location: { pathname }, auth } = this.props;
    const authenticated = auth.authenticated;
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
            <Typography component={Link} to="/events" variant="h6" color="inherit" className={classes.grow}>
              Revents
            </Typography>
            {
              authenticated ?
                <SignedInMenu currentUser={auth.currentUser} signOut={this.handleSignOut}
                /> :
                <SignedOutMenu register={this.handleRegister} signIn={this.handleSignIn} />
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

            <ListItem button component={Link} to="/events" selected={'/events' === pathname}>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItem>
            {
              authenticated &&
              <ListItem button component={Link} to="/createEvent" selected={'/createEvent' === pathname}>
                <ListItemIcon>
                  <AddIcon />
                </ListItemIcon>
                <ListItemText primary="Create Event" />
              </ListItem>
            }

            <ListItem button component={Link} to="/people" selected={'/people' === pathname}>
              <ListItemIcon>
                <PeopleIcon />
              </ListItemIcon>
              <ListItemText primary="People Dashboard" />
            </ListItem>

            <ListItem button component={Link} to="/test" selected={'/test' === pathname}>
              <ListItemText primary="Test Area" />
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

const mapStateToProps = state => ({
  auth: state.auth
})

const actions = {
  openModal,
  logout
}

export default compose(
  withRouter,
  connect(mapStateToProps, actions),
  withStyles(styles)
)(NavBar);
