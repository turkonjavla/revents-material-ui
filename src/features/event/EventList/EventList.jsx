import React, { Component, Fragment } from 'react'
import EventListItem from './EventListItem';

class EventList extends Component {
  render() {
    const { events, onEventOpen, deleteEvent } = this.props;
    const eventList = events.map(event =>
      <EventListItem
        key={event.id}
        event={event}
        onEventOpen={onEventOpen}
        deleteEvent={deleteEvent}
      />
    )
    return (
      <Fragment>
        {eventList}
      </Fragment>
    )
  }
}

export default EventList;