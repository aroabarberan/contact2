import React from 'react';
import PropTypes from 'prop-types';
import AddIcon from '@material-ui/icons/Add';
import { Formik, Form, Field } from 'formik';
import { QUERIES } from "../../querys";
import {
  Divider, Button, Dialog, DialogTitle,
  DialogActions, DialogContent, withStyles, DialogContentText
} from '@material-ui/core';



const handleSubmit = (props) => (values, actions) => {
  console.log(values)

  const sub = props.auth.userProfile.sub;
  const token = props.auth.getAccessToken();
  const formData = new FormData();

  formData.append('sub', sub)
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
    .then(contact => props.addContact(contact))
    .catch(console.log);
    this.handleClose();
}

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
  render() {
    const { classes } = this.props;
    return (
      <div>
        <Button variant="fab" color="secondary" aria-label="Add"
          className={classes.absolute} onClick={this.handleOpen}>
          <AddIcon />
        </Button>

        <Formik
          initialValues={{ name: '', phone: '', avatar: null, favourite: 0 }}
          onSubmit={handleSubmit(this.props)}
          render={({ values, setFieldValue }) => (
            <Form>
              <Dialog
                open={this.state.open}
                onClose={this.handleClose}
                aria-labelledby="form-dialog-title"
              >
                <DialogTitle id="form-dialog-title">Create new contact</DialogTitle>
                <Divider />
                  <input type='file' name='avatar' onChange={this.handleFile(setFieldValue)} />

                  <Field type="text" name="name" value={values.name} />

                  <Field type="text" name="phone" value={values.phone} />

                  <button onClick={this.handleClose} color="primary">Cancel</button>
                  <button onClick={this.handleSubmit} color="primary" type="submit">Save</button>
              </Dialog>
            </Form>
          )}
        />
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
});

CreateContact.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CreateContact);
