import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

/* Material UI Components */
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

/* Components */
import BasicPage from './BasicPage';
import AboutPage from './AboutPage';
import PhotosPage from './PhotosPage';
import AccountPage from './AccountPage';
import SettingsNav from './SettingsNav';

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
    padding: theme.spacing.unit * 2,
  }
});

const SettingsDashboard = ({ classes }) => {
  return (
    <div className={classes.root}>
      <Grid container justify="center">
        <Grid spacing={24} alignItems="center" justify="center" container className={classes.grid}>
          <Grid item xs={10}>
            <div className={classes.topBar}>
              <div className={classes.block}>
                <Typography variant="h6" gutterBottom>Settings Dashboard</Typography>
                <Typography variant="body1">
                  You can update your profile settings here.
              </Typography>
              </div>
            </div>
          </Grid>
          <Grid item xs={2}>
            <SettingsNav />
          </Grid>
          <Grid container spacing={24} justify="center">
            <Grid item xs={12}>
              <Switch>
                <Redirect exact from="/settings" to="/settings/basic" />
                <Route path="/settings/basic" component={BasicPage} />
                <Route path="/settings/about" component={AboutPage} />
                <Route path="/settings/photos" component={PhotosPage} />
                <Route path="/settings/account" component={AccountPage} />
              </Switch>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  )
}

export default withStyles(styles)(SettingsDashboard);
