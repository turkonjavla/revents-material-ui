import React from 'react';
import { Link } from 'react-router-dom'

/* MUI Components */
import Card from '@material-ui/core/Card';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';

/* MUI Icon */
import StarIcon from '@material-ui/icons/Star';
import { Tooltip } from '@material-ui/core';

const EventDetailsSidebar = ({ attendees }) => {
  return (
    <Card style={{ marginBottom: '2em' }}>
      <List
        subheader={
          <ListSubheader>
            {attendees && attendees.length} {attendees && attendees.length > 1 ? 'People' : 'Person'} Going
          </ListSubheader>
        }
      >
        {
          attendees &&
          attendees.map(attendee => (
            <ListItem key={attendee.id}>
              <ListItemAvatar>
                <Avatar
                  alt={`/assets/user.png`}
                  src={attendee.photoURL}
                  component={Link}
                  to={`/profile/${attendee.id}`}
                >
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={attendee.displayName}
              />
              <ListItemSecondaryAction>
                {
                  attendee.host &&
                  <Tooltip title="Event Host">
                    <IconButton aria-label="Delete">
                      <StarIcon />
                    </IconButton>
                  </Tooltip>
                }
              </ListItemSecondaryAction>
            </ListItem>
          ))
        }
      </List>
    </Card>
  )
}

export default EventDetailsSidebar
