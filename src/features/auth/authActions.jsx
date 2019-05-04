import { SubmissionError } from 'redux-form';
import { closeModal } from '../modals/modalActions';
import { toastr } from 'react-redux-toastr';

export const login = creds => {
  return async (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();

    try {
      await firebase
        .auth()
        .signInWithEmailAndPassword(creds.email, creds.password);
      dispatch(closeModal());

      const user = await firebase.auth().currentUser;
      toastr.success('Success!', `Welcome back, ${user.displayName}`);
    }
    catch (error) {
      console.log(error)
      throw new SubmissionError({
        _error: 'Invalid email or password'
      });
    }
  }
}

export const registerUser = user => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();

    try {
      // create the user in firebase auth
      let createdUser = await firebase
        .auth()
        .createUserWithEmailAndPassword(user.email, user.password);

      // update auth profile
      await createdUser
        .updateProfile({
          displayName: user.displayName
        });

      // create new profile in firestore
      let newUser = {
        displayName: user.displayName,
        createdAt: firestore.FieldValue.serverTimestamp()
      }

      await firestore.set(`users/${createdUser.uid}`, { ...newUser });

      dispatch(closeModal());
      toastr.success('Account Created!', `Welcome to Revents, ${createdUser.displayName}!`);
    }
    catch (error) {
      console.log(error);
      throw new SubmissionError({
        _error: error.message
      });
    }
  }
}