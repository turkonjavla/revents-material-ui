import React from 'react';
import moment from 'moment';

/* MUI Components */
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  card: {
    maxWidth: '100%'
  }
});

const UserDetailsDescription = ({ classes, profile }) => {
  let createdAt;

  if (profile.createdAt) {
    createdAt = moment(profile.createdAt).format('MMMM Do YYYY');
  }
  
  return (
    <Card className={classes.card}>
      <Grid container>
        <Grid item xs={12} sm={8}>
          <CardContent>
            <Typography variant="h6">
              About {profile.displayName}
            </Typography>
            <Typography variant="subtitle1">
              I am a: {profile.occupation || 'Not specified'}
            </Typography>
            <Typography variant="subtitle1">
              Originally from: {profile.origin || 'Not specified'}
            </Typography>
            <Typography variant="subtitle1">
              Member Since: {createdAt}
            </Typography>
          </CardContent>
        </Grid>
        <Grid item xs={12} sm={4}>
          <CardContent>
            <Typography variant="h6">Interests</Typography>
            {
              profile.interests &&
                profile.interests.length > 0 ?
                <React.Fragment>
                  {
                    profile.interests &&
                    profile.interests.map((interest, index) => (
                      <Typography key={index} variant="subtitle1">{interest.charAt(0).toUpperCase() + interest.slice(1)}</Typography>
                    ))
                  }
                </React.Fragment> : <Typography variant="subtitle1">No interests</Typography>
            }
          </CardContent>
        </Grid>
      </Grid>
    </Card>
  )
}

export default withStyles(styles)(UserDetailsDescription);
