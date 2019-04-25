import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';

/* Components */
import NavBar from '../../features/nav/NavBar/NavBar';
import HomePage from '../../features/home/HomePage';
import EvetDetailsPage from '../../features/event/EventDetails/EventDetailsPage';
import EventDashboard from '../../features/event/EventDashboard/EventDashboard';
import UserDetailsPage from '../../features/user/UserDetails/UserDetailsPage';
import PeopleDashboard from '../../features/user/PeopleDashboard/PeopleDashboard';
import SettingsDashboard from '../../features/user/Settings/SettingsDashboard';
import EventForm from '../../features/event/EventForm/EventForm';

class App extends Component {
  render() {
    return (
      <div>
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
                <Route exact path="/events" component={EventDashboard} />
                <Route exact path="/event/:id" component={EvetDetailsPage} />
                <Route exact path="/people" component={PeopleDashboard} />
                <Route exact path="/profile/:id" component={UserDetailsPage} />
                <Route exact path="/settings" component={SettingsDashboard} />
                <Route exact path="/createEvent" component={EventForm} />
              </Switch>
            </div>
          )}
        />
      </div>
    )
  }
}

export default App;
