/*global google*/
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withFirestore } from 'react-redux-firebase';
import { reduxForm, Field } from 'redux-form';
import { composeValidators, combineValidators, isRequired, hasLengthGreaterThan } from 'revalidate';

import { geocodeBySuggestion } from 'mui-places-autocomplete';
import Script from 'react-load-script';

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
import DateTimeInput from '../../../app/common/form/DateTimeInput';
import PlaceInput from '../../../app/common/form/PlaceInput';

/* Event Actions */
import { createEvent, updateEvent, cancelToggle } from '../eventActions';
import { CircularProgress } from '@material-ui/core';

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

  state = {
    cityLatLng: {},
    venueLatLng: {},
    scriptLoaded: false
  }

  async componentDidMount() {
    const { firestore, match } = this.props;
    await firestore.setListener(`events/${match.params.id}`);
  }

  async componentWillUnmount() {
    const { firestore, match } = this.props;
    await firestore.unsetListener(`events/${match.params.id}`);
  }

  onFormSubmit = async values => {
    values.venueLatLng = this.state.venueLatLng;

    if (this.props.initialValues.id) {
      if (Object.keys(values.venueLatLng).length === 0) {
        values.venueLatLng = this.props.event.venueLatLng;
      }

      await this.props.updateEvent(values);
      this.props.history.goBack();
    }
    else {
      await this.props.createEvent(values);
      this.props.history.push('/events');
    }
  }

  onSuggestionSelectedCity = (suggestion) => {
    this.props.change('city', suggestion.description);

    geocodeBySuggestion(suggestion)
      .then((results) => {
        const { geometry } = results[0]

        const cityLatLng = {
          lat: geometry.location.lat(),
          lng: geometry.location.lng(),
        }

        this.setState({ cityLatLng })
      })
  }

  onSuggestionSelectedVenue = (suggestion) => {
    this.props.change('venue', suggestion.description);

    geocodeBySuggestion(suggestion)
      .then((results) => {
        const { geometry } = results[0]

        const venueLatLng = {
          lat: geometry.location.lat(),
          lng: geometry.location.lng(),
        }

        this.setState({ venueLatLng })
      })
  }

  createAutocompleteRequestForCities = (inputValue) => {
    return {
      input: inputValue,
      types: ['(cities)']
    }
  }

  createAutocompleteRequestForEstablishments = (inputValue) => {
    return {
      input: inputValue,
      types: ['establishment'],
      location: new google.maps.LatLng(this.state.cityLatLng),
      radius: 1000
    }
  }

  handleScriptLoad = () => {
    this.setState({
      scriptLoaded: true
    })
  }

  render() {
    const { classes, invalid, submitting, pristine, event, cancelToggle, loading } = this.props;
    return (
      <Grid container justify="center" style={{ marginTop: '2em' }}>
        <Script
          url={`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&libraries=places`}
          onLoad={this.handleScriptLoad}
        />
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
                    label="Category"
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
                    label="Event City"
                    fullWidth
                    onSuggestionSelected={this.onSuggestionSelectedCity}
                    createAutocompleteRequest={this.createAutocompleteRequestForCities}
                    component={PlaceInput}
                  />
                  {
                    this.state.scriptLoaded &&
                    <Field
                      name="venue"
                      type="text"
                      label="Event Venue"
                      fullWidth
                      onSuggestionSelected={this.onSuggestionSelectedVenue}
                      createAutocompleteRequest={this.createAutocompleteRequestForEstablishments}
                      component={PlaceInput}
                    />
                  }
                  <Field
                    name="date"
                    label="Event Date"
                    component={DateTimeInput}
                    autoComplete="off"
                    readOnly={true}
                  />
                  <CardActions style={{ justifyContent: 'center' }}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      disabled={pristine || invalid || submitting || loading}
                    >
                      {
                        this.props.location.pathname.includes('/createEvent') ? 'Create Event' : 'Update Event'
                      }
                      {
                        loading &&
                        <CircularProgress size={20} style={{ marginLeft: '0.5em' }} color="primary" />
                      }
                    </Button>
                    <Button disabled={loading} onClick={() => this.props.history.push('/events')}>Cancel</Button>
                  </CardActions>
                  {
                    this.props.location.pathname.includes('/manage') &&
                    <CardActions style={{ justifyContent: 'center' }}>
                      <Button
                        disabled={loading}
                        onClick={() => cancelToggle(!event.cancelled, event.id)}
                        type="button"
                        variant="outlined"
                        color={event.cancelled ? 'primary' : 'secondary'}
                      >
                        {event.cancelled ? 'Reactivate Event' : 'Cancel Event'}
                      </Button>
                    </CardActions>
                  }
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
  let event = {};

  if (state.firestore.ordered.events && state.firestore.ordered.events[0]) {
    event = state.firestore.ordered.events[0]
  }

  return {
    initialValues: event,
    event,
    loading: state.async.loading
  }
}

const actions = {
  createEvent,
  updateEvent,
  cancelToggle
}

export default compose(
  withFirestore,
  connect(mapStateToProps, actions),
  reduxForm({ form: 'reduxForm', enableReinitialize: true, validate }),
  withStyles(styles)
)(EventForm);