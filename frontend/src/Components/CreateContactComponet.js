import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AddIcon from '@material-ui/icons/Add';
// import { MySnackbarContentWrapper } from "../Components/SnackbarComponent";
import {
  Divider, Button, TextField,Dialog, DialogTitle, 
  DialogActions, DialogContent, withStyles, DialogContentText
} from '@material-ui/core';


class CreateContact extends Component {
  constructor() {
    super()
    this.state = {
      open: false,
    }
    this.handleChange = this.handleChange.bind(this)
    this.submit = this.submit.bind(this)
  }

  componentWillMount() {
    this.setState({ profile: {} });
    const { userProfile, getProfile } = this.props.auth;
    if (!userProfile) {
      getProfile((err, profile) => {
        this.setState({ profile });
      });
    } else {
      this.setState({ profile: userProfile });
    }
  }

  handleOpen = () => {
    this.setState({ open: true });
  }

  handleClose = () => {
    this.setState({ open: false });
  }

  handleChange(evt) {
    this.props.updateForm({
      name: this.props.form.create.name,
      phone: this.props.form.create.phone,
      favourite: false,
      [evt.target.name]: evt.target.value
    });
  }

  submit(evt) {
    evt.preventDefault();
    const { name, phone, favourite } = this.props.form.create;
    const sub = this.state.profile.sub;
    const token = this.props.auth.getAccessToken();

    fetch('http://localhost:3010/api/addContacts', {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json',
        'Authorization': 'Bearer ' + token,
      },
      body: JSON.stringify({ sub, name, phone, favourite }),
    })
      .then(res => res.text())
      .catch(console.log);

    this.props.addContact({ sub, name, phone, favourite });
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
