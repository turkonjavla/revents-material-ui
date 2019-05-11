import React, { Component, Fragment } from 'react'
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect, isEmpty } from 'react-redux-firebase';
import { userDetailsQuery } from '../userQueries';

/* MUI Components */
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';

/* Components */
import UserDetailsHeader from './UserDetailsHeader';
import UserDetailsDescription from './UserDetailsDescription';
import UserDetailsSidebar from './UserDetailsSidebar';
import UserDetailsPhotos from './UserDetailsPhotos';
import UserDetailsEvents from './UserDetailsEvents';

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

class UserDetailsPage extends Component {
  render() {
    const { classes, profile, photos, auth, match } = this.props;
    const isCurrentUser = auth.uid === match.params.id;
    return (
      <Fragment>
        <Grid container justify="center">
          <Grid container spacing={24} alignItems="center" justify="center" className={classes.grid}>
            <Grid container spacing={24} justify="center">
              <Grid item xs={12}>
                <UserDetailsHeader profile={profile} />
              </Grid>
              <Grid item xs={12} md={8}>
                <UserDetailsDescription profile={profile} />
              </Grid>
              <Grid item xs={12} md={4}>
                <UserDetailsSidebar isCurrentUser={isCurrentUser} />
              </Grid>
            </Grid>
            <Grid container style={{ marginTop: '1em' }} spacing={24} justify="flex-start">
              <Grid item xs={12} md={8}>
                {
                  photos &&
                  photos.length > 0 &&
                  <UserDetailsPhotos photos={photos} />
                }
              </Grid>
              <Grid item xs={12} md={8}>
                <UserDetailsEvents />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Fragment>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  let userUid = null;
  let profile = {};
  
  if(ownProps.match.params.id === state.auth.uid) {
    profile = state.firebse.profile;
  }
  else {
    profile = !isEmpty(state.firestore.ordered.profile) && state.firestore.ordered.profile[0];
    userUid = ownProps.match.params.id;
  }

  return {
    profile,
    userUid,
    auth: state.firebase.auth,
    photos: state.firestore.ordered.photos
  }
}

export default compose(
  connect(mapStateToProps),
  firestoreConnect((auth, userUid) => userDetailsQuery(auth, userUid)),
  withStyles(styles)
)(UserDetailsPage)
