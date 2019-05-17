import React from 'react';

/* MUI Components */
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';

/* Font Awesome */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons';

const SocialLogin = ({ socialLogin }) => {
  return (
    <React.Fragment>
      <DialogActions style={{ marginTop: '1em' }}>
        <Button
          type="button"
          fullWidth
          variant="outlined"
          color="primary"
          onClick={() => socialLogin('facebook')}
        >
          <FontAwesomeIcon style={{ marginRight: '0.5em' }} icon={faFacebook} /> Login with Facebook
        </Button>
      </DialogActions>
      <DialogActions>
        <Button
          type="button"
          fullWidth
          variant="outlined"
          color="secondary"
          onClick={() => socialLogin('google')}
        >
         <FontAwesomeIcon style={{ marginRight: '0.5em' }} icon={faGoogle} /> Login with Google
      </Button>
      </DialogActions>
    </React.Fragment>
  )
}

export default SocialLogin;
