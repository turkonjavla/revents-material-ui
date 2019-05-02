import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

/* Custom Reducers */
import testReducer from '../../features/testarea/testReducer';
import eventReducer from '../../features/event/eventReducer';
import modalReducer from '../../features/modals/modalReducer';

const rootReducer = combineReducers({
  test: testReducer,
  events: eventReducer,
  form: formReducer,
  modals: modalReducer
})

export default rootReducer;