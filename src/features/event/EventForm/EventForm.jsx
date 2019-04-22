import React, { Component } from 'react';
import PropTypes from 'prop-types';

/* Material UI Components */
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Paper from '@material-ui/core/Paper';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: 30,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
});

class EventForm extends Component {
  render() {
    const { classes } = this.props;
    return (
      <main className={classes.main}>
        <Button variant='contained' color="primary">Create</Button>
        <CssBaseline />
        <Paper className={classes.paper}>
          <form className={classes.form}>
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
              className={classes.submit}
            >
              Create Event
          </Button>
          </form>
        </Paper>
      </main>
    )
  }
}

EventForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EventForm);