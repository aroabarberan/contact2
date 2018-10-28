import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DeleteIcon from '@material-ui/icons/Delete';
import { Divider, withStyles } from '@material-ui/core';

import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import MenuList from '@material-ui/core/MenuList';
import Paper from '@material-ui/core/Paper';

import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import BorderColor from '@material-ui/icons/BorderColor';


const url_getContact = 'http://localhost:3010/api/contacts';
const url_deleteContact = 'http://localhost:3010/api/contacts/';


class Contact extends Component {
  constructor() {
    super()
    this.state = {
      anchorEl: null,
    };
    this.deleteContact = this.deleteContact.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }
  componentWillMount() {
    this.setState({ profile: {} });

    const { userProfile, getProfile } = this.props.auth;
    if (!userProfile) {
      getProfile((err, profile) => {
        this.setState({ profile });
        const { getAccessToken } = this.props.auth;

        fetch(url_getContact,
          {
            method: "POST",
            headers: {
              'Accept': 'application/json',
              'Content-type': 'application/json',
              'Authorization': 'Bearer ' + getAccessToken(),
            },
            body: JSON.stringify({ sub: this.state.profile.sub }),
          })
          .then(res => res.json())
          .then(contacts => contacts.map(contact => this.props.addContact(contact)))
          .catch(console.log)
      });

    } else {
      this.setState({ profile: userProfile });
    }
  }

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  deleteContact(id) {
    return () => {
      fetch(url_deleteContact + id, { method: "DELETE" })
        .catch('Se ha cometido un errorcito');
      this.props.deleteContact(id);
    }
  }

  render() {
    const { classes } = this.props;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);

    return (
      <div>
        {this.props.contacts.contacts.map((contact, i) =>
          <div key={i}>
            <p>Name: {contact.name} Phone: {contact.phone}</p>
            <BorderColor />
            <DeleteIcon onClick={this.deleteContact(contact.id)} className={classes.icon} />

            <IconButton
              aria-label="More"
              aria-owns={open ? 'long-menu' : undefined}
              aria-haspopup="true"
              onClick={this.handleClick}
            >
              <MoreVertIcon />
            </IconButton>
            <Menu
              id="long-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={this.handleClose}
              PaperProps={{
                style: {
                  maxHeight: ITEM_HEIGHT * 4.5,
                  width: 200,
                },
              }}
            >
              <Paper>
                <MenuList>

                  <MenuItem className={classes.menuItem}>
                    <ListItemIcon className={classes.icon}>
                      <SendIcon />
                    </ListItemIcon>
                    <ListItemText classes={{ primary: classes.primary }} inset primary="Export" />
                  </MenuItem>

                  <MenuItem className={classes.menuItem}>
                    <ListItemIcon className={classes.icon}>
                      <DraftsIcon />
                    </ListItemIcon>
                    <ListItemText classes={{ primary: classes.primary }} inset primary="Delete" />
                  </MenuItem>

                  <MenuItem className={classes.menuItem}>
                    <ListItemIcon className={classes.icon}>
                      <DeleteIcon onClick={() => this.deleteContact(contact.id)} className={classes.icon} />
                    </ListItemIcon>
                    <ListItemText classes={{ primary: classes.primary }} inset primary="Grupos...TODO" />
                  </MenuItem>

                </MenuList>
              </Paper>
            </Menu>
            <Divider />
          </div>
        )}
      </div>
    );
  }
}

const ITEM_HEIGHT = 48;

const styles = theme => ({
  root: {
    margin: 10,
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
  icon: {
    // margin: theme.spacing.unit,
    // fontSize: 22,
  },
  menuItem: {
    '&:focus': {
      backgroundColor: theme.palette.primary.main,
      '& $primary, & $icon': {
        color: theme.palette.common.white,
      },
    },
  },
  primary: {},
});

Contact.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Contact)
