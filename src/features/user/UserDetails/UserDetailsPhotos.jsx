import React from 'react';
import LazyLoad from 'react-lazyload';

/* MUI Components */
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

/* MUI Icons */
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';

const styles = theme => ({
  grid: {
    padding: '2em'
  },
  media: {
    height: 250
  }
});

const UserDetailsPhotos = ({ classes, photos }) => {
  return (
    <Card>
      <CardHeader
        avatar={
          <PhotoLibraryIcon style={{ fontSize: '2em' }} />
        }
        title={
          <Typography variant="h5">Photo Library</Typography>
        }
      />
      <Grid
        spacing={24}
        alignItems="center"
        direction="row"
        justify="flex-start"
        container
        className={classes.grid}
      >
        <Grid
          container spacing={24}
          alignItems="center"
          direction="row"
          justify="flex-start"
        >
          {
            photos &&
            photos.map(photo => (
              <Grid item xs={12} sm={6} md={6} lg={4}>
                <Card className={classes.card}>
                  <CardActionArea>
                    <LazyLoad
                      key={photo.id}
                      height={150}
                      placeholder={
                        <CardMedia
                          className={classes.media}
                          image='/assets/user.png'
                        />
                      }
                    >
                      <CardMedia
                        className={classes.media}
                        image={photo.url}
                      />
                    </LazyLoad>
                  </CardActionArea>
                </Card>
              </Grid>
            ))
          }
        </Grid>
      </Grid>
    </Card>
  )
}

export default withStyles(styles)(UserDetailsPhotos);
