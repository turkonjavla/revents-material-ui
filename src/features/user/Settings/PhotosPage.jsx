import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { toastr } from 'react-redux-toastr';
import { firestoreConnect } from 'react-redux-firebase';

/* MUI Components */
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import CardHeader from '@material-ui/core/CardHeader';

/* Actions */
import { deletePhoto, setMainPhoto } from '../userActions';

/* Components */
import SettingsNav from './SettingsNav';
import PhotoUploadContainer from './photos/PhotoUploadContainer/PhotoUploadContainer';
import AllPhotosContainer from './photos/AllPhotosContainer/AllPhotosContainer';

class PhotosPage extends Component {

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
    const { photos, profile, loading, auth } = this.props;
    return (
      <Paper>
        <CardHeader
          action={
            <SettingsNav />
          }
          title="Your Photos"
          subheader="Use this page to upload photos and set a profile picture"
        />
        {/* Photo Upload */}
        <Grid container justify="flex-start">
          <PhotoUploadContainer
            loading={loading}
          />
        </Grid>

        <Divider variant="middle" />

        {/* Photo Select */}
        <Grid container justify="flex-start">
          <AllPhotosContainer
            handlePhotoDelete={this.handlePhotoDelete}
            handleSetMainPhoto={this.handleSetMainPhoto}
            loading={loading}
            profile={profile}
            photos={photos}
            auth={auth}
          />
        </Grid>
      </Paper>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.firebase.auth,
  profile: state.firebase.profile,
  photos: state.firestore.ordered.photos,
  loading: state.async.loading
});

const actions = {
  deletePhoto,
  setMainPhoto
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

export default compose(
  connect(mapStateToProps, actions),
  firestoreConnect(auth => query(auth))
)(PhotosPage)