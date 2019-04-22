import React, { Component } from 'react';

/* Material UI Components */
import Grid from '@material-ui/core/Grid';

/* Components */
import EventList from '../EventList/EventList';
import EventForm from '../EventForm/EventForm';

class EventDashboard extends Component {
  render() {
    return (
      <Grid container>
        <Grid container justify="center" align="center" item sm={6} xs={12}>
          <EventList />
      </Grid>
        <Grid container justify="center" align="center" item sm={6} xs={12}>
          <EventForm />
      </Grid>
      </Grid>
    )
  }
}

export default EventDashboard;