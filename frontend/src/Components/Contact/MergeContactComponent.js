import React from 'react';
import PropTypes from 'prop-types';
import deepOrange from '@material-ui/core/colors/deepOrange';
import { QUERIES } from "../../querys";
import Starfilled from "@material-ui/icons/Grade";
import StarBorder from "@material-ui/icons/StarBorder";
import {
  Table, TableBody, TableCell, TableHead, TableRow,
  Paper, Avatar, withStyles
} from '@material-ui/core';
import ListItemCompositionContainer from '../../Containers/ListItemCompositionContainer';


class MergeComponent extends React.Component {

  count(contacts, contact) {
    var countContacts = [];
    for (var i = 0; i < contacts.length; i++) {
      if (contacts[i].name.toLowerCase() === contact.name &&
        contacts[i].lastName.toLowerCase() === contact.lastName) {
        countContacts.push(contact);
      }
    }
    return countContacts;
  }

  handleFavouriteClick = contact => evt => {
    evt.preventDefault();
    let favourite = null
    const { id, sub, lastName, name, phone } = contact;

    if (contact.favourite === 1) {
      favourite = 0;
    } else {
      favourite = 1;
    }
    const newContact = { id, lastName, name, phone, favourite }

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
    console.log(newContact)
  }

  isFavourite(favourite) {
    if (favourite) return <Starfilled color="primary" />
    return <StarBorder />
  }

  render() {
    const { classes } = this.props;
    const { isAuthenticated } = this.props.auth;
    const { contacts } = this.props.contacts;
    let duplicateContacts = [];
    let countContacts = [];

    contacts.forEach(contact => {
      countContacts = this.count(contacts, contact).length;

      if (countContacts > 1) {
        this.count(contacts, contact).forEach(c => {
          duplicateContacts[c.id] = c
        });
      }
    });

    return (
      <div>
        <div>
          <main className={classes.content}>
            {duplicateContacts.length === 0 ? <h2 className={classes.title}>There are no duplicate contacts</h2>:
            <Paper className={classes.paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    {/* <TableCell>Fav</TableCell> */}
                    <TableCell>Avatar</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Last Name</TableCell>
                    <TableCell>Phone</TableCell>
                    <TableCell>Setting</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {duplicateContacts.map((contact, i) => {
                    return (
                      <TableRow key={i}>
                        {/* <TableCell component="th" scope="row">
                          <div onClick={this.handleFavouriteClick(contact)} >{this.isFavourite(contact.favourite)}</div>
                        </TableCell> */}
                        <TableCell>
                          <Avatar className={classes.orangeAvatar}>{contact.name[0]}</Avatar>
                        </TableCell>
                        <TableCell>{contact.name}</TableCell>
                        <TableCell>{contact.lastName}</TableCell>
                        <TableCell>{contact.phone}</TableCell>
                        <TableCell><ListItemCompositionContainer auth={this.props.auth} contact={contact} /></TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </Paper>
            }
          </main>
        </div>
        {this.props.children}
      </div>
    );
  }
}

const styles = theme => ({
  root: {
    display: 'flex',
    color: '#666',
  },
  content: {
    margin: '0 0 0 245px',
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
  },
  row: {
    display: 'flex',
    justifyContent: 'center',
  },
  title: {
    color: '#666;',
    margin: '10px 10px',
    fontFamily: "Roboto, Arial, sans-serif"
  },
  paper: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    minWidth: '800px',
  },
  orangeAvatar: {
    color: '#fff',
    backgroundColor: deepOrange[500],
  },
});

MergeComponent.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
}

export default withStyles(styles, { withTheme: true })(MergeComponent)
