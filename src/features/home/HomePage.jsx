import React from 'react';

/* Material UI Components */
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

const HomePage = ({ history: { push } }) => {
  return (
    <div id="main">
      <Typography variant="h3" align="center" gutterBottom>
        Revents
      </Typography>
      <Typography variant="h6" align="center" style={{ marginTop: "1em" }}>
        Share events with different people
        </Typography>
      <div style={{ width: "50%", margin: "0 auto", marginTop: "3em" }}>
        <Grid container spacing={8} align="center" >
          <Grid item xs={12}>
            <Button onClick={() => push('/events')} variant="outlined" color="primary">
              Go to Revents <ChevronRightIcon />
            </Button>
          </Grid>
        </Grid>
      </div>
    </div>
  )
}

export default HomePage
