import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux';
import { closeModal } from './modalActions';

/* MUI Components */
import Dialog from '@material-ui/core/Dialog';

/* Components */
import LoginForm from '../auth/Login/LoginForm';

class LoginModal extends Component {

  render() {
    const { closeModal } = this.props;
    return (
      <Dialog
        aria-labelledby="customized-dialog-title"
        open={true}
        onClose={closeModal}
      >
        <LoginForm />
      </Dialog>
    )
  }
}

const actions = {
  closeModal
}

export default compose(
  connect(null, actions)
)(LoginModal);
