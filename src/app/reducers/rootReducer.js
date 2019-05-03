import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { reducer as toastrReducer } from 'react-redux-toastr';
import { firebaseReducer } from 'react-redux-firebase';
import { firestoreReducer } from 'redux-firestore';

/* Custom Reducers */
import testReducer from '../../features/testarea/testReducer';
import eventReducer from '../../features/event/eventReducer';
import modalReducer from '../../features/modals/modalReducer';
import authReducer from '../../features/auth/authReducer';
import asyncReducer from '../../features/async/asyncReducer';

const rootReducer = combineReducers({
  async: asyncReducer,
  auth: authReducer,
  events: eventReducer,
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  form: formReducer,
  modals: modalReducer,
  test: testReducer,
  toastr: toastrReducer
})

export default rootReducer;