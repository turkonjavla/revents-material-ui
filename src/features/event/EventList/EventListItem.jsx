import React, { Component } from 'react';
import PropTypes from 'prop-types';

/* Material UI Components */
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Button from '@material-ui/core/Button';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

/* Components */
import EventListAttendee from './EventListAttendee';

const styles = theme => ({
  card: {
    maxWidth: 800,
    marginTop: 30
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  actions: {
    display: 'flex',
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
});

class EventListItem extends Component {
  state = { expanded: false };

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };

  render() {
    const { classes } = this.props;
    return (
      <Card className={classes.card}>
        <CardHeader
          align="left"
          avatar={
            <Avatar
              src="https://randomuser.me/api/portraits/women/42.jpg"
              aria-label="Recipe"
              className={classes.avatar}
            >
            </Avatar>
          }
          title="Shrimp and Chorizo Paella"
          subheader={"September 14, 2016 || time"}
        />
        <CardContent>
          <Typography align="left" component="p">
            This impressive paella is a perfect party dish and a fun meal to cook together with your
            guests. Add 1 cup of frozen peas along with the mussels, if you like.
        </Typography>
        </CardContent>
        <CardActions className={classes.actions} disableActionSpacing>
          <Button color="primary">Learn More</Button>
          <Button color="secondary">Remove</Button>
          <IconButton
            className={classnames(classes.expand, {
              [classes.expandOpen]: this.state.expanded,
            })}
            onClick={this.handleExpandClick}
            aria-expanded={this.state.expanded}
            aria-label="Show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <EventListAttendee />
          </CardContent>
        </Collapse>
      </Card>
    )
  }
}

EventListItem.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(EventListItem);