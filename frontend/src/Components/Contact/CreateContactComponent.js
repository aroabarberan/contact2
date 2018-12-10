import React from 'react';
import PropTypes from 'prop-types';
import AddIcon from '@material-ui/icons/Add';
import RemoveCircle from '@material-ui/icons/RemoveCircleOutline';
import { Formik, Form, Field, FieldArray } from 'formik';
import { QUERIES } from "../../querys";
import {
  Fab, Divider, Button, Dialog, DialogTitle, TextField,
  DialogActions, DialogContent, withStyles,
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

  handleSubmit = (values, actions) => {

    console.log(values)

    let { name, lastName, favourite } = values

    fetch(QUERIES.contact, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json',
        'Authorization': 'Bearer ' + this.props.auth.getAccessToken(),
      },
      body: JSON.stringify({ name, lastName, favourite }),
    })
      .then(res => res.json())
      .then(console.log)
      .then(data => {
        this.props.addContact(data.contact);
        let contact_id = data.contact.id;
        values.phones.map(phone => {
          fetch(QUERIES.phone, {
            method: "POST",
            headers: {
              'Accept': 'application/json',
              'Content-type': 'application/json',
              'Authorization': 'Bearer ' + this.props.auth.getAccessToken(),
            },
            body: JSON.stringify({phone, contact_id}),
          })
            .then(res => res.json())
            .then(console.log)
            .then(data => this.props.addPhone(data.phone))
            .catch(console.log);
        })
      })
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

          <Formik
            initialValues={{ phones: [''], name: '', lastName: '', favourite: 0 }}
            onSubmit={values => this.handleSubmit(values)}
            render={({ values }) => (
              <Form>
                <DialogContent className={classes.dialog}>
                  <Field
                    className={classes.space}
                    autoFocus
                    margin="normal"
                    name="name"
                    label="Name"
                    type="text"
                    value={values.name}
                  />
                  <Field
                    className={classes.space}
                    margin="normal"
                    name="lastName"
                    label="Last Name"
                    type="text"
                    value={values.lastName}
                  />
                </DialogContent>
                <DialogContent className={classes.dialog}>
                  <FieldArray
                    name="phones"
                    render={arrayHelpers => (
                      <div>
                        {values.phones && values.phones.length > 0 ? (
                          values.phones.map((phone, index) => (
                            <div key={index}>
                              <Field name={`phones.${index}`} />

                              <Fab size="small" color="primary"
                                className={classes.margin}
                                onClick={() => arrayHelpers.remove(index)}>
                                <RemoveCircle />
                              </Fab>

                              <Fab size="small" color="primary"
                                className={classes.margin}
                                onClick={() => arrayHelpers.insert(index, '')}>
                                <AddIcon />
                              </Fab>
                            </div>
                          ))
                        ) : (
                            <DialogActions>
                              <Button type="button" onClick={() => arrayHelpers.push('')}>
                                Add a Phone
                          </Button>
                            </DialogActions>
                          )}
                        <DialogActions>
                          <Button onClick={this.handleClose} color="primary">Cancel</Button>
                          <Button type="submit" color="primary" >Save</Button>
                        </DialogActions>
                      </div>
                    )}
                  />
                </DialogContent>
              </Form>
            )}
          />
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
    margin: '5px 5px',
  },
});

CreateContact.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CreateContact);
