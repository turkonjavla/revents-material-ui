import React, { Component } from 'react';

/* MUI Components */
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import CardActionArea from '@material-ui/core/CardActionArea';
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
  state = {
    value: 0
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;
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
              <Tabs value={value} onChange={this.handleChange} scrollButtons="on" variant="scrollable">
                <Tab label="All events" />
                <Tab label="Past Events" />
                <Tab label="Future Events" />
                <Tab label="Events Hosted" />
              </Tabs>
            </AppBar>
          </Grid>
        </div>
        {
          value === 0 &&
          <TabContainer>
            <Grid
              spacing={24}
              alignItems="center"
              direction="row"
              justify="flex-start"
              container
              className={classes.grid}
            >
              <Grid item xs={12} sm={6} md={6} lg={4}>
                <Card>
                  <CardActionArea>
                    <CardMedia
                      className={classes.media}
                      image="/assets/categoryImages/drinks.jpg"
                      title="Contemplative Reptile"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                        Lizard
                      </Typography>
                      <Typography component="p">
                        Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                        across all continents except Antarctica
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions>
                    <Button size="small" color="primary">
                      Share
                    </Button>
                    <Button size="small" color="primary">
                      Learn More
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            </Grid>
          </TabContainer>
        }
        {
          value === 1 &&
          <TabContainer>
            <Grid
              spacing={16}
              alignItems="center"
              direction="row"
              justify="flex-start"
              container
              className={classes.grid}
            >
              <Grid item xs={12} sm={6} md={6} lg={4}>
                <Card className={classes.card}>
                  <CardActionArea>
                    <CardMedia
                      className={classes.media}
                      image="/assets/categoryImages/drinks.jpg"
                      title="Contemplative Reptile"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                        Lizard
                      </Typography>
                      <Typography component="p">
                        Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                        across all continents except Antarctica
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions>
                    <Button size="small" color="primary">
                      Share
                    </Button>
                    <Button size="small" color="primary">
                      Learn More
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} md={6} lg={4}>
                <Card className={classes.card}>
                  <CardActionArea>
                    <CardMedia
                      className={classes.media}
                      image="/assets/categoryImages/drinks.jpg"
                      title="Contemplative Reptile"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                        Lizard
                      </Typography>
                      <Typography component="p">
                        Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                        across all continents except Antarctica
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions>
                    <Button size="small" color="primary">
                      Share
                    </Button>
                    <Button size="small" color="primary">
                      Learn More
                    </Button>
                  </CardActions>
                </Card>
              </Grid>

            </Grid>
          </TabContainer>
        }
        {value === 2 && <TabContainer>Item Three</TabContainer>}
        {value === 3 && <TabContainer>Item Four</TabContainer>}
      </Card>

    )
  }
}

export default withStyles(styles)(UserDetailsEvents);
