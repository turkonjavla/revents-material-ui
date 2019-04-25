import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom'
import './index.css';
import App from './app/layout/App';
import * as serviceWorker from './serviceWorker';

/* Redux */
import { Provider } from 'react-redux';
import { configureStore } from './app/store/configureStore';

const store = configureStore();

const rootElement = document.getElementById('root');
let render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>,
    rootElement
  );
}

if (module.hot) {
  module.hot.accept('./app/layout/App', () => {
    setTimeout(render)
  })
}

render();
serviceWorker.unregister();
