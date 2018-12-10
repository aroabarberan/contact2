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
import LogoutComponent from "../LogoutComponent";
import ListItemCompositionContainer from '../../Containers/ListItemCompositionContainer';


class ContactComponent extends React.Component {

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

  isFavourite(favourite) {
    if (favourite) return <Starfilled color="primary" />
    return <StarBorder />
  }

  render() {
    const { classes } = this.props;
    const { isAuthenticated } = this.props.auth;
    const { contacts } = this.props.contacts;
    // console.log(this.props.auth.getAccessToken())
    return (
      <div>
        {!isAuthenticated() && (<LogoutComponent auth={this.props.auth} history={this.props.history} />)}
        {isAuthenticated() && (
          <main className={classes.content}>
            <Paper className={classes.paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Fav</TableCell>
                    <TableCell>Avatar</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Last Name</TableCell>
                    {/* <TableCell>Phone</TableCell> */}
                    <TableCell>Setting</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {contacts.map((contact, i) => {
                    return (
                      <TableRow key={i}>
                        <TableCell component="th" scope="row">
                          <div onClick={this.handleFavouriteClick(contact)} >{this.isFavourite(contact.favourite)}</div>
                        </TableCell>
                        <TableCell>
                          <Avatar className={classes.orangeAvatar}>
                            {contact.name !== '' ? contact.name[0].toUpperCase() : ''}
                          </Avatar>
                        </TableCell>
                        <TableCell>{contact.name}</TableCell>
                        <TableCell>{contact.lastName}</TableCell>
                        {/* <TableCell>{setTimeout(function(){ return contact.phones.length > 0 ? contact.phones[0].phone : contact.phones[0]}, 3000)}</TableCell> */}
                        {/* <TableCell>{contact.phones.length > 0 ? contact.phones[0].phone : contact.phones[0]}</TableCell> */}
                        <TableCell><ListItemCompositionContainer auth={this.props.auth} contact={contact} /></TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </Paper>
          </main>
        )}
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
    margin: '0 0 0 245px',
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
  },
  icon: {
    color: '#666'
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
})

ContactComponent.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
}

export default withStyles(styles, { withTheme: true })(ContactComponent)