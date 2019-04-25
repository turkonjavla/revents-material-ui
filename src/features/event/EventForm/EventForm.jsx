import React, { Component } from 'react';
import PropTypes from 'prop-types';

/* Material UI Components */
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Paper from '@material-ui/core/Paper';
import withStyles from '@material-ui/core/styles/withStyles';
import { CardActions } from '@material-ui/core';

const styles = theme => ({
  paper: {
    padding: theme.spacing.unit * 3,
    textAlign: 'left',
    color: theme.palette.text.secondary
  }
});

const emptyEvent = {
  title: '',
  date: '',
  city: '',
  venue: '',
  hostedBy: ''
}

class EventForm extends Component {
  state = {
    event: emptyEvent
  }

  componentDidMount() {
    if (this.props.selectedEvent !== null) {
      this.setState({
        event: this.props.selectedEvent
      })
    }
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.selectedEvent !== this.props.selectedEvent) {
      this.setState({
        event: nextProps.selectedEvent || emptyEvent
      })
    }
  }

  onFormSubmit = (e) => {
    e.preventDefault();
    if(this.state.event.id) {
      this.props.updateEvent(this.state.event);
    }
    else {
      this.props.createEvent(this.state.event);
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
    const { classes, handleCancelForm } = this.props;
    const { title, date, city, venue, hostedBy } = this.state.event;
    return (
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
              Create Event
          </Button>
            <Button onClick={handleCancelForm}>Cancel</Button>
          </CardActions>

        </form>
      </Paper>
    )
  }
}

EventForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EventForm);