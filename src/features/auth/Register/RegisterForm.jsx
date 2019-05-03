import React from 'react';
import PropTypes from 'prop-types';

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
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import PersonIcon from '@material-ui/icons/Person';

/* Components */
import TextInput from '../../../app/common/form/TextInput';
import { closeModal } from '../../modals/modalActions'

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
        <PersonIcon />
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
    marginTop: theme.spacing.unit * 2
  }
});

const RegisterForm = ({ classes, closeModal }) => {
  return (
    <React.Fragment>
      <DialogTitle onClose={closeModal} />
      <DialogContent>
        <Field
          autoComplete="off"
          label="Know As"
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
      </DialogContent>
      <DialogActions>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Register
        </Button>
      </DialogActions>
    </React.Fragment>
  )
}

RegisterForm.propTypes = {
  classes: PropTypes.object.isRequired
}

const actions = {
  closeModal
}

export default compose(
  connect(null, actions),
  reduxForm({ form: 'registerForm' }),
  withStyles(styles)
)(RegisterForm)