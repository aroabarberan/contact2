import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Avatar from '@material-ui/core/Avatar'

class ImageAvatars extends Component {

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.row}>
        <Avatar alt="Remy Sharp"
          src={this.props.image} 
          className={classes.avatar} />
      </div>
    )
  }
}

const styles = {
  row: {
    display: 'flex',
    justifyContent: 'center',
  },
  avatar: {
    margin: 10,
  },
}

ImageAvatars.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(ImageAvatars);