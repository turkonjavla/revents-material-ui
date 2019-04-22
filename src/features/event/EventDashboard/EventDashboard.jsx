import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';

class EventDashboard extends Component {
  render() {
    return (
      <Grid container spacing={24}>
        <Grid item sm={8} xs={12}>
          Left Pane
      </Grid>
        <Grid item sm={4} xs={12}>
          Right Pane
      </Grid>
      </Grid>
    )
  }
}

export default EventDashboard;