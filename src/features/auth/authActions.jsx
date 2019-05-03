import { LOGIN_USER, SIGN_OUT_USER } from './authConstants';
import { closeModal } from '../modals/modalActions';
import { toastr } from 'react-redux-toastr';

export const login = creds => {
  return async dispatch => {
    try {
      dispatch({
        type: LOGIN_USER,
        payload: {
          creds
        }
      });
      dispatch(closeModal());
      toastr.success('Success!', `Welcome back, ${creds.email}`);
    }
    catch
    (error) {
      toastr.error('Error!', 'Oops, something went wrong');
    }
  }
}

export const logout = () => {
  return {
    type: SIGN_OUT_USER
  }
}