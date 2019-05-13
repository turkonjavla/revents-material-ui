import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { combineValidators, isRequired } from 'revalidate';

/* MUI Components */
import ListItem from '@material-ui/core/ListItem';
import Button from '@material-ui/core/Button';
import ReplyIcon from '@material-ui/icons/Reply';

/* Components */
import TextInput from '../../../app/common/form/TextInput';

const validate = combineValidators({
  comment: isRequired({ message: 'Comment can\'t be empty' })
});

class EventDetailsChatForm extends Component {
  handleCommentSubmit = values => {
    const { addEventComment, eventId, reset, closeForm, parentId } = this.props;

    addEventComment(eventId, values, parentId);
    reset();

    if (parentId !== 0) {
      closeForm();
    }
  }

  render() {
    const { handleSubmit, invalid, submitting } = this.props;
    return (
      <form onSubmit={handleSubmit(this.handleCommentSubmit)}>
        <ListItem>
          <Field
            name="comment"
            type="text"
            component={TextInput}
            multiline={true}
            rows={2}
            label="Write a comment"
          />
        </ListItem>
        <ListItem>
          <Button disabled={invalid || submitting} type="submit" variant="outlined" size="small">
            <ReplyIcon />
            Reply
          </Button>
        </ListItem>
      </form>
    )
  }
}

export default reduxForm({ Fields: 'comment', validate })(EventDetailsChatForm);