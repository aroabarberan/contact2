import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import CreateContact from './CreateContactComponet';;

const styles = theme => ({
  absolute: {
    position: 'absolute',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 3,
  },
});

function ButtonAdd(props) {
  const { classes } = props;
  return (
    <div>
      <div>
        <Button variant="fab" color="secondary" aria-label="Add" className={classes.absolute}>
          <AddIcon />
        </Button>
        
      </div>
    </div>
  )
};

ButtonAdd.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ButtonAdd)