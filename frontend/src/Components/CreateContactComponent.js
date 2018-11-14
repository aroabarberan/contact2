import React from 'react';
import PropTypes from 'prop-types';
import AddIcon from '@material-ui/icons/Add';
import { QUERY } from "../querys";
// import { MySnackbarContentWrapper } from "../Components/SnackbarComponent";


import {
  Divider, Button, TextField, Dialog, DialogTitle,
  DialogActions, DialogContent, withStyles, DialogContentText
} from '@material-ui/core';


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

  changeAvatar = evt => {
    let files = evt.target.files || evt.dataTransfer.files;
    if (!files.length)
      return;
    this.createImage(files[0]);
  }

  createImage = file => {
    let reader = new FileReader();
    reader.onload = (evt) => {
      this.props.updateForm({
        avatar: evt.target.result
      });
    };
    reader.readAsDataURL(file);
  }

  handleChange = (evt) => {
    this.props.updateForm({
      avatar: this.props.form.create.avatar,
      name: this.props.form.create.name,
      phone: this.props.form.create.phone,
      favourite: 0,
      [evt.target.name]: evt.target.value
    });
  }

  submit = (evt) => {
    evt.preventDefault();
    const { avatar, name, phone, favourite } = this.props.form.create;
    const sub = this.props.auth.userProfile.sub;
    const token = this.props.auth.getAccessToken();

    // var formData = new FormData();
    // formData.append("avatar",avatar);
 
    fetch(QUERY.contact, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-type': 'multipart/form-data',
        'Authorization': 'Bearer ' + token,
      },
      body: JSON.stringify({ sub, avatar, name, phone, favourite }),
      // body: formData,
    })
      .then(res => res.json())
      .then(console.log)
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
              margin="normal"
              name="avatar"
              label="Avatar"
              type="file"
              onChange={this.changeAvatar}
            />
          </DialogContent>
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
            <Button onClick={this.submit} color="primary">Save</Button>
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
