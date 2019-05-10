import React, { Component } from 'react'
import PropTypes from 'prop-types';
import moment from 'moment';

/* MUI Components */
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import Card from '@material-ui/core/Card';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItemText from '@material-ui/core/ListItemText';
import CardContent from '@material-ui/core/CardContent';
import Collapse from '@material-ui/core/Collapse';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';

/* MUI Icons */
import InfoIcon from '@material-ui/icons/Info';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import EventDetailsMap from './EventDetailsMap';

const styles = theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  }
});

class EventDetailsInfo extends Component {
  state = {
    expanded: false
  };

  componentWillUnmount() {
    this.setState({
      expanded: false
    })
  }

  handleExpandClick = () => {
    this.setState(prevState => ({ expanded: !prevState.expanded }));
  };

  render() {
    const { classes, event } = this.props;
    return (
      <Card style={{ marginBottom: '2em' }}>
        <List
          subheader={
            <ListSubheader>
              Summary
          </ListSubheader>
          }
          className={classes.root}>
          <ListItem>
            <ListItemIcon>
              <InfoIcon />
            </ListItemIcon>
            <ListItemText primary={event.description} />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <CalendarTodayIcon />
            </ListItemIcon>
            <ListItemText primary={
              `${moment(event.date).format('dddd Do MMMM')} at ${moment(event.date).format('hh:mm A')}`
            }
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <LocationOnIcon />
            </ListItemIcon>
            <ListItemText primary={event.venue} />
            <ListItemSecondaryAction>
              <IconButton
                className={classnames(classes.expand, {
                  [classes.expandOpen]: this.state.expanded,
                })}
                onClick={this.handleExpandClick}
                aria-expanded={this.state.expanded}
                aria-label="Show more"
              >
                <ExpandMoreIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
          <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
            <CardContent>
              {
                this.state.expanded &&
                <EventDetailsMap
                  lat={event.venueLatLng.lat}
                  lng={event.venueLatLng.lng}
                />
              }
            </CardContent>
          </Collapse>
        </List>
      </Card >
    )
  }
}

EventDetailsInfo.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EventDetailsInfo);