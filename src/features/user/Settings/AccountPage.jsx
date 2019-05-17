import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { combineValidators, composeValidators, createValidator, isRequired, hasLengthBetween, matchesField } from 'revalidate';

/* MUI Components */
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CardHeader from '@material-ui/core/CardHeader';

/* Font Awesome */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

/* Components */
import SettingsNav from './SettingsNav';
import TextInput from '../../../app/common/form/TextInput';

/* Validation */
const noWhitespace = createValidator(
  message => value => {
    if (value && !/^[\x21-\x7E]+$/i.test(value)) {
      return message
    }
  },
  'No whitespaces allowed'
)

const specialCharacters = createValidator(
  message => value => {
    if (value && !/^[a-zA-Z0-9#$&.+,"]*$/i.test(value)) {
      return message
    }
  },
  'Only | # | $ | & | . | + | , | allowed'
)

const validate = combineValidators({
  newPassword: composeValidators(
    isRequired('New Password'),
    hasLengthBetween(6, 30)({ message: 'Password must be between 6 and 30 characters' }),
    noWhitespace,
    specialCharacters
  )(),
  confirmNewPassword: composeValidators(
    isRequired({ message: 'Please confirm your new password' }),
    matchesField('newPassword')({ message: 'Passwords don\'t match' })
  )()
})

const AccountPage = ({ error, submitting, invalid, handleSubmit, updatePassword, providerId }) => {
  return (
    <Card>
      <CardHeader
        action={
          <SettingsNav />
        }
        title="Account"
        subheader="Use this to update your account settings"
      />
      {
        providerId &&
        providerId === 'password' &&
        <form onSubmit={handleSubmit(updatePassword)}>
          <CardContent>
            <Typography color="primary" variant="h6">Change Password</Typography>
            <Typography variant="body1">Use this form to update your password</Typography>
            <Field
              label="New Password"
              name="newPassword"
              type="password"
              component={TextInput}
            />
            <Field
              label="Confirm New Password"
              name="confirmNewPassword"
              type="password"
              component={TextInput}
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
              disabled={submitting || invalid}
            >
              Update Password
            </Button>
          </CardActions>
        </form>
      }
      {
        providerId &&
        providerId === 'facebook.com' &&
        <React.Fragment>
          <CardContent>
            <Typography variant="h6" color="primary">FACEBOOK ACCOUNT</Typography>
            <Typography variant="subtitle1">Please visit Facebook to update your account settings</Typography>
          </CardContent>
          <CardActions>
            <Button color="primary" variant="outlined" size="medium">
              <FontAwesomeIcon style={{ marginRight: '0.5em' }} icon={['fab', 'facebook']} />
              Go To Facebook
            </Button>
          </CardActions>
        </React.Fragment>
      }
      {
        providerId &&
        providerId === 'google.com' &&
        <React.Fragment>
          <CardContent>
            <Typography variant="h6" color="primary">GOOGLE ACCOUNT</Typography>
            <Typography variant="subtitle1">Please visit Google to update your account settings</Typography>
          </CardContent>
          <CardActions>
            <Button color="secondary" variant="outlined" size="medium">
              <FontAwesomeIcon style={{ marginRight: '0.5em' }} icon={['fab', 'google']} />
              Go To Google
            </Button>
          </CardActions>
        </React.Fragment>
      }
    </Card>
  )
}

export default reduxForm({ form: 'account', validate })(AccountPage)