import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  gridList: {
    flexWrap: 'nowrap',
    transform: 'translateZ(0)',
  }
});



class EventListAttendee extends Component {
  render() {
    const { classes } = this.props;

    const tileData = [
      {
        id: 1,
        img: 'https://randomuser.me/api/portraits/women/42.jpg',
        title: 'Image',
        author: 'author',
      },
      {
        id: 2,
        img: 'https://randomuser.me/api/portraits/women/43.jpg',
        title: 'Image',
        author: 'author',
      },
      {
        id: 3,
        img: 'https://randomuser.me/api/portraits/women/43.jpg',
        title: 'Image',
        author: 'author',
      },
      {
        id: 4,
        img: 'https://randomuser.me/api/portraits/women/43.jpg',
        title: 'Image',
        author: 'author',
      },
      {
        id: 5,
        img: 'https://randomuser.me/api/portraits/women/43.jpg',
        title: 'Image',
        author: 'author',
      }
    ];

    return (
      <div>
        <Typography align="left" variant="subtitle1" gutterBottom>
          Attendees
      </Typography>
        <GridList className={classes.gridList} cols={10}>
          {tileData.map(tile => (
            <img style={{ width: '50px', height: '50px' }} key={tile.id} src={tile.img} alt={tile.title} />
          ))}
        </GridList>
      </div>
    )
  }
}

EventListAttendee.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(EventListAttendee);