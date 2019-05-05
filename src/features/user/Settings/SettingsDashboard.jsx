import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';

/* Material UI Components */
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';

/* Components */
import BasicPage from './BasicPage';
import AboutPage from './AboutPage';
import PhotosPage from './PhotosPage';
import AccountPage from './AccountPage';

/* Actions */
import { updatePassword } from '../../auth/authActions';
import { updateProfile } from '../userActions'

const styles = theme => ({
  grid: {
    width: 1200,
    margin: `0 ${theme.spacing.unit * 2}px`,
    [theme.breakpoints.down('sm')]: {
      width: 'calc(100% - 20px)'
    }
  },
  topBar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  block: {
    padding: theme.spacing.unit * 2
  }
});

const SettingsDashboard = ({ classes, updatePassword, providerId, user, updateProfile }) => {
  return (
    <div style={{ marginTop: '2em' }}>
      <Grid container justify="center">
        <Grid spacing={24} alignItems="center" justify="center" container className={classes.grid}>
          <Grid container spacing={24} justify="center">
            <Grid item xs={12} sm={10} md={8}>
              <Switch>
                <Redirect exact from="/settings" to="/settings/basic" />
                <Route
                  path="/settings/basic"
                  render={() =>
                    < BasicPage
                      updateProfile={updateProfile}
                      initialValues={user}
                    />
                  }
                />
                <Route path="/settings/about" component={AboutPage} />
                <Route path="/settings/photos" component={PhotosPage} />
                <Route
                  path="/settings/account"
                  render={() =>
                    <AccountPage
                      providerId={providerId}
                      updatePassword={updatePassword}
                    />
                  }
                />
              </Switch>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  )
}

const mapStateToProps = state => ({
  providerId: state.firebase.auth.providerData[0].providerId,
  user: state.firebase.profile
});

const actions = {
  updatePassword,
  updateProfile
}

export default compose(
  connect(mapStateToProps, actions),
  withStyles(styles)
)(SettingsDashboard);