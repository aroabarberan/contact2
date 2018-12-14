import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { QUERIES } from "../../querys";
import Starfilled from "@material-ui/icons/Grade";
import StarBorder from "@material-ui/icons/StarBorder";
import {
  Table, TableBody, TableCell, TableHead, TableRow,
  Paper, withStyles, IconButton, Typography, Divider, DialogTitle, Dialog
} from '@material-ui/core';
import ListItemCompositionContainer from '../../Containers/ListItemCompositionContainer';
import CustomAvatar from '../CustomAvatar';
import AppComponent from '../AppComponent';
import ContactFormContainer from '../../Containers/Contact/ContactFormContainer';


class ContactComponent extends React.Component {
  state = {
    open: false,
    previewContact: {
      phones: [],
      emails: [],
      notes: [],
    },
  }

  handleOpenPreview = contact => () => {
    this.setState({ previewContact: contact, open: true });
  }
  handleClosePreview = () => { this.setState({ open: false }); }

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
    this.props.editContact(newContact);
  }

  render() {
    const { classes, auth, contacts } = this.props;
    const { previewContact } = this.state;

    let contactsToShow = contacts;

    return (
      <Fragment>
        <AppComponent auth={auth} />
        <div className={classes.grow}>
          <main className={classes.content}>
            {contacts.length !== 0 && (
              <Paper elevation={0} className={classes.paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell className={`${classes.firstShrink} ${classes.centered}`}>
                      </TableCell>
                      <TableCell className={`${classes.shrink} ${classes.centered}`}>
                        Avatar
                      </TableCell>
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
                          <TableCell component="th" scope="row"
                            className={`${classes.firstShrink} ${classes.centered}`}>
                            <IconButton onClick={this.handleFavouriteClick(contact)}>
                              {contact.favourite ? <Starfilled style={{ color: '#fbc02d' }} /> : <StarBorder />}
                            </IconButton>
                          </TableCell>
                          <TableCell
                            className={`${classes.shrink} ${classes.clickable} ${classes.centered}`}
                            onClick={this.handleOpenPreview(contact)}>
                            <div className={classes.avatar}>
                              <CustomAvatar index={i} name={contact.name} />
                            </div>
                          </TableCell>
                          <TableCell
                            className={classes.clickable}
                            onClick={this.handleOpenPreview(contact)}
                          >
                            {contact.name}
                          </TableCell>
                          <TableCell
                            className={classes.clickable}
                            onClick={this.handleOpenPreview(contact)}
                          >
                            {contact.last_name}
                          </TableCell>
                          <TableCell
                            className={classes.clickable}
                            onClick={this.handleOpenPreview(contact)}
                          >
                            {contact.phones && contact.phones.length > 0 && (contact.phones[0].phone)}
                          </TableCell>
                          <TableCell className={classes.shrink} numeric>
                            <ListItemCompositionContainer
                              auth={this.props.auth}
                              contact={contact}
                            />
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </Paper>
            )}
            <section className={classes.footer}>
              <Typography variant='h6'>
                Developed by Aroa Barberan
              </Typography>
            </section>
          </main>
        </div>
        <Dialog
          className={classes.size}
          open={this.state.open}
          onClose={this.handleClosePreview}
          aria-labelledby="scroll-preview-title"
          scroll='paper'
        >
          <DialogTitle id="scroll-preview-title">Preview Contact</DialogTitle>
          <Divider />
          <ContactFormContainer
            auth={auth}
            handleClose={this.handleClosePreview}
            contact={previewContact}
            preview
          />
        </Dialog>
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
    display: 'flex',
    flexDirection: 'column',
    margin: '0 0 0 240px',
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
  },
  icon: {
    color: '#666'
  },
  grow: {
    display: 'flex',
    flexGrow: 1,
  },
  row: {
    display: 'flex',
    justifyContent: 'center',
  },
  firstShrink: {
    width: 1,
    paddingRight: 8,
  },
  centered: {
    textAlign: 'center',
  },
  avatar: {
    display: 'flex',
    justifyContent: 'center',
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
  paper: {
    flexGrow: 1,
  },
  footer: {
    borderTop: `1px solid ${theme.palette.divider}`,
    padding: theme.spacing.unit * 5,
    fontSize: theme.typography.fontSize,
    textAlign: 'center',
  }
})

ContactComponent.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
}

export default withStyles(styles, { withTheme: true })(ContactComponent)
