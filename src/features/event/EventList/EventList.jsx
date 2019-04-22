import React, { Component } from 'react'
import EventListItem from './EventListItem';
import CssBaseline from '@material-ui/core/CssBaseline';
class EventList extends Component {
  render() {
    return (
      <div>
        <CssBaseline />
        <EventListItem />
      </div>
    )
  }
}

export default EventList;