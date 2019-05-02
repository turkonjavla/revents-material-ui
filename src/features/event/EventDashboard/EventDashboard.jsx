import React, { Component, Fragment } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';

/* Material UI Components */
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

/* Components */
import EventList from '../EventList/EventList';
import LoadingComponent from '../../../app/layout/LoadingComponent';

/* Event Actions */
import { deleteEvent } from '../eventActions';

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
    isOpen: false
  }

  handleFormOpen = () => {
    this.setState({
      isOpen: true,
      selectedEvent: null
    })
  }

  handleDeleteEvent = eventId => () => {
    this.props.deleteEvent(eventId)
  }

  render() {
    const { classes, events, loading } = this.props;

    if (loading) return <LoadingComponent />
    
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
                </div>
              </Grid>
              <Grid container spacing={24} justify="center">
                <Grid item xs={12} md={8}>
                  <EventList
                    deleteEvent={this.handleDeleteEvent}
                    events={events}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <h2>Sidebar</h2>
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
  events: state.events,
  loading: state.async.loading
});

const actions = {
  deleteEvent
}

export default compose(
  connect(mapStateToProps, actions),
  withStyles(styles)
)(EventDashboard);