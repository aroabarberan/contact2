import React from 'react';
import PropTypes from 'prop-types';
import AddIcon from '@material-ui/icons/Add';
import { QUERIES } from "../../querys";
import {
  Fab, Divider, Button, Dialog, DialogTitle, TextField,
  DialogActions, DialogContent, withStyles,
} from '@material-ui/core';
import ReactPhoneInput from "material-ui-phone-number";

class CreateContact extends React.Component {
  constructor() {
    super()
    this.state = {
      open: false,
      openSnack: false,
    }
  }
  handleChangePhone = (evt) => {
    this.props.updateForm({
      phone:evt
    });
  }
  handleOpen = () => {
    this.setState({ open: true });
  }

  handleClose = () => {
    this.setState({ open: false });
  }

  handleChange = (evt) => {
    this.props.updateForm({
      name: this.props.form.create.name,
      lastName: this.props.form.create.lastName,
      phone: this.props.form.create.phone,
      [evt.target.name]: evt.target.value
    });
  }

  handleClick = () => {
    this.setState({ openSnack: true });
  };

  handleCloseSnack = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({ open: false });
  };

  submit = (evt) => {
    evt.preventDefault();
    this.handleClick();
    const { name, lastName, phone } = this.props.form.create;
    const favourite = 0;

    fetch(QUERIES.contact, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json',
        'Authorization': 'Bearer ' + this.props.auth.getAccessToken(),
      },
      body: JSON.stringify({ name, lastName, phone, favourite }),
    })
      .then(res => res.json())
      .then(data => this.props.addContact(data.contact))
      .catch(console.log);
    this.handleClose();
  }

  render() {
    const { classes } = this.props;

    return (
      <div>
        <Fab color="secondary" aria-label="Add"
          className={classes.buttonAdd} onClick={this.handleOpen}>
          <AddIcon />
        </Fab>
        <Dialog
          className={classes.size}
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Create new contact</DialogTitle>
          <Divider />
          <DialogContent>
          </DialogContent>
          <DialogContent className={classes.dialog}>
            <TextField
              className={classes.space}
              autoFocus
              margin="normal"
              name="name"
              label="Name"
              type="text"
              onChange={this.handleChange}
            />
            <TextField
              className={classes.space}
              margin="normal"
              name="lastName"
              label="Last Name"
              type="text"
              onChange={this.handleChange}
            />
          </DialogContent>
          <DialogContent>

          </DialogContent>
          <DialogContent>
            <ReactPhoneInput
              onChange={this.handleChangePhone}
              name={"phone"}
              // localization={{ 'Germany': 'Deutschland', 'Spain': 'España' }}
              defaultCountry={'es'}
              regions={'europe'}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">Cancel</Button>
            <Button onClick={this.submit} color="primary">Save</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
const styles = theme => ({
  dialog: {
    width: '600px',
  },
  buttonAdd: {
    position: 'absolute',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 3,
  },
  space: {
    margin: '0 5px',
  },
});

CreateContact.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CreateContact);
