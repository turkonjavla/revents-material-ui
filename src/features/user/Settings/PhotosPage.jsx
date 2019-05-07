import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { toastr } from 'react-redux-toastr';
import { firestoreConnect } from 'react-redux-firebase';
import Dropzone from 'react-dropzone';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';

/* MUI Components */
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';

/* MUI Icons */
import DeleteIcon from '@material-ui/icons/Delete'
import CloudUploadIcon from '@material-ui/icons/CloudUpload'

/* Components */
import SettingsNav from './SettingsNav';
import IconButton from '@material-ui/core/IconButton';
import LoadingComponent from '../../../app/layout/LoadingComponent';

/* Actions */
import { uploadProfileImage, deletePhoto, setMainPhoto } from '../userActions';

const styles = theme => ({
  grid: {
    width: 1200,
    paddingBottom: '20px',
    margin: `0 ${theme.spacing.unit * 2}px`,
    [theme.breakpoints.down('sm')]: {
      width: 'calc(100% - 20px)'
    }
  },
  card: {
    maxWidth: 345,
  },
  media: {
    height: 250
  }
});

class PhotosPage extends Component {
  state = {
    files: [],
    fileName: '',
    cropResult: null,
    image: {}
  }

  onDrop = files => {
    this.setState({
      files,
      fileName: files[0].name
    })
  }

  cropImage = () => {
    if (typeof this.refs.cropper.getCroppedCanvas() === 'undefined') {
      return;
    }

    this.refs.cropper.getCroppedCanvas().toBlob(blob => {
      let imageUrl = URL.createObjectURL(blob);

      this.setState({
        cropResult: imageUrl,
        image: blob
      })
    }, 'image/jpeg');
  }

  cancelCrop = () => {
    this.setState({
      files: [],
      image: {}
    });
  }

  uploadImage = async () => {
    try {
      await this.props.uploadProfileImage(this.state.image, this.state.fileName);
      this.cancelCrop();
      toastr.success('Success!', 'Photo has been uplaoded');
    }
    catch (error) {
      console.log(error)
      toastr.error('Error', error.message);
    }
  }

  handlePhotoDelete = photo => async () => {
    try {
      this.props.deletePhoto(photo);
    }
    catch (error) {
      toastr.error('Oops', error.message)
    }
  }

  handleSetMainPhoto = photo => async () => {
    try {
      this.props.setMainPhoto(photo);
    }
    catch (error) {
      toastr.error('Oop', error.message);
    }
  }

  render() {
    const { classes, photos, profile, loading } = this.props;
    let filteredPhotos;

    if (photos) {
      filteredPhotos = photos.filter(photo => {
        return photo.url !== profile.photoURL
      })
    }

    return (
      <Paper>
        <CardHeader
          action={
            <SettingsNav />
          }
          title="Your Photos"
          subheader="Use this to upload photos and set a profile picture"
        />
        {/* Photo Upload */}

        <Grid container justify="center">
          <Grid
            spacing={24}
            alignItems="center"
            direction="row"
            justify="center"
            container
            className={classes.grid}
          >
            <Grid item xs={12} md={4} lg={4}>
              <Typography variant="subtitle1">
                Step 1 - Add Photo
                </Typography>
              <Card>
                <Dropzone style={{ width: '100%' }} onDrop={this.onDrop} multiple={false}>
                  <CardContent style={{ textAlign: 'center', paddingTop: '2.5em' }}>
                    <IconButton>
                      <CloudUploadIcon />
                    </IconButton>
                    <Typography variant="subtitle1">
                      Drop imag here or click to add
                    </Typography>
                  </CardContent>
                </Dropzone>
              </Card>

            </Grid>
            <Grid item xs={12} md={4} lg={4}>
              {
                this.state.files[0] &&
                <React.Fragment>
                  <Typography variant="subtitle1">
                    Step 2 - Resize Photo
                    </Typography>
                  <Card className={classes.card}>
                    <CardActionArea>
                      <Cropper
                        style={{ height: '250px' }}
                        ref="cropper"
                        src={this.state.files[0].preview}
                        aspectRation={1}
                        viewMode={0}
                        dragMode='move'
                        guides={false}
                        scalable={true}
                        cropBoxMovable={true}
                        cropBoxResizable={true}
                        crop={this.cropImage}
                      />
                    </CardActionArea>
                  </Card>
                </React.Fragment>
              }
            </Grid>
            <Grid item xs={12} md={4} lg={4}>
              {
                this.state.files[0] &&
                this.state.cropResult &&
                <React.Fragment>
                  <Typography variant="subtitle1">
                    Step 3 - Upload Photo
                    </Typography>
                  <Card className={classes.card}>
                    <CardActionArea>
                      {
                        loading &&
                        <LoadingComponent color="secondary" text="Uploading" />
                      }
                      <CardMedia
                        className={classes.media}
                        image={this.state.cropResult}
                      />
                    </CardActionArea>
                    <CardActions>
                      <Button
                        onClick={this.uploadImage}
                        fullWidth
                        variant="contained"
                        size="small"
                        color="primary"
                        disabled={loading}
                      >
                        Upload
                      </Button>
                      <Button
                        onClick={this.cancelCrop}
                        fullWidth
                        variant="contained"
                        size="small"
                        color="secondary"
                        disabled={loading}
                      >
                        Cancel
                      </Button>
                    </CardActions>
                  </Card>
                </React.Fragment>
              }
            </Grid>
          </Grid>
        </Grid>

        <Divider variant="middle" />

        {/* Photo Select */}
        <Grid container justify="flex-start">
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
              <Grid item xs={12} md={4} lg={4}>
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
                  <Grid item xs={12} md={4} lg={4} key={photo.id}>
                    <Card className={classes.card}>
                      <CardActionArea>
                        <CardMedia
                          className={classes.media}
                          image={photo.url}
                        />
                      </CardActionArea>
                      <CardActions>
                        <Button
                          onClick={this.handleSetMainPhoto(photo)}
                          fullWidth
                          variant="contained"
                          size="small"
                          color="primary"
                          disabled={loading}
                        >
                          Main
                        </Button>
                        <Button
                          onClick={this.handlePhotoDelete(photo)}
                          fullWidth
                          variant="contained"
                          size="small"
                          color="secondary"
                          disabled={loading}
                        >
                          Remove <DeleteIcon />
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                ))
              }
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    )
  }
}

const query = ({ auth }) => {
  return [
    {
      collection: 'users',
      doc: auth.uid,
      subcollections: [{ collection: 'photos' }],
      storeAs: 'photos'
    }
  ]
}

const mapStateToProps = state => ({
  auth: state.firebase.auth,
  profile: state.firebase.profile,
  photos: state.firestore.ordered.photos,
  loading: state.async.loading
});

const actions = {
  uploadProfileImage,
  deletePhoto,
  setMainPhoto
}

export default compose(
  connect(mapStateToProps, actions),
  firestoreConnect(auth => query(auth)),
  withStyles(styles)
)(PhotosPage)