import React from 'react';
import { Link } from 'react-router-dom'

/* MUI Components */
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';

/* MUI Icons */
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';

const UserDetailsSidebar = ({ isCurrentUser, followUser, profile, isFollowing, unfollowUser }) => {
  return (
    <Card>
      <CardActions>
        {
          isCurrentUser &&
          (
            <Button
              component={Link}
              to="/settings"
              fullWidth
            >
              <EditIcon style={{ marginRight: '0.2em' }} />
              Edit Profile
            </Button>
          )
        }
        {
          !isCurrentUser &&
          !isFollowing &&
          (
            <Button
              variant="contained"
              color="primary"
              onClick={() => followUser(profile)}
              fullWidth
            >
              <AddIcon style={{ marginRight: '0.2em' }} />
              Follow
          </Button>
          )
        }
        {
          !isCurrentUser &&
          isFollowing &&
          (
            <Button
              onClick={() => unfollowUser(profile)}
              fullWidth
            >
              Unfollow
          </Button>
          )
        }
      </CardActions>
    </Card >
  )
}

export default UserDetailsSidebar;
