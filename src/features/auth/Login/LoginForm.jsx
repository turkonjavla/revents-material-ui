import React from 'react';

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
import LockIcon from '@material-ui/icons/Lock';

/* Font Awesome */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

/* Components */
import TextInput from '../../../app/common/form/TextInput';
import SocialLogin from '../SocialLogin/SocialLogin';

/* Actions */
import { login, socialLogin } from '../authActions';
import { closeModal } from '../../modals/modalActions'

import {
  combineValidators,
  isRequired,
} from 'revalidate';

/* Validation */
const validate = combineValidators({
  email: isRequired('Email'),
  password: isRequired('Password')
})

const DialogTitle = withStyles(theme => ({
  root: {
    margin: 0,
    width: 'auto',
    padding: theme.spacing.unit * 2,
    marginTop: theme.spacing.unit * 2,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
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
        <FontAwesomeIcon icon="lock"/>
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign In
      </Typography>
      <IconButton aria-label="Close" className={classes.closeButton} onClick={onClose}>
        <CloseIcon />
      </IconButton>
    </MuiDialogTitle>
  );
});

const LoginForm = ({ classes, closeModal, login, handleSubmit, error, invalid, submitting, socialLogin }) => {
  return (
    <React.Fragment>
      <DialogTitle onClose={closeModal} />
      <form onSubmit={handleSubmit(login)}>
        <DialogContent>
          <Field
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
          >
            <FontAwesomeIcon icon="sign-in-alt" style={{ marginRight: '0.5em' }} /> Sign in
          </Button>
        </DialogActions>
        <SocialLogin socialLogin={socialLogin} />
      </form>
    </React.Fragment>
  )
}

const actions = {
  closeModal,
  login,
  socialLogin
}

export default compose(
  connect(null, actions),
  reduxForm({ form: 'loginForm', validate })
)(LoginForm)
