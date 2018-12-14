import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import { Avatar } from '@material-ui/core';
import { cyan, pink, blueGrey, red, purple, brown } from '@material-ui/core/colors';

const getColor = index => {
    const colors = [
      cyan[500], pink[500], blueGrey[500], red[500], purple[500], brown[500],
    ];
    if (index < colors.length) return colors[index];
    return colors[index % colors.length];
}

const CustomAvatar = ({ classes, name, index, color, backgroundColor }) => (
  <div className={classes.root}>
    <Avatar style={{ color: color || '#fff', background: backgroundColor || getColor(index) }}>
      {name.toUpperCase()[0]}
    </Avatar>
  </div>
)

const styles = theme => ({
  root: {
  }
})

CustomAvatar.propTypes = {
  classes: PropTypes.shape().isRequired,
  index: PropTypes.number,
  name: PropTypes.string.isRequired,
  backgroundColor: PropTypes.string,
  color: PropTypes.string,
}

CustomAvatar.defaultProps = {
  index: 0,
  backgroundColor: null,
  color: null,
}

export default withStyles(styles)(CustomAvatar)
