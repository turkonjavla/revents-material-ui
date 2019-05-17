import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Loadable from 'react-loadable';
import LoadingComponent from './LoadingComponent';
import CssBaseline from '@material-ui/core/CssBaseline';
import { userIsAuthtenticated } from '../../features/auth/authWrapper';

/* Components */
const AsyncNavBar = Loadable({
  loader: () => import('../../features/nav/NavBar/NavBar'),
  loading: LoadingComponent
});
const AsyncHomePage = Loadable({
  loader: () => import('../../features/home/HomePage'),
  loading: LoadingComponent
});
const AsyncEvetDetailsPage = Loadable({
  loader: () => import('../../features/event/EventDetails/EventDetailsPage'),
  loading: LoadingComponent
});
const AsyncEventDashboard = Loadable({
  loader: () => import('../../features/event/EventDashboard/EventDashboard'),
  loading: LoadingComponent
});
const AsyncUserDetailsPage = Loadable({
  loader: () => import('../../features/user/UserDetails/UserDetailsPage'),
  loading: LoadingComponent
});
const AsyncPeopleDashboard = Loadable({
  loader: () => import('../../features/user/PeopleDashboard/PeopleDashboard'),
  loading: LoadingComponent
});
const AsyncSettingsDashboard = Loadable({
  loader: () => import('../../features/user/Settings/SettingsDashboard'),
  loading: LoadingComponent
});
const AsyncEventForm = Loadable({
  loader: () => import('../../features/event/EventForm/EventForm'),
  loading: LoadingComponent
});
const AsyncNotFound = Loadable({
  loader: () => import('./NotFound'),
  loading: LoadingComponent
});
const AsyncModalManager = Loadable({
  loader: () => import('../../features/modals/ModalManager'),
  loading: LoadingComponent
});

class App extends Component {
  render() {
    return (
      <div>
        <AsyncModalManager />
        <Switch>
          <Route exact path="/" component={AsyncHomePage} />
        </Switch>

        <Route
          path="/(.+)"
          render={() => (
            <div>
              <CssBaseline />
              <AsyncNavBar />
              <Switch>
                <Route path="/events" component={AsyncEventDashboard} />
                <Route path="/event/:id" component={AsyncEvetDetailsPage} />
                <Route path="/manage/:id" component={userIsAuthtenticated(AsyncEventForm)} />
                <Route path="/people" component={userIsAuthtenticated(AsyncPeopleDashboard)} />
                <Route path="/profile/:id" component={userIsAuthtenticated(AsyncUserDetailsPage)} />
                <Route path="/settings" component={userIsAuthtenticated(AsyncSettingsDashboard)} />
                <Route path="/createEvent" component={userIsAuthtenticated(AsyncEventForm)} />
                <Route component={AsyncNotFound} />
              </Switch>
            </div>
          )}
        />
      </div>
    )
  }
}

export default App;