import { SubmissionError, reset } from 'redux-form';
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

export const socialLogin = selectedProvider => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();

    try {
      dispatch(closeModal());
      let user = await firebase.login({
        provider: selectedProvider,
        type: 'popup'
      })
      if (user.additionalUserInfo.isNewUser) {
        await firestore.set(`users/${user.user.uid}`, {
          displayName: user.profile.displayName,
          photoURL: user.profile.avatarUrl,
          createdAt: firestore.FieldValue.serverTimestamp()
        })
      }

      const providerName = selectedProvider.charAt(0).toUpperCase() + selectedProvider.slice(1)
      toastr.success(`${providerName} Login`, `Welcome ${user.profile.displayName}`)
    }
    catch (error) {
      console.log(error)
    }
  }
}

export const updatePassword = creds => {
  return async (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    const user = firebase.auth().currentUser;

    try {
      await user.updatePassword(creds.newPassword);
      await dispatch(reset('account'));
      toastr.success('Success!', 'You have updated your password')
    } 
    catch (error) {
      console.log(error);
      throw new SubmissionError({
        _error: error.message
      })
    }
  }
}