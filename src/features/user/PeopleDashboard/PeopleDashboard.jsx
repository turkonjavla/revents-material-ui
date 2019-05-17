import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';

/* MUI Components */
import { withStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';

/* Components */
import PersonCard from './PersonCard';
import LoadingComponent from '../../../app/layout/LoadingComponent';

const styles = theme => ({
  grid: {
    width: 1200,
    margin: `0px`,
    padding: '2em'
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

const PeopleDashboard = ({ classes, following, followers, requesting }) => {
  const loading = Object.values(requesting).some(a => a === true);

  if(loading) return <LoadingComponent />
  return (

    <Grid container justify="center">
      <Grid spacing={24} alignItems="center" justify="center" container className={classes.grid}>
        <Grid container spacing={24} justify="center">
          <Grid item xs={12} sm={10} md={12}>
            <Card>
              <CardHeader
                title="Followers"
                subheader="See people that are following you"
              />
              {/* Photo Upload */}
              <Grid
                container spacing={24}
                alignItems="center"
                direction="row"
                justify="flex-start"
              >
                {
                  followers &&
                    followers.length > 0 ?

                    followers &&
                    followers.map(follower => <PersonCard key={follower.id} user={follower} />)
                    : (
                      <Grid
                        container
                        justify="center"
                        style={{ height: '5em', marginTop: '3em', marginBottom: '3em' }}
                      >
                        <Typography>You don't have any followers</Typography>
                      </Grid>
                    )
                }
              </Grid>
            </Card>
            <Divider variant="middle" />

            {/* Photo Select */}
            <Card style={{ marginTop: '2em' }}>
              <CardHeader
                title="Following"
                subheader="See people that you are following"
              />
              <Grid
                container spacing={24}
                alignItems="center"
                direction="row"
                justify="flex-start"
              >
                 {
                  following &&
                    following.length > 0 ?

                    following &&
                    following.map(following => <PersonCard key={following.id} user={following} />)
                    : (
                      <Grid
                        container
                        justify="center"
                        style={{ height: '5em', marginTop: '3em', marginBottom: '3em' }}
                      >
                        <Typography>You aren't following anyone</Typography>
                      </Grid>
                    )
                }
              </Grid>
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

const query = ({ auth }) => {
  return [
    {
      collection: 'users',
      doc: auth.uid,
      subcollections: [{ collection: 'following' }],
      storeAs: 'following'
    },
    {
      collection: 'users',
      doc: auth.uid,
      subcollections: [{ collection: 'followers' }],
      storeAs: 'followers'
    }
  ]
}

const mapStateToProps = state => ({
  followers: state.firestore.ordered.followers,
  following: state.firestore.ordered.following,
  auth: state.firebase.auth,
  requesting: state.firestore.status.requesting
})

export default compose(
  connect(mapStateToProps),
  firestoreConnect(props => query(props)),
  withStyles(styles)
)(PeopleDashboard)
