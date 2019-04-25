import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from '../reducers/rootReducer';

export const configureStore = preloadedState => {
  const middlewares = [];
  const middlewareEnchancer = applyMiddleware(...middlewares);

  const storeEnchancers = [middlewareEnchancer];

  const composedEnchancer = composeWithDevTools(...storeEnchancers);

  const store = createStore(
    rootReducer,
    preloadedState,
    composedEnchancer
  );

  return store;
}