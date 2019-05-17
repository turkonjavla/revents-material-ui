import React from 'react';

/* MUI Components */
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'

const NotFound = (props) => {
  return (
    <div id="main">
      <Typography variant="h3" align="center" gutterBottom>
        404
    </Typography>
      <Typography variant="h6" align="center" style={{ marginTop: "1em" }}>
        Couldn't find the page you were looking for
      </Typography>
      <div style={{ width: "50%", margin: "0 auto", marginTop: "3em" }}>
        <Grid container spacing={8} align="center" >
          <Grid item xs={12}>
            <Button onClick={() => props.history.push('/events')} variant="outlined" color="primary">
              <ChevronLeftIcon /> Back to Events
            </Button>
          </Grid>
        </Grid>
      </div>
    </div>
  )
}

export default NotFound
