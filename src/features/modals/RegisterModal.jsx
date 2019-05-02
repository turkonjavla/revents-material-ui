import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux';
import { closeModal } from './modalActions';

/* MUI Components */
import Dialog from '@material-ui/core/Dialog';

/* Components */
import RegisterForm from '../auth/Register/RegisterForm';

class RegisterModal extends Component {

  render() {
    const { closeModal } = this.props;
    return (
      <Dialog
        aria-labelledby="customized-dialog-title"
        open={true}
        onClose={closeModal}
      >
        <RegisterForm />
      </Dialog>
    )
  }
}

const actions = {
  closeModal
}

export default compose(
  connect(null, actions)
)(RegisterModal);
