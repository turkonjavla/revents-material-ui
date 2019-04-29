import React from 'react';
import PropTypes from 'prop-types';

/* MUI Components */
import { withStyles } from '@material-ui/core/styles';
import Card from "@material-ui/core/Card";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Button from '@material-ui/core/Button';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListSubheader from '@material-ui/core/ListSubheader';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import ReplyIcon from '@material-ui/icons/Reply';

const styles = theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
  },
});

const EventDetailsChat = ({ classes }) => {
  return (
    <Card style={{ marginBottom: '1em' }}>
      <List
        subheader={
          <ListSubheader>
            Chat about this event
          </ListSubheader>
        }
        className={classes.root}>
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar alt="Remy Sharp" src="/assets/user.png" />
          </ListItemAvatar>
          <ListItemText
            primary={
              `Phasellus pretium sed lacus in sagittis. Fusce lacus libero, euismod non lorem ut, 
            convallis tempor tortor. Morbi quis tellus vitae augue ultrices tincidunt id vel diam. 
            Sed vitae tempor tellus. Quisque laoreet, justo nec interdum fermentum, odio neque efficitur turpis, a mollis ligula orci in magna. 
            Suspendisse odio tellus, consequat at dapibus vitae, ultricies non nisl. Sed sodales tincidunt quam, id auctor velit vestibulum congue.`
            }
            secondary={
              <React.Fragment>
                <Typography component="span" className={classes.inline} color="textPrimary">
                  Ali Connor
              </Typography>
                {
                  ` — Today at 12:34 PM `
                }
                <Button size="small">Reply</Button>
              </React.Fragment>
            }
          />
        </ListItem>
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar alt="Remy Sharp" src="/assets/user.png" />
          </ListItemAvatar>
          <ListItemText
            primary={
              `Phasellus pretium sed lacus in sagittis. Fusce lacus libero, euismod non lorem ut, 
            convallis tempor tortor. Morbi quis tellus vitae augue ultrices tincidunt id vel diam. 
            Sed vitae tempor tellus.`
            }
            secondary={
              <React.Fragment>
                <Typography component="span" className={classes.inline} color="textPrimary">
                  Ali Connor
              </Typography>
                {
                  ` — Today at 12:34 PM `
                }
                <Button size="small">Reply</Button>
              </React.Fragment>
            }
          />
        </ListItem>

        {/* Nested List - Replies */}

        <List
          className={classes.root}
          style={{ marginLeft: '1.5em' }}
        >
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar alt="Remy Sharp" src="/assets/user.png" />
            </ListItemAvatar>
            <ListItemText
              primary={
                `Phasellus pretium sed lacus in sagittis. Fusce lacus libero, euismod non lorem ut, 
            convallis tempor tortor. Morbi quis tellus vitae augue ultrices tincidunt id vel diam. 
            Sed vitae tempor tellus.`
              }
              secondary={
                <React.Fragment>
                  <Typography component="span" className={classes.inline} color="textPrimary">
                    Ali Connor
              </Typography>
                  {
                    ` — Just now`
                  }
                </React.Fragment>
              }
            />
          </ListItem>
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar alt="Remy Sharp" src="/assets/user.png" />
            </ListItemAvatar>
            <ListItemText
              primary={
                `Phasellus pretium sed lacus in sagittis. Fusce lacus libero, euismod non lorem ut, 
            convallis tempor tortor. Morbi quis tellus vitae augue ultrices tincidunt id vel diam. 
            Sed vitae tempor tellus.`
              }
              secondary={
                <React.Fragment>
                  <Typography component="span" className={classes.inline} color="textPrimary">
                    Ali Connor
              </Typography>
                  {
                    ` — Just now`
                  }
                </React.Fragment>
              }
            />
          </ListItem>
        </List>

        {/* End of nested list */}

        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar alt="Remy Sharp" src="/assets/user.png" />
          </ListItemAvatar>
          <ListItemText
            primary={
              `Sed vitae tempor tellus. Quisque laoreet, justo nec interdum fermentum, odio neque efficitur turpis, a mollis ligula orci in magna. 
            Sed porta dolor fringilla metus fringilla, quis pretium enim egestas. Phasellus quis ultricies felis.
            Suspendisse odio tellus, consequat at dapibus vitae, ultricies non nisl. Sed sodales tincidunt quam, id auctor velit vestibulum congue.`
            }
            secondary={
              <React.Fragment>
                <Typography component="span" className={classes.inline} color="textPrimary">
                  Ali Connor
              </Typography>
                {
                  ` — Today at 12:34 PM `
                }
                <Button size="small">Reply</Button>
              </React.Fragment>
            }
          />
        </ListItem>
        <ListItem>

          <TextField
            label="Write a reply"
            multiline
            rows="4"
            style={{ width: '100%' }}
            margin="normal"
          />
        </ListItem>
        <ListItem>
          <Button variant="outlined" size="medium" className={classes.button}>
            <ReplyIcon />
            Reply
          </Button>
        </ListItem>
      </List>
    </Card>
  )
}

EventDetailsChat.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EventDetailsChat);