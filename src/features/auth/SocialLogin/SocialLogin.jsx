import React from 'react';

/* MUI Components */
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';

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
          Login with Facebook
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
          Login with Google
      </Button>
      </DialogActions>
    </React.Fragment>
  )
}

export default SocialLogin;
