import React, { Component, Fragment } from 'react'
import EventListItem from './EventListItem';
import InfiniteScroll from "react-infinite-scroller";

class EventList extends Component {
  render() {
    const { events, deleteEvent, getNextEvents, moreEvents, loading } = this.props;
    const eventList = events && events.map(event =>
      <EventListItem
        key={event.id}
        event={event}
        deleteEvent={deleteEvent}
      />
    )
    return (
      <Fragment>
        {
          events &&
          events.length !== 0 &&
          <InfiniteScroll 
            pageStart={0}
            height={10}
            loadMore={getNextEvents}
            hasMore={!loading && moreEvents}
            initialLoad={false}
          >
            {eventList}
          </InfiniteScroll>
        }
      </Fragment>
    )
  }
}

export default EventList;