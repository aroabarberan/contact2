import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Edit from '@material-ui/icons/Edit';
import Starfilled from "@material-ui/icons/Grade";
import StarBorder from "@material-ui/icons/StarBorder";
import ListItemComposition from '../Containers/ListItemCompositionContainer';
import {
  Paper, Divider, Button, TextField,
  Dialog, DialogTitle, DialogActions, DialogContent, withStyles
} from '@material-ui/core';

class Contact extends Component {
  constructor() {
    super()
    this.state = {
      open: false,
      favourite: false,
      contact: [],

      starFilled: <Starfilled color="primary" onClick={this.handleFavouriteClick} />,
      StarBorder: <StarBorder onClick={this.handleFavouriteClick} />,
    }
    this.handleFavouriteClick = this.handleFavouriteClick.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.submit = this.submit.bind(this)
  }
  handleFavouriteClick() {
    // if (this.) {
    //   this.setState({ favourite: false });

    // } else {
    //   this.setState({ favourite: true });
    // }
  }

  handleOpen = (contact) => {
    this.setState({ open: true, contact });
  }

  handleClose = () => {
    this.setState({ open: false });
  }

  handleChange(evt) {
    this.setState({ contact: { [evt.target.name]: evt.target.value } })
    this.props.updateForm({
      // name: this.state.contact.name,
      // phone: this.state.contact.phone,
      // favourite: this.state.contact.favourite,
      [evt.target.name]: evt.target.value
    });
    console.log(this.state)
  }

  submit(evt) {
    evt.preventDefault();
    console.log(this.props)
    // const sub = this.state.profile.sub;
    // const token = this.props.auth.getAccessToken();
    // api/contacts/{id}
    // const token = this.props.auth.getAccessToken();
    // const id = this.props.idContact;


    // fetch('http://localhost:3010/api/contacts/' + id, {
    //   method: "PUT",
    //   headers: {
    //     'Accept': 'application/json',
    //     'Content-type': 'application/json',
    //     'Authorization': 'Bearer ' + token,
    //   },
    //   // body: JSON.stringify({ sub, name, phone }),
    // })
    //   .then(res => res.text())
    //   .catch(console.log);

    // this.props.editContact(id, contact);
    this.handleClose();
  }
  render() {
    const { classes } = this.props;
    const { contacts } = this.props.contacts;

    // let contacts = [...this.props.contacts.contacts]
    // contacts.sort((a, b) => (a.favourite - b.favourite) ? 1 : 0)

    return (
      <div>
        <Paper className={classes.paper} elevation={1}>
          {contacts.map((contact, i) =>
            <div key={i}>
              <p>{contact.name} {contact.phone}</p>
              <ListItemComposition auth={this.props.auth} idContact={contact.id} />
              {/* {contact.favourite === 1 ? <Starfilled color="primary" onClick={this.handleFavouriteClick} /> : <StarBorder onClick={this.handleFavouriteClick} />} */}
              {contact.favourite === 1 ? this.state.starFilled : this.state.StarBorder}
              <Edit variant="fab" aria-label="Edit"
                className={classes.absolute} onClick={() => this.handleOpen(contact)} />
              <Divider />
            </div>
          )}
        </Paper>

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
              value={this.state.contact.name}
              onChange={this.handleChange}
            />
          </DialogContent>
          <DialogContent>
            <TextField
              margin="normal"
              name="phone"
              label="Phone"
              type="text"
              value={this.state.contact.phone}
              onChange={this.handleChange}
            />
          </DialogContent>
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
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
  title: {

  },
})


Contact.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
}

export default withStyles(styles, { withTheme: true })(Contact)