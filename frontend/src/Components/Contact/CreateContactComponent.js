import React from 'react';
import PropTypes from 'prop-types';
import AddIcon from '@material-ui/icons/Add';
import Snackbar from '@material-ui/core/Snackbar';
import { QUERIES } from "../../querys";
import {
  Divider, Button, Dialog, DialogTitle, TextField,
  DialogActions, DialogContent, withStyles,
} from '@material-ui/core';
import MySnackbarContentWrapper from "../SnackbarComponent";

class CreateContact extends React.Component {
  constructor() {
    super()
    this.state = {
      open: false,
      openSnack: false,
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
    const { classes } = this.props;

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
      .then(data => {
        if (data.code === 201) {
          return (
            <div>
              {/* <Button>
              <MySnackbarContentWrapper
                onClose={this.handleClose}
                variant="success"
                message="This is a success message!"
              />
              </Button> */}
            </div>
          )
        }
        this.props.addContact(data.contact)
      })
      .catch(console.log);
    this.handleClose();
  }

  render() {
    const { classes } = this.props;

    return (
      <div>

        <Button variant="fab" color="secondary" aria-label="Add"
          className={classes.buttonAdd} onClick={this.handleOpen}>
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
              name="lastName"
              label="Last Name"
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
  buttonAdd: {
    position: 'absolute',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 3,
  },
  margin: {
    margin: theme.spacing.unit,
  },
});

CreateContact.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CreateContact);
