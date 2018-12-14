import React from 'react';
import PropTypes from 'prop-types';
import { QUERIES } from "../../querys";
import Starfilled from "@material-ui/icons/Grade";
import StarBorder from "@material-ui/icons/StarBorder";
import {
  Table, TableBody, TableCell, TableHead, TableRow,
  Paper, withStyles, IconButton
} from '@material-ui/core';
import ListItemCompositionContainer from '../../Containers/ListItemCompositionContainer';
import CustomAvatar from '../CustomAvatar';


class ContactComponent extends React.Component {

  componentWillMount() {
    if (this.props.contacts.contacts.length === 0) {
      fetch(QUERIES.contact, {
        method: "GET",
        headers: {
          'Accept': 'application/json',
          'Content-type': 'application/json',
          'Authorization': 'Bearer ' + this.props.auth.getAccessToken(),
        },
      })
        .then(res => res.json())
        .then(contacts => contacts.map(contact => this.props.addContact(contact)))
        .catch(console.log)
    }
  }

  previewContact = contact => () => {
    // TODO: SHOW INFORMATION OF THE CONTACT
  }

  count(contacts, contact) {
    var countContacts = [];
    for (var i = 0; i < contacts.length; i++) {
      if (contacts[i].name === contact.name &&
        contacts[i].lastName === contact.lastName) {
        countContacts.push(contact);
      }
    }
    return countContacts;
  }

  handleFavouriteClick = contact => evt => {
    evt.preventDefault();
    let favourite = null
    const { id, sub, lastName, name } = contact;

    if (contact.favourite === 1) {
      favourite = 0;
    } else {
      favourite = 1;
    }

    const newContact = { id, sub, lastName, name, favourite }

    fetch(QUERIES.contact + contact.id, {
      method: "PUT",
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json',
        'Authorization': 'Bearer ' + this.props.auth.getAccessToken(),
      },
      body: JSON.stringify(newContact, contact.id),
    })
      .then(res => res.json())
      .then(console.log)
      .catch(console.log);
    this.props.editContact(contact.id, newContact);
  }

  render() {
    const { classes, location } = this.props;
    const { contacts } = this.props.contacts;
    const { groups } = this.props.groups;

    let contactsToShow = [];

    if (location.pathname === '/contacts') {
      contactsToShow = contacts;
    }

    if (location.pathname === '/favourite') {
      contactsToShow = this.props.contacts.contacts
      .filter(contact => contact.favourite === 1)
    }

    if (location.pathname === '/merge') {
      let countContacts = [];

      contacts.forEach(contact => {
        countContacts = this.count(contacts, contact).length;

        if (countContacts > 1) {
          this.count(contacts, contact).forEach(c => {
            contactsToShow[c.id] = c
          });
        }
      });
    }
    groups.forEach(g => {
      if (location.pathname === '/group/'+ g.name) {
        contactsToShow = this.props.location.state.group.contacts;
      }
    });


    return (
      <div className={classes.grow}>
        <main className={classes.content}>
          {contacts.length !== 0 && (
            <Paper elevation={0}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell className={classes.firstShrink}></TableCell>
                    <TableCell className={classes.shrink}>Avatar</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Last Name</TableCell>
                    <TableCell>Phone</TableCell>
                    <TableCell className={classes.shrink}></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {contactsToShow.map((contact, i) => {
                    return (
                      <TableRow key={i} hover>
                        <TableCell component="th" scope="row" className={classes.firstShrink}>
                          <IconButton onClick={this.handleFavouriteClick(contact)}>
                            {contact.favourite ? <Starfilled style={{ color: '#fbc02d' }} /> : <StarBorder />}
                          </IconButton>
                        </TableCell>
                        <TableCell className={classes.shrink + ' ' + classes.clickable} onClick={this.previewContac}>
                          <CustomAvatar index={i} name={contact.name} />
                        </TableCell>
                        <TableCell className={classes.clickable} onClick={this.previewContac}>
                          {contact.name}
                        </TableCell>
                        <TableCell className={classes.clickable} onClick={this.previewContact}>
                          {contact.lastName}
                        </TableCell>
                        <TableCell className={classes.clickable} onClick={this.previewContact}>
                          {contact.phones && contact.phones.length > 0 && (contact.phones[0].phone)}
                        </TableCell>
                        <TableCell className={classes.shrink} numeric>
                          <ListItemCompositionContainer auth={this.props.auth} contact={contact} />
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </Paper>
          )}
        </main>
      </div>
    );
  }
}

const styles = theme => ({
  root: {
    display: 'flex',
    color: '#666',
  },
  toolbar: theme.mixins.toolbar,
  content: {
    margin: '0 0 0 240px',
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
  },
  icon: {
    color: '#666'
  },
  grow: {
    flexGrow: 1,
  },
  row: {
    display: 'flex',
    justifyContent: 'center',
  },
  firstShrink: {
    paddingRight: 0,
  },
  shrink: {
    paddingLeft: 0,
    paddingRight: 0,
  },
  clickable: {
    '&:hover': {
      cursor: 'pointer',
    },
  },
})

ContactComponent.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
}

export default withStyles(styles, { withTheme: true })(ContactComponent)
