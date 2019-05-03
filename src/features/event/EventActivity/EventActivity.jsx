import React from 'react';
import PropTypes from 'prop-types';

/* MUI Components */
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
});

const EventActivity = ({ classes }) => {
  const recentActivity = false;
  return (
    <Card>
      <List
        className={classes.root}
        subheader={
          <ListSubheader>
            Recent Activity
          </ListSubheader>
        }
      >
        {
          recentActivity ?
            (
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar alt="Remy Sharp" src="/assets/user.png" />
                </ListItemAvatar>
                <ListItemText
                  primary="Brunch this weekend?"
                  secondary={
                    <React.Fragment>
                      <Typography component="span" className={classes.inline} color="textPrimary">
                        Ali Connors
              </Typography>
                      {" — I'll be in your neighborhood doing errands this…"}
                    </React.Fragment>
                  }
                />
              </ListItem>
            ) : (
              <ListItem alignItems="flex-start">
                <ListItemText
                  primary="No Recent activity"
                />
              </ListItem>
            )
        }
      </List>
    </Card>
  )
}

EventActivity.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(EventActivity);
