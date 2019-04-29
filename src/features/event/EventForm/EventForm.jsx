import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { reduxForm, Field } from 'redux-form';
import { composeValidators, combineValidators, isRequired, hasLengthGreaterThan } from 'revalidate';

import moment from 'moment';
import cuid from 'cuid';

/* Material UI Components */
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import CardActions from '@material-ui/core/CardActions';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';

/* Form Inputs */
import TextInput from '../../../app/common/form/TextInput';
import SelectInput from '../../../app/common/form/SelectInput';
import DateInput from '../../../app/common/form/DateInput';

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

const category = [
  { key: 'drinks', text: 'Drinks', value: 'drinks' },
  { key: 'culture', text: 'Culture', value: 'culture' },
  { key: 'film', text: 'Film', value: 'film' },
  { key: 'food', text: 'Food', value: 'food' },
  { key: 'music', text: 'Music', value: 'music' },
  { key: 'travel', text: 'Travel', value: 'travel' },
];

const validate = combineValidators({
  title: isRequired({ message: 'The event title is required' }),
  category: isRequired({ message: 'Please provide a category' }),
  description: composeValidators(
    isRequired({ message: 'Please enter a description' }),
    hasLengthGreaterThan(4)({ message: 'Description needs to be at least 5 characters' })
  )(),
  city: isRequired('City'),
  venue: isRequired('Venue'),
  date: isRequired('Date')
});

class EventForm extends Component {

  onFormSubmit = values => {
    values.date = moment(values.date).format();

    if (this.props.initialValues.id) {
      this.props.updateEvent(values);
      this.props.history.goBack();
    }
    else {
      const newEvent = {
        ...values,
        id: cuid(),
        hostPhotoURL: '/assets/user.png',
        hostedBy: 'Ross',
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

  render() {
    const { classes, invalid, submitting, pristine } = this.props;
    return (
      <Grid container justify="center" style={{ marginTop: '2em' }}>
        <Grid spacing={24} alignItems="center" justify="center" container className={classes.grid}>
          <Grid container spacing={24} justify="center">
            <Grid item xs={12} md={8}>
              <Paper className={classes.paper} style={{ position: 'relative' }}>
                <form onSubmit={this.props.handleSubmit(this.onFormSubmit)}>
                  <Typography
                    variant="subtitle2"
                    color="primary"
                  >
                    Event Details
                  </Typography>

                  <Field
                    name="title"
                    type="text"
                    component={TextInput}
                    label="Give your event a title"
                  />
                  <Field
                    name="category"
                    type="text"
                    component={SelectInput}
                  >
                    {
                      category.map(ctg => (
                        <MenuItem key={ctg.key} value={ctg.value}>{ctg.text}</MenuItem>
                      ))
                    }
                  </Field>
                  <Field
                    name="description"
                    type="text"
                    component={TextInput}
                    multiline={true}
                    rows={4}
                    label="Tell us about your event"
                  />

                  <Typography
                    variant="subtitle2"
                    color="primary"
                    style={{ marginTop: '2em' }}
                  >
                    Event Location Details
                  </Typography>

                  <Field
                    name="city"
                    type="text"
                    component={TextInput}
                    label="Event City"
                  />
                  <Field
                    name="venue"
                    type="text"
                    component={TextInput}
                    label="Event Venue"
                  />
                  <Field
                    name="date"
                    component={DateInput}
                    label="Event Date"
                  />
                  <CardActions style={{ justifyContent: 'center' }}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      disabled={pristine || invalid || submitting}
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
      </Grid >
    )
  }
}

EventForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state, ownProps) => {
  const eventId = ownProps.match.params.id;
  let event = {};

  if (eventId && state.events.length > 0) {
    event = state.events.filter(event => event.id === eventId)[0];
  }

  return {
    initialValues: event
  }
}

const actions = {
  createEvent,
  updateEvent,
  deleteEvent
}

export default compose(
  connect(mapStateToProps, actions),
  reduxForm({ form: 'reduxForm', enableReinitialize: true, validate }),
  withStyles(styles)
)(EventForm);