import React, { Component } from 'react';
import { compose } from 'redux';
import { Field, reduxForm } from 'redux-form';
import { geocodeBySuggestion } from 'mui-places-autocomplete';

/* MUI Components */
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider'
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CardHeader from '@material-ui/core/CardHeader';
import ListItemText from '@material-ui/core/ListItemText';

/* Components */
import SettingsNav from './SettingsNav';
import TextInput from '../../../app/common/form/TextInput';
import RadioInput from '../../../app/common/form/RadioInput';
import SelectInput from '../../../app/common/form/SelectInput';
import PlaceInput from '../../../app/common/form/PlaceInput';

const interests = [
  { key: 'drinks', text: 'Drinks', value: 'drinks' },
  { key: 'culture', text: 'Culture', value: 'culture' },
  { key: 'film', text: 'Film', value: 'film' },
  { key: 'food', text: 'Food', value: 'food' },
  { key: 'music', text: 'Music', value: 'music' },
  { key: 'travel', text: 'Travel', value: 'travel' },
];

class AboutPage extends Component {

  onSuggestionSelectedCity = (suggestion) => {
    this.props.change('origin', suggestion.description);

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
  createAutocompleteRequestForCities = (inputValue) => {
    return {
      input: inputValue,
      types: ['(regions)']
    }
  }

  render() {
    const { error, submitting, pristine, handleSubmit, updateProfile } = this.props;
    return (
      <Paper>
        <CardHeader
          action={
            <SettingsNav />
          }
          title="About Me"
          subheader="Complete your profile to get the most out of this site"
        />
        <form onSubmit={handleSubmit(updateProfile)}>
          <CardContent>
            <Typography variant="subtitle1">Tell us your status</Typography>
            <Field
              label="Single"
              name="status"
              type="radio"
              value="single"
              component={RadioInput}
            />
            <Field
              label="Relationship"
              name="status"
              type="radio"
              value="relationship"
              component={RadioInput}
            />
            <Field
              label="Married"
              name="status"
              type="radio"
              value="married"
              component={RadioInput}
            />
            <Divider />
            <Typography style={{ marginTop: '1em' }} variant="subtitle1">Tell us about yourself</Typography>
            <Field
              label="About Me"
              name="about"
              type="text"
              component={TextInput}
              multiline={true}
              rows={8}
            />
            <Field
              label="Select yout interests"
              name="interests"
              fullWidth
              multiple
              component={SelectInput}
              onChange={this.handleChange}
              format={value => Array.isArray(value) ? value : []}
              renderValue={selected => selected.join(', ')}
            >
              {interests.map(interest => (
                <MenuItem key={interest.key} value={interest.value}>
                  <ListItemText primary={interest.text} />
                </MenuItem>
              ))}
            </Field>
            <Field
              label="Occupation"
              name="occupation"
              type="text"
              component={TextInput}
            />
            <Field
              label="Country of Origin"
              name="origin"
              type="text"
              fullWidth
              onSuggestionSelected={this.onSuggestionSelectedCity}
              createAutocompleteRequest={this.createAutocompleteRequestForCities}
              component={PlaceInput}
            />
          </CardContent>
          {
            error &&
            (<CardContent>
              <Typography style={{ color: '#f44336' }} variant="subtitle1">{error}</Typography>
            </CardContent>)
          }
          <CardActions>
            <Button
              type="submit"
              variant="outlined"
              size="medium"
              disabled={submitting || pristine}
            >
              Save Changes
            </Button>
          </CardActions>
        </form>
      </Paper>
    )
  }
}

export default compose(
  reduxForm({
    form: 'userProfile',
    enableReinitialize: true,
    destroyOnUnmount: false
  })
)(AboutPage)