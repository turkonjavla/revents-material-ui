import React from 'react';

import moment from 'moment';

/* MUI Components */
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import differenceInYears from 'date-fns/differenceInYears';

const styles = theme => ({
  card: {
    maxWidth: '100%',
    marginTop: '2em'
  },
});

const UserDetailsHeader = ({ classes, profile }) => {
  let age;

  if(profile.dateOfBirth) {
    age = differenceInYears(Date.now(), moment(profile.dateOfBirth).toDate())
  }
  else {
    age = 'Age not specified'
  }

  return (
    <Card className={classes.card}>
      <CardHeader
        avatar={
          <Avatar
            alt="Remy Sharp"
            src={profile.photoURL || '/assets/user.png'}
            style={{ width: '100px', height: '100px' }}
          />
        }
        title={
          <React.Fragment>
            <Typography variant="h5">{profile.displayName}</Typography>
          </React.Fragment>
        }
        subheader={
          <React.Fragment>
            <Typography variant="subtitle1">{profile.occupation || 'Occupation not specified'}</Typography>
            <Typography variant="subtitle1">{age}, Lives in {profile.city || 'Not specified'}</Typography>
          </React.Fragment>
        }
      />
    </Card>
  )
}

export default withStyles(styles)(UserDetailsHeader);
