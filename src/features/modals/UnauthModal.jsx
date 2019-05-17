import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

/* MUI Components */
import Dialog from '@material-ui/core/Dialog';
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';

/* MUI Icons */
import CloseIcon from '@material-ui/icons/Close';

/* Actions */
import { openModal, closeModal } from './modalActions';

const DialogTitle = withStyles(theme => ({
  root: {
    margin: 0,
    width: 'auto',
    padding: theme.spacing.unit * 2,
    marginTop: theme.spacing.unit * 2,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start'
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
      <Typography component="h1" variant="title" style={{ marginTop: '1em' }}>
        You have to be signeed in to do that!
      </Typography>
      <IconButton aria-label="Close" className={classes.closeButton} onClick={onClose}>
        <CloseIcon />
      </IconButton>
    </MuiDialogTitle>
  );
});

class LoginModal extends Component {

  handleCloseMoadal = () => {
    if (this.props.location.pathname.includes('/event')) {
      this.props.closeModal();
    }
    else {
      this.props.history.goBack();
      this.props.closeModal();
    }
  }

  render() {
    const { openModal, closeModal } = this.props;
    return (
      <Dialog
        open={true}
        onClose={this.handleCloseMoadal}
      >
        <DialogTitle onClose={closeModal} />
        <DialogContent style={{ alignItems: 'flex-start' }}>
          <Typography variant="subheading" gutterBottom>
            Please either sign in or registe to view this page
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            type="button"
            onClick={() => openModal('LoginModal')}
            fullWidth
            variant="contained"
            color="primary"
          >
            Sign in
          </Button>
          <Button
            type="button"
            onClick={() => openModal('RegisterModal')}
            fullWidth
            variant="outlined"
            color="secondary"
          >
            Register
          </Button>
        </DialogActions>
        <Divider variant="middle" style={{ marginTop: '1em', marginBottom: '1em' }} />
        <DialogContent style={{ alignItems: 'flex-start' }}>
          <Typography style={{ textAlign: 'center' }} variant="subheading" gutterBottom>
            Or click cancel to continue as a guest
          </Typography>
          <Button
            onClick={this.handleCloseMoadal}
            fullWidth
            variant="outlined"
          >
            Cancel
          </Button>
        </DialogContent>
      </Dialog>
    )
  }
}

const actions = {
  closeModal,
  openModal
}

export default compose(
  withRouter,
  connect(null, actions)
)(LoginModal);
