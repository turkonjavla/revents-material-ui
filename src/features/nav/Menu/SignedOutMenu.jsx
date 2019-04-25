import React from 'react';
import Button from '@material-ui/core/Button';

const SignedOutLinks = ({ signIn }) => {
  return (
    <div>
      <Button onClick={signIn} style={{ marginRight: "5px"}} color="inherit">Sign In</Button>
      <Button variant="contained" color="secondary">Register</Button>
    </div>
  )
}

export default SignedOutLinks;