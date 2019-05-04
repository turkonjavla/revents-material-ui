import React from 'react';

/* MUI Components */
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';

const SocialLogin = () => {
  return (
    <DialogActions style={{ marginBottom: '1em' }}>
      <Button
        type="submit"
        fullWidth
        variant="outlined"
        color="primary"
      >
        Login with Facebook
    </Button>
      <Button
        type="submit"
        fullWidth
        variant="outlined"
        color="secondary"
      >
        Login with Google
    </Button>
    </DialogActions>
  )
}

export default SocialLogin;
