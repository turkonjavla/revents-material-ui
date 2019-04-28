import React from 'react';
import { Link } from 'react-router-dom';

/* MUI Components */
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const EventDetailsHeader = ({ event }) => {
  return (
    <Card style={{ marginBottom: '2em' }}>
      <CardMedia
        style={{ height: '20em' }}
        image={`/assets/categoryImages/${event.category}.jpg`}
        title={event.title}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          {event.title}
        </Typography>
        <Typography variant="body2">
          {event.date}
        </Typography>
        <Typography variant="body2">
          Hosted by <strong>{event.hostedBy}</strong>
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" variant="outlined">
          Cancel My Place
        </Button>
        <Button size="small" color="primary" variant="contained">
          Join This Event
        </Button>
        <Button component={Link} to={`/manage/${event.id}`} size="small" color="secondary" variant="contained">
          Manage Event
        </Button>
      </CardActions>
    </Card>
  )
}

export default EventDetailsHeader;