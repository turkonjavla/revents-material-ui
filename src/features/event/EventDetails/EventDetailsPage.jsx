import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withFirestore, firebaseConnect, isEmpty } from 'react-redux-firebase';
import { objectToArray, createDataTree } from '../../../app/common/util/helpers';
import { toastr } from 'react-redux-toastr';

/* MUI Components */
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';

/* Components */
import EventDetailsHeader from './EventDetailsHeader';
import EventDetailsInfo from './EventDetailsInfo';
import EventDetailsSidebar from './EventDetailsSidebar';
import EventDetailsChat from './EventDetailsChat';
import LoadingComponent from '../../../app/layout/LoadingComponent';

/* Actions */
import { goingToEvent, cancelGoingToEvent } from '../../user/userActions';
import { addEventComment } from '../eventActions';
import { openModal } from '../../modals/modalActions';

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
  state = {
    initialLoading: true
  }

  async componentDidMount() {
    const { firestore, match } = this.props;
    let event = await firestore.get(`events/${match.params.id}`);
    if(!event.exists) {
      toastr.error('Not Found', 'Can\'t find the event your looking for');
      this.props.history.push('/error');
    }
    await firestore.setListener(`events/${match.params.id}`);
    this.setState({
      initialLoading: false
    })
  }

  async componentWillUnmount() {
    const { firestore, match } = this.props;
    await firestore.unsetListener(`events/${match.params.id}`);
  }

  render() {
    const {
      classes,
      event,
      auth,
      goingToEvent,
      cancelGoingToEvent,
      requesting,
      addEventComment,
      eventChat,
      loading,
      openModal,
      match
    } = this.props;
    const attendees = event && event.attendees && objectToArray(event.attendees).sort(function(a, b) {
      return a.joinDate - b.joinDate
    });
    const isHost = event.hostUid === auth.uid;
    const isGoing = attendees && attendees.some(a => a.id === auth.uid);
    const chatTree = !isEmpty(eventChat) && createDataTree(eventChat);
    const loadingEvent = requesting[`events/${match.params.id}`]
    const authenticated = auth.isLoaded && !auth.isEmpty;

    if (loadingEvent || this.state.initialLoading) return <LoadingComponent />
    return (
      <Grid container justify="center" style={{ marginTop: '2em' }}>
        <Grid spacing={24} alignItems="center" justify="center" container className={classes.grid}>
          <Grid container spacing={24} justify="center">
            <Grid item xs={12} md={8}>
              <EventDetailsHeader
                isHost={isHost}
                isGoing={isGoing}
                event={event}
                goingToEvent={goingToEvent}
                cancelGoingToEvent={cancelGoingToEvent}
                loading={loading}
                authenticated={authenticated}
                openModal={openModal}
              />
              <EventDetailsInfo event={event} />
              {
                authenticated &&
                <EventDetailsChat
                  addEventComment={addEventComment}
                  eventId={event.id}
                  eventChat={chatTree}
                />
              }
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

const mapStateToProps = (state, ownProps) => {
  let event = {};

  if (state.firestore.ordered.events && state.firestore.ordered.events[0]) {
    event = state.firestore.ordered.events[0];
  }

  return {
    event,
    auth: state.firebase.auth,
    requesting: state.firestore.status.requesting,
    loading: state.async.loading,
    eventChat:
      !isEmpty(state.firebase.data.event_chat) &&
      objectToArray(state.firebase.data.event_chat[ownProps.match.params.id])
  }
}

const actions = {
  goingToEvent,
  cancelGoingToEvent,
  addEventComment,
  openModal
}

export default compose(
  withFirestore,
  connect(mapStateToProps, actions),
  firebaseConnect(props => props.auth.isLoaded && !props.auth.isEmpty && [`event_chat/${props.match.params.id}`]),
  withStyles(styles)
)(EventDetailsPage)