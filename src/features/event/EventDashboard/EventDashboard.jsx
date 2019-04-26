import React, { Component, Fragment } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import cuid from 'cuid';

/* Material UI Components */
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

/* Components */
import EventList from '../EventList/EventList';
import EventForm from '../EventForm/EventForm';

/* Event Actions */
import { createEvent, updateEvent, deleteEvent } from '../eventtActions';

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

class EventDashboard extends Component {
  state = {
    isOpen: false,
    selectedEvent: null
  }

  handleFormOpen = () => {
    this.setState({
      isOpen: true,
      selectedEvent: null
    })
  }

  handleCancelForm = () => {
    this.setState({
      isOpen: false
    })
  }

  handleCreateEvent = newEvent => {
    newEvent.id = cuid();
    newEvent.hostPhotoURL = '/assets/user.png';
    newEvent.attendees = [{
      id: 'b',
      name: 'Tom',
      photoURL: 'https://randomuser.me/api/portraits/men/22.jpg'
    }]
    
    this.props.createEvent(newEvent);

    this.setState({
      isOpen: false
    })
  }

  handleOpenEvent = eventToOpen => () => {
    this.setState({
      selectedEvent: eventToOpen,
      isOpen: true
    })
  }

  handleUpdateEvent = updatedEvent => {
    this.props.updateEvent(updatedEvent);
    this.setState({
      isOpen: false,
      selectedEvent: null
    })
  }

  handleDeleteEvent = eventId => () => {
    this.props.deleteEvent(eventId)
  }

  render() {
    const { classes, events } = this.props;
    const { isOpen, selectedEvent } = this.state;
    return (
      <Fragment>
        <div className={classes.root}>
          <Grid container justify="center">
            <Grid spacing={24} alignItems="center" justify="center" container className={classes.grid}>
              <Grid item xs={12}>
                <div className={classes.topBar}>
                  <div className={classes.block}>
                    <Typography variant="h6" gutterBottom>Events</Typography>
                    <Typography variant="body1">
                      Check out upcoming events.
                    </Typography>
                  </div>
                  <div>
                    <Button onClick={this.handleFormOpen} variant="contained" color="primary">
                      Create Event
                    </Button>
                  </div>
                </div>
              </Grid>
              <Grid container spacing={24} justify="center">
                <Grid item xs={12} md={8}>
                  <EventList
                    deleteEvent={this.handleDeleteEvent}
                    onEventOpen={this.handleOpenEvent}
                    events={events}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  {
                    isOpen &&
                    <EventForm
                      updateEvent={this.handleUpdateEvent}
                      selectedEvent={selectedEvent}
                      createEvent={this.handleCreateEvent}
                      handleCancelForm={this.handleCancelForm}
                    />
                  }
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </div>
      </Fragment>
    )
  }
}

const mapStateToProps = state => ({
  events: state.events
});

const actions = {
  createEvent,
  updateEvent,
  deleteEvent
}

export default compose(
  connect(mapStateToProps, actions),
  withStyles(styles)
)(EventDashboard);