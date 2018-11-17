import React from 'react';
import PropTypes from 'prop-types';
import AddIcon from '@material-ui/icons/Add';
// import { MySnackbarContentWrapper } from "../Components/SnackbarComponent";


import {
  Divider, Button, TextField, Dialog, DialogTitle,
  DialogActions, DialogContent, withStyles,
} from '@material-ui/core';

const url_addContact = 'http://localhost:3010/api/addContacts';

class CreateGroup extends React.Component {
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
      [evt.target.name]: evt.target.value
    });
  }

  submit = (evt) => {
    evt.preventDefault();
    const { name } = this.props.form.create;
    // const sub = this.props.auth.userProfile.sub;
    const token = this.props.auth.getAccessToken();

    fetch(url_addContact, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json  ',
        'Authorization': 'Bearer ' + token,
      },
      body: JSON.stringify({ name }),
    })
      .then(res => res.json())
      .then(console.log)
      .then(data => this.props.addGroup(data.group))
      .catch(console.log);
    this.handleClose();
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Create new group</DialogTitle>
          <Divider />

          <DialogContent>
            <TextField
              autoFocus
              margin="normal"
              name="group"
              label="Group"
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
  absolute: {
    position: 'absolute',
    bottom: theme.spacing.unit * 6,
    right: theme.spacing.unit * 1,
  },
});

CreateGroup.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CreateGroup);
