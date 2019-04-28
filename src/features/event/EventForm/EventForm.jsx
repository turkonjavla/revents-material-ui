import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import cuid from 'cuid';

/* Material UI Components */
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Paper from '@material-ui/core/Paper';
import CardActions from '@material-ui/core/CardActions';
import Grid from '@material-ui/core/Grid';

/* Event Actions */
import { createEvent, updateEvent, deleteEvent } from '../eventtActions';

const styles = theme => ({
  paper: {
    padding: theme.spacing.unit * 3,
    textAlign: 'left',
    color: theme.palette.text.secondary
  },
  grid: {
    width: 1200,
    margin: `0 ${theme.spacing.unit * 2}px`,
    [theme.breakpoints.down('sm')]: {
      width: 'calc(100% - 20px)'
    }
  }
});

class EventForm extends Component {
  state = {
    event: Object.assign({}, this.props.event)
  }

  onFormSubmit = (e) => {
    e.preventDefault();
    if (this.state.event.id) {
      this.props.updateEvent(this.state.event);
      this.props.history.goBack();
    }
    else {
      const newEvent = {
        ...this.state.event,
        id: cuid(),
        hostPhotoURL: '/assets/user.png',
        attendees: [
          {
            id: cuid(),
            name: 'Bob',
            photoURL: '/assets/user.png'
          }
        ]
      }
      this.props.createEvent(newEvent);
      this.props.history.push('/events');
    }
  }

  onInputChange = (e) => {
    const { name, value } = e.target;
    const newEvent = this.state.event;
    newEvent[name] = value;

    this.setState({
      event: newEvent
    })
  }

  render() {
    const { classes } = this.props;
    const { title, date, city, venue, hostedBy } = this.state.event;
    return (
      <Grid container justify="center" style={{ marginTop: '2em' }}>
        <Grid spacing={24} alignItems="center" justify="center" container className={classes.grid}>
          <Grid container spacing={24} justify="center">
            <Grid item xs={12} md={8}>
              <Paper className={classes.paper} style={{ position: 'relative' }}>
                <form onSubmit={this.onFormSubmit}>
                  <FormControl margin="normal" required fullWidth>
                    <InputLabel htmlFor="title">Event Title</InputLabel>
                    <Input name="title" onChange={this.onInputChange} value={title} autoComplete="title" autoFocus />
                  </FormControl>
                  <FormControl margin="normal" fullWidth>
                    <Input name="date" value={date} onChange={this.onInputChange} type="date" />
                  </FormControl>
                  <FormControl margin="normal" required fullWidth>
                    <InputLabel htmlFor="city">City</InputLabel>
                    <Input name="city" value={city} onChange={this.onInputChange} type="text" />
                  </FormControl>
                  <FormControl margin="normal" required fullWidth>
                    <InputLabel htmlFor="venue">Venue</InputLabel>
                    <Input name="venue" value={venue} onChange={this.onInputChange} type="text" />
                  </FormControl>
                  <FormControl margin="normal" required fullWidth>
                    <InputLabel htmlFor="hostedBy">Hosted By</InputLabel>
                    <Input name="hostedBy" value={hostedBy} onChange={this.onInputChange} type="test" />
                  </FormControl>
                  <CardActions style={{ justifyContent: 'center' }}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                    >
                      Submit
                    </Button>
                    <Button onClick={() => this.props.history.push('/events')}>Cancel</Button>
                  </CardActions>
                </form>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    )
  }
}

EventForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state, ownProps) => {
  const eventId = ownProps.match.params.id;

  let event = {
    title: '',
    date: '',
    city: '',
    venue: '',
    hostedBy: ''
  };

  if (eventId && state.events.length > 0) {
    event = state.events.filter(event => event.id === eventId)[0];
  }

  return {
    event
  }
}

const actions = {
  createEvent,
  updateEvent,
  deleteEvent
}

export default compose(
  connect(mapStateToProps, actions),
  withStyles(styles)
)(EventForm);