import React, { Component } from 'react';
import { Link, NavLink, withRouter } from 'react-router-dom';

/* Material UI Components */
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';

/* MUI Icons */
import AddIcon from '@material-ui/icons/Add';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import PersonIcon from '@material-ui/icons/Person';
import HomeIcon from '@material-ui/icons/Home';
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
    const { signOut, location: { pathname }, profile, auth } = this.props;
    const open = Boolean(anchorEl);
    return (
      <div>
        <IconButton
          aria-owns={open ? 'menu-appbar' : undefined}
          aria-haspopup="true"
          onClick={this.handleMenu}
          color="inherit"
        >
          <Avatar alt="Remy Sharp" src={profile.photoURL || '/assets/user.png'} style={{ width: '30px', height: '30px' }} />
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
          <MenuItem style={{ background: 'none' }} disabled={false} selected={false}>
            <ListItemIcon>
              <Avatar alt="Remy Sharp" src={profile.photoURL || '/assets/user.png'} style={{ width: '30px', height: '30px' }} />
            </ListItemIcon>
            <ListItemText inset primary={profile.displayName} />
          </MenuItem>
          <Divider />
          <MenuItem onClick={this.handleClose} component={Link} to="/events" selected={'/events' === pathname}>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText inset primary={"Home"} />
          </MenuItem>

          <MenuItem onClick={this.handleClose} component={Link} to="/createEvent" selected={'/createEvent' === pathname}>
            <ListItemIcon>
              <AddIcon />
            </ListItemIcon>
            <ListItemText inset primary={"Create Event"} />
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

          <MenuItem
            component={Link}
            to={`/profile/${auth.uid}`}
            onClick={this.handleClose}
            selected={`/profile/${auth.uid}` === pathname}
          >
            <ListItemIcon>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText inset primary="My Profile" />
          </MenuItem>

          <MenuItem
            onClick={this.handleClose}
            component={NavLink}
            to="/settings"
            selected={
              '/settings/basic' === pathname ||
              '/settings/about' === pathname ||
              '/settings/photos' === pathname ||
              '/settings/account' === pathname
            }
          >
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