import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom'
import './index.css';
import App from './app/layout/App';
import * as serviceWorker from './serviceWorker';
import ScrollToTop from './app/common/util/ScrollToTop';

/* Redux */
import { Provider } from 'react-redux';
import { configureStore } from './app/store/configureStore';

/* Date Picker Utils */
import { MuiPickersUtilsProvider } from 'material-ui-pickers';
import MomentUtils from '@date-io/moment';

/* Event Actions */
import { loadEvents } from './features/event/eventActions';

const store = configureStore();
store.dispatch(loadEvents())

const rootElement = document.getElementById('root');
let render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <Router>
        <ScrollToTop>
          <MuiPickersUtilsProvider utils={MomentUtils}>
            <App />
          </MuiPickersUtilsProvider>
        </ScrollToTop>
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
