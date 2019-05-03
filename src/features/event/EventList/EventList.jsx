import React, { Component, Fragment } from 'react'
import EventListItem from './EventListItem';

class EventList extends Component {
  render() {
    const { events, deleteEvent } = this.props;
    const eventList = events && events.map(event =>
      <EventListItem
        key={event.id}
        event={event}
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