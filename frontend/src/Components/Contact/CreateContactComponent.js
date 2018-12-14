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
    let { name, last_name, favourite, phones } = values

    fetch(QUERIES.contact, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json',
        'Authorization': 'Bearer ' + this.props.auth.getAccessToken(),
      },
      body: JSON.stringify({ name, last_name, favourite, phones }),
    })
      .then(res => res.json())
      // .then(console.log)
      .then(data => {
        this.props.addContact(data.contact);
        data.contact.phones.forEach(phone => this.props.addPhone(phone));
        // let contact_id = data.contact.id;
        // values.phones.forEach(phone => {
        //   fetch(QUERIES.phone, {
        //     method: "POST",
        //     headers: {
        //       'Accept': 'application/json',
        //       'Content-type': 'application/json',
        //       'Authorization': 'Bearer ' + this.props.auth.getAccessToken(),
        //     },
        //     body: JSON.stringify({ phone, contact_id }),
        //   })
        //     .then(res => res.json())
        //     .then(data => this.props.addPhone(data.phone))
        //     .catch(console.log);
        // })
      })
      .catch(console.log);

    this.handleClose();
  }

  render() {
    const { classes } = this.props;

    return (
      <div>
        <Button
          color='secondary'
          variant='contained'
          onClick={this.handleOpen}
          className={classes.addButton}
          classes={{ label: classes.addButtonLabel }}
        >
          <AddIcon className={classes.addButtonIcon} /> Create contact
        </Button>
        <Dialog
          className={classes.size}
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Create new contact</DialogTitle>
          <Divider />
          <Formik
            initialValues={{ phones: [], name: '', last_name: '', favourite: 0 }}
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
                    name="last_name"
                    value={props.last_name}
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
    position: 'fixed',
    bottom: theme.spacing.unit * 4,
    right: theme.spacing.unit * 4,
    zIndex: 999,
  },
  addButton: {
    position: 'fixed',
    bottom: theme.spacing.unit * 4,
    right: theme.spacing.unit * 4,
    zIndex: 999,
    textTransform: 'none',
    borderRadius: 100,
    fontWeight: 600,
  },
  addButtonLabel: {
    paddingRight: theme.spacing.unit,
  },
  addButtonIcon: {
    width: '1.75em',
    height: '1.75em',
    paddingRight: theme.spacing.unit,
  },
  space: {
    margin: '0 5px',
  },
});

CreateContact.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CreateContact);
