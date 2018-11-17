import React from 'react';
import PropTypes from 'prop-types';
import AddIcon from '@material-ui/icons/Add';
import { Button, withStyles } from '@material-ui/core';


function ButtonAdd(props) {
  const { classes } = props;
  return (
    <div>
      <Button
        variant="fab"
        color="secondary"
        aria-label="Add"
        className={classes.absolute}>
        <AddIcon />
      </Button>
    </div>
  )
};

const styles = theme => ({
  absolute: {
    position: 'absolute',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 3,
  },
});

ButtonAdd.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ButtonAdd)