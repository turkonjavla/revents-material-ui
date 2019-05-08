import React from 'react';

/* MUI Components */
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

/* MUI Icons */
import DeleteIcon from '@material-ui/icons/Delete';

const styles = theme => ({
  grid: {
    padding: '2em'
  },
  media: {
    height: 250
  }
});

const AllPhotosContainer = ({ classes, loading, profile, photos, handlePhotoDelete, handleSetMainPhoto }) => {
  let filteredPhotos;

  if (photos) {
    filteredPhotos = photos.filter(photo => {
      return photo.url !== profile.photoURL
    })
  }

  return (
    <Grid
      spacing={24}
      alignItems="center"
      direction="row"
      justify="flex-start"
      container
      className={classes.grid}
    >
      <Grid item xs={12}>
        <Typography variant="subtitle1">
          All Photos
        </Typography>
      </Grid>
      <Grid
        container spacing={24}
        alignItems="center"
        direction="row"
        justify="flex-start">
        <Grid item xs={12} sm={6} md={6} lg={4}>
          <Card className={classes.card}>
            <CardActionArea>
              <CardMedia
                className={classes.media}
                image={profile.photoURL || '/assets/user.png'}
              />
            </CardActionArea>
            <CardActions>
              <Button fullWidth size="small" variant="contained" color="primary">
                Main Photo
                </Button>
            </CardActions>
          </Card>
        </Grid>
        {
          photos &&
          filteredPhotos.map(photo => (
            <Grid item xs={12} sm={6} md={6} lg={4} key={photo.id}>
              <Card className={classes.card}>
                <CardActionArea>
                  <CardMedia
                    className={classes.media}
                    image={photo.url}
                  />
                </CardActionArea>
                <CardActions>
                  <Button
                    onClick={handleSetMainPhoto(photo)}
                    fullWidth
                    variant="contained"
                    size="small"
                    color="primary"
                    disabled={loading}
                  >
                    Main
                  </Button>
                  <Button
                    onClick={handlePhotoDelete(photo)}
                    fullWidth
                    variant="contained"
                    size="small"
                    color="secondary"
                    disabled={loading}
                  >
                    {
                      loading ? 'Removing' : (
                        <React.Fragment>
                          Remove <DeleteIcon />
                        </React.Fragment>
                      )
                    }
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))
        }
      </Grid>
    </Grid>
  )
}

export default withStyles(styles)(AllPhotosContainer);