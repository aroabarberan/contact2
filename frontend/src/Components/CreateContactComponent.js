import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AddIcon from '@material-ui/icons/Add';
// import { MySnackbarContentWrapper } from "../Components/SnackbarComponent";

import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';

import {
  Divider, Button, TextField, Dialog, DialogTitle,
  DialogActions, DialogContent, withStyles, DialogContentText
} from '@material-ui/core';

const url_addContact = 'http://localhost:3010/api/addContacts';

class CreateContact extends Component {
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

  handleChange = (evt) => {
    this.props.updateForm({
      name: this.props.form.create.name,
      phone: this.props.form.create.phone,
      favourite: 0,
      [evt.target.name]: evt.target.value
    });
  }

  submit = (evt) => {
    evt.preventDefault();
    const { name, phone, favourite } = this.props.form.create;
    const sub = this.props.auth.userProfile.sub;
    const token = this.props.auth.getAccessToken();
    const avatar = "";


    fetch(url_addContact, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json',
        'Authorization': 'Bearer ' + token,
      },
      body: JSON.stringify({ sub, avatar, name, phone, favourite }),
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
        <Button variant="fab" color="secondary" aria-label="Add"
          className={classes.absolute} onClick={this.handleOpen}>
          <AddIcon />
        </Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Create new contact</DialogTitle>
          <Divider />
          <DialogContent>
            <TextField
              autoFocus
              margin="normal"
              name="name"
              label="Name"
              type="text"
              onChange={this.handleChange}
            />
          </DialogContent>
          <DialogContent>
            <TextField
              margin="normal"
              name="phone"
              label="Phone"
              type="text"
              onChange={this.handleChange}
            />
          </DialogContent>
          <DialogContentText name="favourite" label="Favourite" type="text" onChange={this.handleChange} />
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">Cancel</Button>
            <Button onClick={this.submit} color="primary">Send</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
const styles = theme => ({
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
  },
  absolute: {
    position: 'absolute',
    // bottom: theme.spacing.unit * 2,
    bottom: theme.spacing.unit * 6,
    right: theme.spacing.unit * 1,
  },
});

CreateContact.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CreateContact);
