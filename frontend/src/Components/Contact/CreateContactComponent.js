import React from 'react';
import PropTypes from 'prop-types';
import AddIcon from '@material-ui/icons/Add';
import {
  Divider, Button, Dialog, DialogTitle, withStyles, Hidden, Fab,
} from '@material-ui/core';
import ContactFormContainer from '../../Containers/Contact/ContactFormContainer';
import { green } from '@material-ui/core/colors'
import ContactFormWrapperComponent from './ContactFormWrapperComponent';

class CreateContact extends React.Component {
  state = {
    open: false,
  }

  handleOpen = () => { this.setState({ open: true }); }
  handleClose = () => { this.setState({ open: false }); }

  render() {
    const { classes, auth } = this.props;

    return (
      <div>
        <Hidden mdUp>
          <Fab
          color='secondary'
          onClick={this.handleOpen}
          className={classes.addButtonMobile}
          >
            <AddIcon />
          </Fab>
        </Hidden>

        <Hidden smDown>
          <Button
            color='secondary'
            variant='contained'
            onClick={this.handleOpen}
            className={classes.addButton}
            classes={{ label: classes.addButtonLabel }}
          >
            <AddIcon className={classes.addButtonIcon} /> Create contact
          </Button>
        </Hidden>

        <Hidden mdUp>
          <Dialog
            fullScreen
            className={classes.size}
            open={this.state.open}
            onClose={this.handleClose}
            aria-labelledby="scroll-dialog-title"
            scroll='paper'
          >
            <ContactFormWrapperComponent
              title='Create new Contact'
              auth={auth}
              handleClose={this.handleClose}
            />
          </Dialog>
        </Hidden>
        <Hidden smDown>
          <Dialog
            className={classes.size}
            open={this.state.open}
            onClose={this.handleClose}
            aria-labelledby="scroll-dialog-title"
            scroll='paper'
          >
            <ContactFormWrapperComponent
              title='Create new Contact'
              auth={auth}
              handleClose={this.handleClose}
            />
          </Dialog>
        </Hidden>
      </div>
    );
  }
}

const styles = theme => ({
  addButtonMobile: {
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[600],
    },
    position: 'fixed',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2,
    zIndex: 999,
  },
  addButton: {
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[600],
    },
    position: 'fixed',
    bottom: theme.spacing.unit * 4,
    right: theme.spacing.unit * 4,
    zIndex: 999,
    textTransform: 'none',
    borderRadius: 100,
    fontWeight: 600,
  },
  addButtonLabel: {
    paddingRight: theme.spacing.unit,

  },
  addButtonIcon: {
    width: '1.75em',
    height: '1.75em',
    padding: 0,
    paddingRight: theme.spacing.unit,
  },
});

CreateContact.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CreateContact);
