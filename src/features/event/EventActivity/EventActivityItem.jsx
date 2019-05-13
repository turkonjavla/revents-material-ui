import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

/* MUI Components */
import { withStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
});

class EventActivityItem extends Component {

  renderSummary = (activity) => {
    switch (activity.type) {
      case 'newEvent':
        return (
          <ListItem alignItems="flex-start">
            <Tooltip title={activity.hostedBy}>
              <ListItemAvatar>
                <Avatar
                  component={Link}
                  to={{ pathname: '/profile/' + activity.hostUid }}
                  alt={activity.hostedBy}
                  src={activity.photoURL || '/assets/user.png'}
                />
              </ListItemAvatar>
            </Tooltip>
            <ListItemText
              primary={
                <React.Fragment>
                  <Typography>New Event</Typography>
                  {`${activity.hostedBy} is hosting `}
                  {<Typography
                    component={Link}
                    style={{ textDecoration: 'none', color: '#3f51b5' }}
                    to={{ pathname: '/event/' + activity.eventId }}
                  >
                    {activity.title}
                  </Typography>
                  }
                </React.Fragment>
              }
              secondary={moment(activity.timestamp).fromNow()}
            />
          </ListItem>
        )
      case 'cancelledEvent':
        return (
          <ListItem alignItems="flex-start">
            <Tooltip title={activity.hostedBy}>
              <ListItemAvatar>
                <Avatar
                  component={Link}
                  to={{ pathname: '/profile/' + activity.hostUid }}
                  alt={activity.hostedBy}
                  src={activity.photoURL || '/assets/user.png'}
                />
              </ListItemAvatar>
            </Tooltip>
            <ListItemText
              primary={
                <React.Fragment>
                  <Typography>Event Cancelled</Typography>
                  {`${activity.hostedBy} has cancelled `}
                  {<Typography
                    component={Link}
                    style={{ textDecoration: 'none', color: '#3f51b5' }}
                    to={{ pathname: '/event/' + activity.eventId }}
                  >
                    {activity.title}
                  </Typography>
                  }
                </React.Fragment>
              }
              secondary={moment(activity.timestamp).fromNow()}
            />
          </ListItem>
        )

      default:
        break;
    }
  }

  render() {
    const { activity } = this.props;
    return (
      <React.Fragment>
        {this.renderSummary(activity)}
      </React.Fragment>
    )
  }
}

export default withStyles(styles)(EventActivityItem);