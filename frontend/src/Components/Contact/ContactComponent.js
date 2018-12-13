import React from 'react';
import PropTypes from 'prop-types';
import { 
  deepOrange, pink, green, red, purple, deepPurple, 
  indigo, blue, teal, cyan, lime, amber, brown, grey, blueGrey
} from '@material-ui/core/colors';
import { QUERIES } from "../../querys";
import Starfilled from "@material-ui/icons/Grade";
import StarBorder from "@material-ui/icons/StarBorder";
import {
  Table, TableBody, TableCell, TableHead, TableRow,
  Paper, Avatar, withStyles
} from '@material-ui/core';
import ListItemCompositionContainer from '../../Containers/ListItemCompositionContainer';
import Form from "../DynamicListComponent";

function colorRandomAvatar() {
  const colors = [
    deepOrange[500], cyan[500], lime[500], amber[500], brown[500],
    pink[500], grey[500], blueGrey[500], green[500], red[500],
    purple[500], deepPurple[500], indigo[500], blue[500], teal[500],
  ]
  return colors[Math.floor((Math.random() * colors.length) + 1)];
}

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
      <div className={classes.grow}>
        <main className={classes.content}>
          <Paper>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell>Avatar</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Last Name</TableCell>
                  {/* <TableCell>Phone</TableCell> */}
                  <TableCell></TableCell>
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
                        <Avatar style={{ backgroundColor: colorRandomAvatar(), color: '#fff' }}>
                          {contact.name !== '' ? contact.name[0].toUpperCase() : ''}
                        </Avatar>
                      </TableCell>
                      <TableCell>{contact.name}</TableCell>
                      <TableCell>{contact.lastName}</TableCell>
                      {/* <TableCell>{contact.phones.length > 0 && ( contact.phones[0].phone)}</TableCell> */}
                      <TableCell><ListItemCompositionContainer auth={this.props.auth} contact={contact} /></TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </Paper>
          <Form />
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
    margin: '0 0 0 245px',
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    // padding: theme.spacing.unit * 3,
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
  avatar: {
    color: '#fff',
    // backgroundColor: deepOrange[500],
  },
})

ContactComponent.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
}

export default withStyles(styles, { withTheme: true })(ContactComponent)