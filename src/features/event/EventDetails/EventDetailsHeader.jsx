import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

/* MUI Components */
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CircularProgress from '@material-ui/core/CircularProgress';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const EventDetailsHeader = ({ event, isHost, isGoing, goingToEvent, cancelGoingToEvent, loading }) => {
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
        <Typography variant="subtitle1">
          {moment(event.date).format('dddd Do MMMM YYYY')}
        </Typography>
        <Typography variant="subtitle1">
          Hosted by {event.hostedBy}
        </Typography>
      </CardContent>
      <CardActions>
        {
          !isHost &&
          <div>
            {
              isGoing ?
                (
                  <Button disabled={loading} onClick={() => cancelGoingToEvent(event)} size="small" variant="outlined">
                    Cancel My Place
                    {
                      loading && <CircularProgress style={{ marginLeft: '0.5em' }} color="secondary" size={20} />
                    }
                  </Button>
                ) :
                (
                  <Button disabled={loading} onClick={() => goingToEvent(event)} size="small" color="primary" variant="outlined">
                    Join This Event
                    {
                      loading && <CircularProgress style={{ marginLeft: '0.5em' }} color="secondary" size={20} />
                    }
                  </Button>
                )
            }
          </div>
        }
        {
          isHost &&
          <Button component={Link} to={`/manage/${event.id}`} size="small" color="secondary" variant="contained">
            Manage Event
          </Button>
        }
      </CardActions>
    </Card>
  )
}

export default EventDetailsHeader;