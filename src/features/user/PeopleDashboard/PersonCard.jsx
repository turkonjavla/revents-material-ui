import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'

/* MUI Components */
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

const styles = {
  card: {
    maxWidth: 345,
    margin: '1em'
  },
  media: {
    height: 280
  },
};

const PersonCard = ({ classes, user }) => {
  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Card className={classes.card}>
        <CardActionArea component={Link} to={`/profile/${user.id}`}>
          <CardMedia
            className={classes.media}
            image={user.photoURL || '/assets/user.png'}
          />
          <CardContent>
            <Typography gutterBottom variant="h6" component="h2">
              {user.displayName}
            </Typography>
            <Typography component="p">
              {user.city}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  )
}

PersonCard.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(PersonCard);
