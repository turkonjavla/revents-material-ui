import { combineReducers } from 'redux';

/* Custom Reducers */
import testReducer from '../../features/testarea/testReducer';

const rootReducer = combineReducers({
  test: testReducer
})

export default rootReducer;