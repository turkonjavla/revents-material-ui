import React from 'react';
import PropTypes from 'prop-types';

/* MUI Components */
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = theme => ({
  progress: {
    margin: theme.spacing.unit * 2,
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
});

const LoadingComponent = ({ classes }) => {
  return (
    <div>
      <CircularProgress className={classes.progress} color="primary" />
    </div>
  )
}

LoadingComponent.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(LoadingComponent);
