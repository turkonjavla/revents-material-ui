import React from 'react';
import PropTypes from 'prop-types';

/* MUI Components */
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card'
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import EventActivityItem from './EventActivityItem';

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

const EventActivity = ({ classes, activities }) => {
  return (
    <Card>
      <List
        className={styles.root}
        subheader={
          <ListSubheader>
            Recent Activity
        </ListSubheader>
        }
      >
        {
          activities &&
          activities.map(activity => <EventActivityItem key={activity.id} activity={activity} />)
        }
      </List>
    </Card>
  )
}

EventActivity.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(EventActivity);
