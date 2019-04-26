import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

/* Material UI Components */
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

/* MUI Icons */
import AddIcon from '@material-ui/icons/Add';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import PersonIcon from '@material-ui/icons/Person';
import PeopleIcon from '@material-ui/icons/People';
import SettingsIcon from '@material-ui/icons/Settings';
import PowerSettingsIcon from '@material-ui/icons/PowerSettingsNew';

class SignedInLinks extends Component {
  state = {
    anchorEl: null
  }

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { anchorEl } = this.state;
    const { signOut, location: { pathname } } = this.props;
    const open = Boolean(anchorEl);

    return (
      <div>
        <IconButton
          aria-owns={open ? 'menu-appbar' : undefined}
          aria-haspopup="true"
          onClick={this.handleMenu}
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={open}
          onClose={this.handleClose}
        >
          <MenuItem onClick={this.handleClose} component={Link} to="/createEvent" selected={'/createEvent' === pathname}>
            <ListItemIcon>
              <AddIcon />
            </ListItemIcon>
            <ListItemText inset primary="Create Event" />
          </MenuItem>

          <MenuItem onClick={this.handleClose}>
            <ListItemIcon>
              <CalendarTodayIcon />
            </ListItemIcon>
            <ListItemText inset primary="My Events" />
          </MenuItem>

          <MenuItem onClick={this.handleClose}>
            <ListItemIcon>
              <PeopleIcon />
            </ListItemIcon>
            <ListItemText inset primary="My Network" />
          </MenuItem>

          <MenuItem onClick={this.handleClose}>
            <ListItemIcon>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText inset primary="My Profile" />
          </MenuItem>

          <MenuItem onClick={this.handleClose} component={Link} to="/settings" selected={'/settings/basic' === pathname}>
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText inset primary="Settings" />
          </MenuItem>

          <MenuItem onClick={signOut}>
            <ListItemIcon>
              <PowerSettingsIcon />
            </ListItemIcon>
            <ListItemText inset primary="Sign Out" />
          </MenuItem>
        </Menu>
      </div>
    )
  }
}

export default withRouter(SignedInLinks);