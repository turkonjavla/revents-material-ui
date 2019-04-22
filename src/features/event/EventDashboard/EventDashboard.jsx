import React, { Component } from 'react';

/* Material UI Components */
import Grid from '@material-ui/core/Grid';

/* Components */
import EventList from '../EventList/EventList';

class EventDashboard extends Component {
  render() {
    return (
      <Grid container spacing={24}>
        <Grid container justify="center" align="center" item sm={8} xs={12}>
          <EventList />
      </Grid>
        <Grid item sm={4} xs={12}>
          Right Pane
      </Grid>
      </Grid>
    )
  }
}

export default EventDashboard;