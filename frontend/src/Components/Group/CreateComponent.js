import React from 'react';
import { QUERIES } from "../../querys";
import { Formik, Form, Field } from "formik";

import {
  Divider, Button, Dialog, DialogTitle,
  DialogActions, DialogContent
} from '@material-ui/core';

const handleSubmit = (props) => (values, actions) => {

  // const sub = props.auth.userProfile.sub;
  const token = props.auth.getAccessToken();
  const formData = new FormData();
  formData.append('avatar', values.avatar)

  fetch(QUERIES.groups, {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + token,
    },
    body: formData,
  })
    // .then(res => res.json())
    .then(console.log)
    .catch(console.log);
}

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

  render() {
    return (
      <div>
        <Formik
          initialValues={{ name: '' }}
          onSubmit={handleSubmit(this.props)}
          render={({ values }) => (
            <Dialog
              open={this.state.open}
              onClose={this.handleClose}
              aria-labelledby="form-dialog-title"
            >
              <DialogTitle id="form-dialog-title">Create new group</DialogTitle>
              <Divider />

              <DialogContent>
                <Form>
                  <Field type="text" name="name" value={values.name} />
                </Form>
              </DialogContent>

              <DialogActions>
                <Button onClick={this.handleClose} color="primary">Cancel</Button>
                <Button onClick={this.submit} color="primary">Save</Button>

              </DialogActions>
            </Dialog>

          )}
        />
      </div>
    );
  }
}

export default CreateGroup
