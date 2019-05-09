import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withFirestore } from 'react-redux-firebase';
import { toastr } from 'react-redux-toastr';
import { objectToArray } from '../../../app/common/util/helpers';

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

class EventDetailsPage extends Component {

  async componentDidMount() {
    const { firestore, match, history: { push } } = this.props;
    let event = await firestore.get(`events/${match.params.id}`);

    if (!event.exists) {
      push('/events');
      toastr.error('Sorry', 'Event not found')
    }
  }

  render() {
    const { classes, event } = this.props;
    const attendees = event && event.attendees && objectToArray(event.attendees);
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
              <EventDetailsSidebar attendees={attendees} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    )
  }
}

const mapStateToProps = (state) => {
  let event = {};

  if (state.firestore.ordered.events && state.firestore.ordered.events[0]) {
    event = state.firestore.ordered.events[0];
  }

  return {
    event
  }
}

export default compose(
  withFirestore,
  connect(mapStateToProps),
  withStyles(styles)
)(EventDetailsPage)

