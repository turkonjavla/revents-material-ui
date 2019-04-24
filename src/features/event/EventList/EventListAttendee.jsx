import React from 'react';

const EventListAttendee = ({ attendee }) => {
  return (
    <div>
      <img
        style={{ width: '50px', height: '50px' }}
        src={attendee.photoURL}
        alt={attendee.name}
      />
    </div>
  )
}

export default EventListAttendee;