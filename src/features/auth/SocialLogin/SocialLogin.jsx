import React from 'react';

/* MUI Components */
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';

const SocialLogin = () => {
  return (
    <React.Fragment>
      <DialogActions style={{ marginTop: '1em' }}>
        <Button
          type="submit"
          fullWidth
          variant="outlined"
          color="primary"
        >
          Login with Facebook
        </Button>
      </DialogActions>
      <DialogActions>
        <Button
          type="submit"
          fullWidth
          variant="outlined"
          color="secondary"
        >
          Login with Google
      </Button>
      </DialogActions>
    </React.Fragment>
  )
}

export default SocialLogin;
