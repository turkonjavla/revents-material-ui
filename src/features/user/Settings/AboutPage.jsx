import React from 'react';
import { compose } from 'redux';
import { Field, reduxForm } from 'redux-form';

/* MUI Components */
import Card from '@material-ui/core/Card';
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

const AboutPage = (props) => {
  const { error, submitting, pristine, handleSubmit, updateProfile } = props;

  function onSuggestionSelectedCity(suggestion) {
    props.change('origin', suggestion.description);
  }

  function createAutocompleteRequestForCities(inputValue) {
    return {
      input: inputValue,
      types: ['(regions)']
    }
  }

  return (
    <Card>
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
            disabled={submitting || pristine}
          >
            Save Changes
            </Button>
        </CardActions>
      </form>
    </Card>
  )
}

export default compose(
  reduxForm({
    form: 'userProfile',
    enableReinitialize: true,
    destroyOnUnmount: false
  })
)(AboutPage)