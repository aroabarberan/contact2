import React from 'react';
import PropTypes from 'prop-types';
import AddIcon from '@material-ui/icons/Add';
import { QUERIES } from "../../querys";
import {
  Divider, Button, Dialog, DialogTitle, withStyles,
} from '@material-ui/core';
import ContactFormContainer from '../../Containers/Contact/ContactFormContainer';

class CreateContact extends React.Component {
  constructor() {
    super()
    this.state = {
      open: false,
    }
  }

  handleOpen = () => {
    this.setState({ open: true });
  }

  handleClose = () => {
    this.setState({ open: false });
  }

  handleSubmit = (values, actions) => {
    let {
      phones, emails, notes, name, last_name, favourite,
      second_name, second_last_name, nickname,
      direction, city, province, job,
    } = values

    fetch(QUERIES.contact, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json',
        'Authorization': 'Bearer ' + this.props.auth.getAccessToken(),
      },
      body: JSON.stringify({
        name, last_name, favourite, second_name, second_last_name,
        nickname, direction, city, province, job, phones, emails, notes
      }),
    })
      .then(res => res.json())
      .then(data => this.props.addContact(data.contact))
      .catch(console.log);

    this.handleClose();
  }

  render() {
    const { classes, auth } = this.props;

    return (
      <div>
        <Button
          color='secondary'
          variant='contained'
          onClick={this.handleOpen}
          className={classes.addButton}
          classes={{ label: classes.addButtonLabel }}
        >
          <AddIcon className={classes.addButtonIcon} /> Create contact
        </Button>
        <Dialog
          className={classes.size}
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Create new contact</DialogTitle>
          <Divider />
          <ContactFormContainer auth={auth} handleClose={this.handleClose} />
        </Dialog>
      </div>
    );
  }
}

const styles = theme => ({
  addButton: {
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
    paddingRight: theme.spacing.unit,
  },
});

CreateContact.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CreateContact);
