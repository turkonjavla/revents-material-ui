import React from 'react';
import Button from '@material-ui/core/Button';

const SignedOutLinks = ({ signIn, register }) => {
  return (
    <div>
      <Button onClick={signIn} style={{ marginRight: "5px"}} color="inherit">Sign In</Button>
      <Button onClick={register} variant="contained" color="secondary">Register</Button>
    </div>
  )
}

export default SignedOutLinks;
