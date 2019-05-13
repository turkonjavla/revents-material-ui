import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import moment from 'moment';

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

/* Components */
import EventDetailsChatForm from './EventDetailsChatForm';

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

class EventDetailsChat extends Component {
  state = {
    showReplyForm: false,
    selectedCommentId: null
  }

  handleOpenReplyForm = id => () => {
    this.setState({
      showReplyForm: true,
      selectedCommentId: id
    })
  }

  handleCloseReplyForm = () => {
    this.setState({
      selectedCommentId: null,
      showReplyForm: false
    })
  }

  render() {
    const { classes, addEventComment, eventId, eventChat } = this.props;
    const { showReplyForm, selectedCommentId } = this.state;
    return (
      <Card style={{ marginBottom: '1em' }}>
        <List
          subheader={
            <ListSubheader>
              Chat about this event
            </ListSubheader>
          }
          className={classes.root}
        >
          {
            eventChat &&
            eventChat.map(comment => (
              <div key={comment.id}>
                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar component={Link} to={`/profile/${comment.uid}`} alt={comment.displayName} src={comment.photoURL || `/assets/user.png`} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={comment.text}
                    secondary={
                      <React.Fragment>
                        <Typography component="span" className={classes.inline} color="textPrimary">
                          {comment.displayName}
                        </Typography>
                        {
                          ` — ${moment(comment.date).fromNow()} `
                        }
                        <Button onClick={this.handleOpenReplyForm(comment.id)} size="small">Reply</Button>
                      </React.Fragment>
                    }
                  />
                </ListItem>
                {
                  showReplyForm &&
                  selectedCommentId === comment.id &&
                  (
                    <div style={{ width: '90%', marginLeft: '2em' }}>
                      <EventDetailsChatForm
                        addEventComment={addEventComment}
                        closeForm={this.handleCloseReplyForm}
                        parentId={comment.id}
                        eventId={eventId}
                        form={`reply_${comment.id}`}
                      />
                    </div>
                  )
                }
                {
                  comment.childNodes &&
                  comment.childNodes.map(child => (
                    <div style={{ marginLeft: '1.5em' }} key={child.id} >
                      <ListItem alignItems="flex-start">
                        <ListItemAvatar>
                          <Avatar component={Link} to={`/profile/${child.uid}`} alt={child.displayName} src={child.photoURL || `/assets/user.png`} />
                        </ListItemAvatar>
                        <ListItemText
                          primary={child.text}
                          secondary={
                            <React.Fragment>
                              <Typography component="span" className={classes.inline} color="textPrimary">
                                {child.displayName}
                              </Typography>
                              {
                                ` — ${moment(child.date).fromNow()} `
                              }
                              <Button onClick={this.handleOpenReplyForm(child.id)} size="small">Reply</Button>
                            </React.Fragment>
                          }
                        />
                      </ListItem>
                      {
                        showReplyForm &&
                        selectedCommentId === child.id &&
                        (
                          <div style={{ width: '90%', marginLeft: '2em' }}>
                            <EventDetailsChatForm
                              addEventComment={addEventComment}
                              closeForm={this.handleCloseReplyForm}
                              parentId={child.parentId}
                              eventId={eventId}
                              form={`reply_${child.id}`}
                            />
                          </div>
                        )
                      }
                    </div>
                  ))
                }
              </div>
            ))
          }
          <EventDetailsChatForm
            parentId={0}
            addEventComment={addEventComment}
            eventId={eventId}
            form={`newComment`}
          />
        </List>
      </Card>
    )
  }
}

EventDetailsChat.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EventDetailsChat);