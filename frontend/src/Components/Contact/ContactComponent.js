import React, { Fragment } from 'react';
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
import AppComponent from '../AppComponent';


class ContactComponent extends React.Component {
  previewContact = contact => () => {
    // TODO: SHOW INFORMATION OF THE CONTACT
  }

  handleFavouriteClick = contact => evt => {
    evt.preventDefault();
    let favourite = null
    const { id, sub, last_name, name } = contact;

    if (contact.favourite === 1) {
      favourite = 0;
    } else {
      favourite = 1;
    }

    const newContact = { id, sub, last_name, name, favourite }

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
    const { classes, location, auth } = this.props;
    const { contacts } = this.props.contacts;

    let contactsToShow = [];

    if (location.pathname === '/') {
      contactsToShow = contacts;
    }

    contactsToShow = contacts;

    return (
      <Fragment>
        <AppComponent auth={auth} />
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
                            {contact.last_name}
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
      </Fragment>
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
