import React from 'react';
import PropTypes from 'prop-types';
import AddIcon from '@material-ui/icons/Add';
import { PhoneCallback } from '@material-ui/icons'
import { Formik, Field } from 'formik';
import { QUERIES } from "../../querys";
import {
  Fab, Divider, Button, Dialog, DialogTitle, TextField,
  DialogContent, DialogActions, withStyles,
} from '@material-ui/core';
import { DynamicList } from '@ivanbeldad/dynamic-list';

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

    console.log('Valores desde el handleSubmit', values)

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
      // .then(console.log)
      .then(data => {
        this.props.addContact(data.contact);
        let contact_id = data.contact.id;
        values.phones.forEach(phone => {
          fetch(QUERIES.phone, {
            method: "POST",
            headers: {
              'Accept': 'application/json',
              'Content-type': 'application/json',
              'Authorization': 'Bearer ' + this.props.auth.getAccessToken(),
            },
            body: JSON.stringify({ phone, contact_id }),
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
          <Formik
            initialValues={{ phones: [], name: '', lastName: '', favourite: 0 }}
            // onSubmit={values => console.log('values')}
            onSubmit={this.handleSubmit}
            render={props => (
              <form>
                <DialogContent >
                  <Field
                    name="name"
                    value={props.name}
                    render={({ field }) => (
                      <TextField {...field} autoFocus margin="normal" label="Name" type="text" />
                    )}
                  />
                  <Field
                    name="lastName"
                    value={props.lastName}
                    render={({ field }) => (
                      <TextField {...field} margin="normal" label="Last Name" type="text" />
                    )}
                  />
                </DialogContent>
                <DynamicList
                  name='phones'
                  initialValue={{ phone: '', tag: '' }}
                  sectionIcon={<PhoneCallback />}
                  render={(fields) => {
                    const [phone, tag] = fields;
                    return (
                      <div>
                        <TextField {...phone} placeholder='Phone' />
                        <TextField {...tag} placeholder='Tag' />
                      </div>
                    )
                  }}
                />
                <DialogActions>
                  <Button onClick={this.handleClose} color="primary">Cancel</Button>
                  <Button type="submit" color="primary"onClick={props.handleSubmit}>Save</Button>
                </DialogActions>
              </form>
            )}
          />
          {/* <Formik
            initialValues={{ phones: [''], name: '', lastName: '', favourite: 0 }}
            onSubmit={values => this.handleSubmit(values)}
            render={({ values }) => (
              <Form>
                <DialogContent className={classes.dialog}>
                  <Field
                    name="name"
                    value={values.name}
                    render={({ field }) => (
                      <TextField className={classes.space} {...field} autoFocus margin="normal" label="Name" type="text" />
                    )}
                  />
                  <Field
                    name="lastName"
                    value={values.lastName}
                    render={({ field }) => (
                      <TextField className={classes.space} {...field} margin="normal" label="Last Name" type="text" />
                    )}
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
                              <RemoveCircle className={classes.margin} onClick={() => arrayHelpers.remove(index)} />
                              <AddIcon className={classes.margin} onClick={() => arrayHelpers.insert(index, '')} />
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
          /> */}
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
