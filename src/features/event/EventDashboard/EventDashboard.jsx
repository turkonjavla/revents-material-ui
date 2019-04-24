import React, { Component, Fragment } from 'react';

/* Material UI Components */
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

/* Components */
import EventList from '../EventList/EventList';
import EventForm from '../EventForm/EventForm';

const events = [
  {
    id: '1',
    title: 'Trip to Tower of London',
    date: '2018-03-27T11:00:00+00:00',
    category: 'culture',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sollicitudin ligula eu leo tincidunt, quis scelerisque magna dapibus. Sed eget ipsum vel arcu vehicula ullamcorper.',
    city: 'London, UK',
    venue: "Tower of London, St Katharine's & Wapping, London",
    hostedBy: 'Bob',
    hostPhotoURL: 'https://randomuser.me/api/portraits/men/20.jpg',
    attendees: [
      {
        id: 'a',
        name: 'Bob',
        photoURL: 'https://randomuser.me/api/portraits/men/20.jpg'
      },
      {
        id: 'b',
        name: 'Tom',
        photoURL: 'https://randomuser.me/api/portraits/men/22.jpg'
      }
    ]
  },
  {
    id: '2',
    title: 'Trip to Punch and Judy Pub',
    date: '2018-03-28T14:00:00+00:00',
    category: 'drinks',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sollicitudin ligula eu leo tincidunt, quis scelerisque magna dapibus. Sed eget ipsum vel arcu vehicula ullamcorper.',
    city: 'London, UK',
    venue: 'Punch & Judy, Henrietta Street, London, UK',
    hostedBy: 'Tom',
    hostPhotoURL: 'https://randomuser.me/api/portraits/men/22.jpg',
    attendees: [
      {
        id: 'b',
        name: 'Tom',
        photoURL: 'https://randomuser.me/api/portraits/men/22.jpg'
      },
      {
        id: 'a',
        name: 'Bob',
        photoURL: 'https://randomuser.me/api/portraits/men/20.jpg'
      }
    ]
  }
];
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
})

class EventDashboard extends Component {
  state = {
    events: events,
    isOpen: false
  }

  handleFormOpen = () => {
    this.setState({
      isOpen: true
    })
  }

  handleCancelForm = () => {
    this.setState({
      isOpen: false
    })
  }

  render() {
    const { classes } = this.props;
    const { events, isOpen } = this.state;
    return (
      <Fragment>
        <CssBaseline />
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
                  <EventList events={events} />
                </Grid>
                <Grid item xs={12} md={4}>
                  {
                    isOpen &&
                    <EventForm handleCancelForm={this.handleCancelForm} />
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

export default withStyles(styles)(EventDashboard);