import React from 'react';
import PropTypes from 'prop-types';
import {
  combineValidators,
  composeValidators,
  isRequired,
  createValidator,
  hasLengthBetween,
  matchesField,
  hasLengthLessThan
} from 'revalidate';

/* Redux */
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

/* MUI Components */
import withStyles from '@material-ui/core/styles/withStyles';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';

/* MUI Icons */
import CloseIcon from '@material-ui/icons/Close';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

/* Components */
import TextInput from '../../../app/common/form/TextInput';
import SocialLogin from '../SocialLogin/SocialLogin';

/* Actions */
import { registerUser } from '../authActions';
import { closeModal } from '../../modals/modalActions'

const isValidEmail = createValidator(
  message => value => {
    if (value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
      return message
    }
  },
  'Invalid email address'
)

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

/* Validation */
const validate = combineValidators({
  displayName: composeValidators(
    isRequired({ message: 'Please enter your full name' }),
    hasLengthLessThan(300)({ message: 'You name can\'t be more than 300 characters' })
  )(),
  email: composeValidators(
    isRequired('Email'),
    isValidEmail
  )(),
  password: composeValidators(
    isRequired('Password'),
    hasLengthBetween(6, 30)({ message: 'Password must be between 6 and 30 characters' }),
    noWhitespace,
    specialCharacters
  )(),
  confirmPassword: composeValidators(
    isRequired({ message: 'Please confirm your password' }),
    matchesField('password')({ message: 'Passwords don\'t match' })
  )()
})

const DialogTitle = withStyles(theme => ({
  root: {
    margin: 0,
    padding: theme.spacing.unit * 2,
    marginTop: theme.spacing.unit * 2,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing.unit,
    top: theme.spacing.unit,
    color: theme.palette.grey[500],
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  }
}))(props => {
  const { classes, onClose } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root}>
      <Avatar className={classes.avatar}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Register
      </Typography>
      <IconButton aria-label="Close" className={classes.closeButton} onClick={onClose}>
        <CloseIcon />
      </IconButton>
    </MuiDialogTitle>
  );
});

const styles = theme => ({
  submit: {
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 1
  }
});

const RegisterForm = ({ classes, closeModal, handleSubmit, registerUser, error, invalid, submitting }) => {
  return (
    <div style={{ maxWidth: '400px' }}>
      <DialogTitle onClose={closeModal} />
      <form onSubmit={handleSubmit(registerUser)}>
        <DialogContent>
          <Field
            autoComplete="off"
            label="Full Name"
            name="displayName"
            type="text"
            component={TextInput}
          />
          <Field
            autoComplete="off"
            label="Email"
            name="email"
            type="email"
            component={TextInput}
          />
          <Field
            label="Password"
            name="password"
            type="password"
            component={TextInput}
          />
          <Field
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            component={TextInput}
          />
        </DialogContent>
        {
          error &&
          <DialogContent>
            <DialogContentText style={{ color: '#f44336' }}>
              {error}
            </DialogContentText>
          </DialogContent>
        }
        <DialogActions>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            disabled={invalid || submitting}
            className={classes.submit}
          >
            Register
        </Button>
        </DialogActions>
        <SocialLogin />
      </form>
    </div>
  )
}

RegisterForm.propTypes = {
  classes: PropTypes.object.isRequired
}

const actions = {
  closeModal,
  registerUser
}

export default compose(
  connect(null, actions),
  reduxForm({ form: 'registerForm', validate }),
  withStyles(styles)
)(RegisterForm)
