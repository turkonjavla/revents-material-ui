import React from 'react';
import { Link } from 'react-router-dom'

import Avatar from '@material-ui/core/Avatar';
import Tooltip from '@material-ui/core/Tooltip';

const EventListAttendee = ({ attendee }) => {
  return (
    <Tooltip title={attendee.displayName}>
      <Avatar
        alt={attendee.displayName}
        src={attendee.photoURL}
        style={{ marginLeft: '0.3em' }}
        component={Link}
        to={`/profile/${attendee.id}`}
      />
    </Tooltip>
  )
}

export default EventListAttendee;