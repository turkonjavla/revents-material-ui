import React from 'react'
import { compose } from 'redux';
import { connect } from 'react-redux';
import { toastr } from 'react-redux-toastr';
import { firestoreConnect } from 'react-redux-firebase';

/* MUI Components */
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import CardHeader from '@material-ui/core/CardHeader';

/* Actions */
import { deletePhoto, setMainPhoto } from '../userActions';

/* Components */
import SettingsNav from './SettingsNav';
import PhotoUploadContainer from './photos/PhotoUploadContainer/PhotoUploadContainer';
import AllPhotosContainer from './photos/AllPhotosContainer/AllPhotosContainer';

const PhotosPage = (props) => {
  const { photos, profile, loading, auth, deletePhoto, setMainPhoto } = props;

  const handlePhotoDelete = photo => async () => {
    try {
      deletePhoto(photo);
    }
    catch (error) {
      toastr.error('Oops', error.message)
    }
  }

  const handleSetMainPhoto = photo => async () => {
    try {
      await setMainPhoto(photo);
    }
    catch (error) {
      toastr.error('Oops', error.message);
    }
  }
  return (
    <Card>
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
          handlePhotoDelete={handlePhotoDelete}
          handleSetMainPhoto={handleSetMainPhoto}
          loading={loading}
          profile={profile}
          photos={photos}
          auth={auth}
        />
      </Grid>
    </Card>
  )
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