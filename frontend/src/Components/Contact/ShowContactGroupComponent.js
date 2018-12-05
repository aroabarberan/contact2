import React from 'react';
import PropTypes from 'prop-types';
import deepOrange from '@material-ui/core/colors/deepOrange';
import CircularProgress from '@material-ui/core/CircularProgress';
import { QUERIES } from "../../querys";
import Starfilled from "@material-ui/icons/Grade";
import StarBorder from "@material-ui/icons/StarBorder";
import {
  Table, TableBody, TableCell, TableHead, TableRow,
  Paper, Avatar, withStyles
} from '@material-ui/core';
import LogoutComponent from "../LogoutComponent";
import ListItemCompositionContainer from '../../Containers/ListItemCompositionContainer';


class ShowContactGroupComponent extends React.Component {

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
    const newContact = { id, sub, lastName, name, phone, favourite }

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
    const { group } = this.props.location.state;
    console.log('que grupito es', group)
    return (
      <div>
        <div>
          {!isAuthenticated() && (<LogoutComponent auth={this.props.auth} history={this.props.history} />)}
          {isAuthenticated() && (
            <main className={classes.content}>
              {group.length === 0 ? <CircularProgress disableShrink /> :
                <Paper className={classes.paper}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Fav</TableCell>
                        <TableCell>Avatar</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Last Name</TableCell>
                        <TableCell>Phone</TableCell>
                        <TableCell>Setting</TableCell>
                      </TableRow>
                    </TableHead>
                    {/* <TableBody>
                      {group.map((contact, i) => {
                        return (
                          <TableRow key={i}>
                            <TableCell component="th" scope="row">
                              <div onClick={this.handleFavouriteClick(contact)} >{this.isFavourite(contact.favourite)}</div>
                            </TableCell>
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
                    </TableBody> */}
                  </Table>
                </Paper>
              }
            </main>
          )}
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

ShowContactGroupComponent.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
}

export default withStyles(styles, { withTheme: true })(ShowContactGroupComponent)

