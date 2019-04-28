import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';

/* MUI Components */
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';

/* Components */
import EventDetailsHeader from './EventDetailsHeader';
import EventDetailsInfo from './EventDetailsInfo';
import EventDetailsSidebar from './EventDetailsSidebar';
import EventDetailsChat from './EventDetailsChat';

const styles = theme => ({
  grid: {
    width: 1200,
    margin: `0 ${theme.spacing.unit * 2}px`,
    [theme.breakpoints.down('sm')]: {
      width: 'calc(100% - 20px)'
    }
  },
  topBar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  block: {
    padding: theme.spacing.unit * 2,
  }
});

const EventDetailsPage = ({ classes, event }) => {
  return (
    <Grid container justify="center" style={{ marginTop: '2em' }}>
      <Grid spacing={24} alignItems="center" justify="center" container className={classes.grid}>
        <Grid container spacing={24} justify="center">
          <Grid item xs={12} md={8}>
            <EventDetailsHeader event={event} />
            <EventDetailsInfo event={event} />
            <EventDetailsChat />
          </Grid>
          <Grid item xs={12} md={4}>
            <EventDetailsSidebar attendees={event.attendees} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

const mapStateToProps = (state, ownProps) => {
  const eventId = ownProps.match.params.id;
  let event = {};

  if (eventId && state.events.length > 0) {
    event = state.events.filter(event => event.id === eventId)[0];
  }

  return {
    event
  }
}

export default compose(
  connect(mapStateToProps),
  withStyles(styles)
)(EventDetailsPage);