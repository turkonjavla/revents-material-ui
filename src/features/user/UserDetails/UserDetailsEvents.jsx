import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

/* MUI Components */
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import CardActionArea from '@material-ui/core/CardActionArea';
import CircularProgress from '@material-ui/core/CircularProgress';
import CardMedia from '@material-ui/core/CardMedia';
import CardHeader from '@material-ui/core/CardHeader';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

/* MUI Icons */
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';

function TabContainer(props) {
  return (
    <Typography component="div">
      {props.children}
    </Typography>
  );
}

const styles = theme => ({
  grid: {
    padding: '2em'
  },
  media: {
    height: 140
  }
});

class UserDetailsEvents extends Component {
  render() {
    const { classes, events, eventsLoading, changeTab, value } = this.props;
    return (
      <Card>
        <CardHeader
          avatar={
            <CalendarTodayIcon style={{ fontSize: '2em' }} />
          }
          title={
            <Typography variant="h5">Events</Typography>
          }
        />
        <div style={{ padding: '0.5em' }}>
          <Grid>
            <AppBar position="static">
              <Tabs
                value={value}
                onChange={(e, data) => changeTab(e, data)}
                scrollButtons="on"
                variant="scrollable"
              >
                <Tab disabled={eventsLoading} label="All events" />
                <Tab disabled={eventsLoading} label="Past Events" />
                <Tab disabled={eventsLoading} label="Future Events" />
                <Tab disabled={eventsLoading} label="Events Hosted" />
              </Tabs>
            </AppBar>
          </Grid>
        </div>
          <TabContainer>
            {
              eventsLoading ?
                <CircularProgress
                color="secondary"
                  style={{
                    position: 'relative',
                    top: '50%',
                    left: '50%',
                    marginTop: '5em',
                    marginLeft: '-12px',
                    marginBottom: '5em'
                  }}
                /> :
                (<Grid
                  spacing={24}
                  alignItems="center"
                  direction="row"
                  justify="flex-start"
                  container
                  className={classes.grid}
                >
                  {
                    events &&
                    events.map(event => (
                      <Grid item xs={12} sm={6} md={6} lg={4} key={event.id}>
                        <Card>
                          <CardActionArea component={Link} to={`/event/${event.id}`}>
                            <CardMedia
                              className={classes.media}
                              image={`/assets/categoryImages/${event.category}.jpg`}
                              title={event.title}
                            />
                            <CardContent>
                              <Typography gutterBottom variant="h5" component="h2">
                                {event.title}
                              </Typography>
                              <Typography gutterBottom variant="subtitle2">
                                {moment(event.date).format('dddd Do MMMM')} at {moment(event.date).format('hh:mm A')}
                              </Typography>
                            </CardContent>
                          </CardActionArea>
                        </Card>
                      </Grid>
                    ))
                  }
                </Grid>)
            }
          </TabContainer>
      </Card>

    )
  }
}

export default withStyles(styles)(UserDetailsEvents);
