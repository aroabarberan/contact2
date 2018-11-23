import React from 'react';
import PropTypes from 'prop-types';
import AddIcon from '@material-ui/icons/Add';
import { Formik, Form, Field } from 'formik';
import { QUERIES } from "../../querys";
import {
  Divider, Button, Dialog, DialogTitle,
  DialogActions, DialogContent, withStyles,
} from '@material-ui/core';
// import { MySnackbarContentWrapper } from "../Components/SnackbarComponent";



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
  handleFile = (setFieldValue) => (evt) => {
    setFieldValue("avatar", evt.currentTarget.files[0]);
  }

  handleSubmit = (values, actions) => {
    console.log(values)
  
    const token = this.props.auth.getAccessToken();
    const formData = new FormData();
  
    formData.append('avatar', values.avatar)
    formData.append('name', values.name)
    formData.append('phone', values.phone)
    formData.append('favourite', values.favourite)
  
    fetch(QUERIES.contact, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + token,
      },
      body: formData,
    })
      .then(res => res.json())
      .then(contact => this.props.addContact(contact))
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
          <Formik
            initialValues={{ name: '', avatar: null, favourite: 0 }}
            onSubmit={this.handleSubmit}
            render={({ values, setFieldValue }) => (
              <Form>
                <DialogContent>
                <label>Avatar</label>
                <input type='file' name='avatar' onChange={this.handleFile(setFieldValue)} />
                </DialogContent>
                <DialogContent>
                <label>Name</label>
                <Field type="text" name='name' value={values.name} />
                </DialogContent>
                <DialogActions>
                <button onClick={this.handleClose} color="primary">Cancel</button>
                <button type="submit" color="primary">Save</button>
                </DialogActions>
              </Form>
            )}
          />
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
});

CreateContact.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CreateContact);
