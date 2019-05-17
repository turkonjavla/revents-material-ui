import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'redux';

/* Material UI Components */
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

/* MUI Icons */
import SettingsIcon from '@material-ui/icons/Settings';


class SettingsNav extends Component {
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
    const { location: { pathname } } = this.props;
    const open = Boolean(anchorEl);

    return (
      <div>
        <IconButton
          aria-owns={open ? 'menu-appbar' : undefined}
          aria-haspopup="true"
          onClick={this.handleMenu}
          color="inherit"
        >
          <SettingsIcon />
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
          <MenuItem onClick={this.handleClose} component={Link} to="/settings/basic" selected={'/settings/basic' === pathname}>
            Basics
          </MenuItem>

          <MenuItem onClick={this.handleClose} component={Link} to="/settings/about" selected={'/settings/about' === pathname}>
            About Me
          </MenuItem>

          <MenuItem onClick={this.handleClose} component={Link} to="/settings/photos" selected={'/settings/photos' === pathname}>
            My Photos
          </MenuItem>

          <MenuItem onClick={this.handleClose} component={Link} to="/settings/account" selected={'/settings/account' === pathname}>
            My Account
          </MenuItem>
        </Menu>
      </div>
    )
  }
}

export default compose(
  withRouter
)(SettingsNav);