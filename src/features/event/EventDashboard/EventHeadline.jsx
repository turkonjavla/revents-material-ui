import React, { Component } from 'react';

/* Material UI Components */
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
  topBar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  block: {
    padding: theme.spacing.unit * 2,
  }
})

class EventHeadline extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Grid item xs={12}>
        <div className={classes.topBar}>
          <div className={classes.block}>
            <Typography variant="h6" gutterBottom>Events</Typography>
            <Typography variant="body1">
              Check out upcoming events.
            </Typography>
          </div>
          <div>
            <Button variant="contained" color="primary">
              Create Event
                  </Button>
          </div>
        </div>
      </Grid>
    )
  }
}

export default withStyles(styles)(EventHeadline);