import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'

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
import LocationIcon from '@material-ui/icons/LocationOn';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import GridList from '@material-ui/core/GridList';

/* Components */
import EventListAttendee from './EventListAttendee';

const styles = theme => ({
  card: {
    marginBottom: 30,
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
  }
});

class EventListItem extends Component {
  state = { expanded: false };

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };

  render() {
    const { classes, onEventOpen, deleteEvent } = this.props;
    const { id, title, venue, city, date, description, attendees, hostPhotoURL } = this.props.event;
    const attendeeList = attendees && attendees.map(attendee => <EventListAttendee key={attendee.id} attendee={attendee} />)
    return (
      <Card style={{ marginBottom: '2em' }}>
        <CardHeader
          align="left"
          avatar={
            <Avatar
              src={hostPhotoURL}
              aria-label="Recipe"
              className={classes.avatar}
            >
            </Avatar>
          }
          title={title}
          subheader={date}
        />
        <CardContent>
          <Typography align="left" component="p">
            {description}
          </Typography>
        </CardContent>
        <Divider variant="middle" />
        <CardContent>
          <Typography align="left" component="p">
            <LocationIcon /> {venue} | {city}
          </Typography>
        </CardContent>
        <CardActions className={classes.actions}>
          <Button component={Link} to={`/event/${id}`} color="primary">Learn More</Button>
          <Button onClick={deleteEvent(this.props.event.id)} color="secondary">Remove</Button>
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
            <Typography align="left" variant="subtitle1" gutterBottom>
              Attendees
            </Typography>
            <GridList cols={10}>
              {attendeeList}
            </GridList>
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