import React, { Component, Fragment } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';

/* Material UI Components */
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';

/* Components */
import EventList from '../EventList/EventList';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import EventActivity from '../EventActivity/EventActivity';

/* Actions */
import { getEventsForDashboard } from '../eventActions';

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
    moreEvents: false,
    loadingInital: true,
    loadedEvents: []
  }

  async componentDidMount() {
    let next = await this.props.getEventsForDashboard();

    if (next && next.docs && next.docs.length > 1) {
      this.setState({
        moreEvents: true,
        loadingInital: false
      })
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.events !== nextProps.events) {
      this.setState({
        loadedEvents: [...this.state.loadedEvents, ...nextProps.events]
      });
    }
  }

  getNextEvents = async () => {
    const { events } = this.props;
    let lastEvent = events && events[events.length - 1];
    let next = await this.props.getEventsForDashboard(lastEvent);

    if (next && next.docs && next.docs.length <= 1) {
      this.setState({
        moreEvents: false
      })
    }
  }

  render() {
    const { classes, loading } = this.props;
    const { moreEvents, loadedEvents } = this.state;

    if (this.state.loadingInital) return <LoadingComponent />

    return (
      <Fragment>
        <Grid container justify="center">
          <Grid spacing={24} alignItems="center" justify="center" container className={classes.grid}>
            <Grid container spacing={24} justify="center" style={{ marginTop: '2em' }}>
              <Grid item xs={12} md={8}>
                <EventList
                  events={loadedEvents}
                  moreEvents={moreEvents}
                  getNextEvents={this.getNextEvents}
                  loading={loading}
                />
                <Grid container justify="center">
                  <Grid>
                    {loading &&
                      <CircularProgress
                        style={{
                          position: 'relative',
                          top: '50%',
                          left: '50%',
                          marginTop: '-12px',
                          marginLeft: '-12px',
                          marginBottom: '20px'
                        }}
                      />
                    }
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} md={4}>
                <EventActivity />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Fragment>
    )
  }
}

const mapStateToProps = state => ({
  events: state.events,
  loading: state.async.loading
});

const actions = {
  getEventsForDashboard
}

export default compose(
  connect(mapStateToProps, actions),
  firestoreConnect([{ collection: 'events' }]),
  withStyles(styles)
)(EventDashboard);