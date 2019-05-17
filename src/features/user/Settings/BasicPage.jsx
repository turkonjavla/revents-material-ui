import React from 'react';
import { compose } from 'redux';
import { Field, reduxForm } from 'redux-form';
import {
  combineValidators,
  composeValidators,
  isRequired,
  hasLengthLessThan,
} from 'revalidate';

import moment from 'moment';

/* MUI Components */
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import FormLabel from '@material-ui/core/FormLabel';
import CardHeader from '@material-ui/core/CardHeader';

/* Components */
import SettingsNav from './SettingsNav';
import TextInput from '../../../app/common/form/TextInput';
import DateInput from '../../../app/common/form/DateInput';
import PlaceInput from '../../../app/common/form/PlaceInput';
import RadioInput from '../../../app/common/form/RadioInput';

/* Validation */
const validate = combineValidators({
  displayName: composeValidators(
    isRequired({ message: 'Please enter your full name' }),
    hasLengthLessThan(300)({ message: 'You name can\'t be more than 300 characters' })
  )()
});

const BasicPage = (props) => {
  const { pristine, submitting, error, updateProfile, handleSubmit } = props;

  function onSuggestionSelectedCity(suggestion) {
    props.change('city', suggestion.description);
  }

  function createAutocompleteRequestForCities(inputValue) {
    return {
      input: inputValue,
      types: ['(cities)']
    }
  }

  return (
    <Paper>
      <CardHeader
        action={
          <SettingsNav />
        }
        title="Basics"
      />
      <form onSubmit={handleSubmit(updateProfile)}>
        <CardContent>
          <Field
            label="Full Name"
            name="displayName"
            type="text"
            component={TextInput}
          />
          <FormLabel style={{ marginTop: '1em' }} component="legend">Gender</FormLabel>
          <Field
            label="Male"
            name="gender"
            type="radio"
            value="male"
            component={RadioInput}
          />
          <Field
            label="Female"
            name="gender"
            type="radio"
            value="female"
            component={RadioInput}
          />
          <Field
            label="Date of Birth"
            name="dateOfBirth"
            component={DateInput}
            maxDate={moment().subtract(18, 'years')}
          />
          <Field
            name="city"
            type="text"
            label="Home Town"
            fullWidth
            onSuggestionSelected={onSuggestionSelectedCity}
            createAutocompleteRequest={createAutocompleteRequestForCities}
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
            disabled={pristine || submitting}
          >
            Save Changes
        </Button>
        </CardActions>
      </form>
    </Paper>
  )
}

export default compose(
  reduxForm({
    form: 'userProfile',
    validate,
    enableReinitialize: true,
    destroyOnUnmount: false
  })
)(BasicPage)