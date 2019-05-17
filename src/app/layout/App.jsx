import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { userIsAuthtenticated } from '../../features/auth/authWrapper';

/* Components */
import NavBar from '../../features/nav/NavBar/NavBar';
import HomePage from '../../features/home/HomePage';
import EvetDetailsPage from '../../features/event/EventDetails/EventDetailsPage';
import EventDashboard from '../../features/event/EventDashboard/EventDashboard';
import UserDetailsPage from '../../features/user/UserDetails/UserDetailsPage';
import PeopleDashboard from '../../features/user/PeopleDashboard/PeopleDashboard';
import SettingsDashboard from '../../features/user/Settings/SettingsDashboard';
import EventForm from '../../features/event/EventForm/EventForm';
import TestComponent from '../../features/testarea/TestComponent';
import NotFound from './NotFound';

/* Modal Manager */
import ModalManager from '../../features/modals/ModalManager';

class App extends Component {
  render() {
    return (
      <div>
        <ModalManager />
        <Switch>
          <Route exact path="/" component={HomePage} />
        </Switch>

        <Route
          path="/(.+)"
          render={() => (
            <div>
              <CssBaseline />
              <NavBar />
              <Switch>
                <Route path="/events" component={EventDashboard} />
                <Route path="/event/:id" component={EvetDetailsPage} />
                <Route path="/manage/:id" component={userIsAuthtenticated(EventForm)} />
                <Route path="/people" component={userIsAuthtenticated(PeopleDashboard)} />
                <Route path="/profile/:id" component={userIsAuthtenticated(UserDetailsPage)} />
                <Route path="/settings" component={userIsAuthtenticated(SettingsDashboard)} />
                <Route path="/createEvent" component={userIsAuthtenticated(EventForm)} />
                <Route path="/test" component={TestComponent} />
                <Route component={NotFound} />
              </Switch>
            </div>
          )}
        />
      </div>
    )
  }
}

export default App;