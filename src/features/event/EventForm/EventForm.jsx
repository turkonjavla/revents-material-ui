import React, { Component } from 'react';
import PropTypes from 'prop-types';

/* Material UI Components */
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Paper from '@material-ui/core/Paper';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = theme => ({
  paper: {
    padding: theme.spacing.unit * 3,
    textAlign: 'left',
    color: theme.palette.text.secondary
  }
});

class EventForm extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Paper className={classes.paper} style={{ position: 'relative' }}>
        <form>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="title">Event Title</InputLabel>
            <Input autoComplete="title" autoFocus />
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <Input type="datetime-local" />
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="city">City</InputLabel>
            <Input name="city" type="text" />
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="venue">Venue</InputLabel>
            <Input name="venue" type="text" />
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="hostedBy">Hosted By</InputLabel>
            <Input name="hostedBy" type="test" />
          </FormControl>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
          >
            Create Event
          </Button>
        </form>
      </Paper>
    )
  }
}

EventForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EventForm);