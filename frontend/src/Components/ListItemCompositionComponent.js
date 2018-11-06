import React from 'react';
import PropTypes from 'prop-types';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import CloudDownload from "@material-ui/icons/CloudDownload";
import Archive from "@material-ui/icons/Archive";
import Label from "@material-ui/icons/Label";
import Edit from '@material-ui/icons/Edit';
import {
  Paper, Divider, Button, TextField, IconButton,
  Menu, MenuList, MenuItem, ListItemIcon, ListItemText,
  Dialog, DialogTitle, DialogActions, DialogContent, withStyles
} from '@material-ui/core';


const url_getContact = 'http://localhost:3010/api/contacts/';


class ListItemComposition extends React.Component {
  constructor() {
    super()
    this.state = {
      openEdit: false,
      contact: [],
      anchorEl: null,
    };
    this.delete = this.delete.bind(this);
    this.submit = this.submit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  delete() {
    const token = this.props.auth.getAccessToken();
    const { contact } = this.props;

    fetch(url_getContact + contact.id, {
      method: "DELETE",
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json',
        'Authorization': 'Bearer ' + token,
      },
    }).catch(console.log);
    this.props.deleteContact(contact.id);
    this.handleClose();
  }

  handleOpenEdit = (contact) => {
    this.setState({ openEdit: true, contact });
  }

  handleCloseEdit = () => {
    this.setState({ openEdit: false });
  }

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

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
    // console.log(this.props)
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
    this.handleCloseEdit();
  }

  render() {
    const { anchorEl, openEdit } = this.state;
    const open = Boolean(anchorEl);
    const { classes, contact } = this.props;

    return (
      <div>
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
              width: 256,
            },
          }}
        >
          <Paper>
            <MenuList>
              <MenuItem className={classes.menuItem}>
                <ListItemIcon className={classes.icon}>
                  <CloudDownload />
                </ListItemIcon>
                <ListItemText classes={{ primary: classes.primary }} inset primary="Export" />
              </MenuItem>

              <MenuItem className={classes.menuItem}>
                <ListItemIcon className={classes.icon}>
                  <Archive />
                </ListItemIcon>
                <ListItemText classes={{ primary: classes.primary }} inset primary="Hidden" />
              </MenuItem>

              <MenuItem
                onClick={() => this.handleOpenEdit(contact)}
                className={classes.menuItem}>
                <ListItemIcon className={classes.icon}>
                  <Edit variant="fab" aria-label="Edit" className={classes.icon} />
                </ListItemIcon>
                <ListItemText classes={{ primary: classes.primary }} inset primary="Edit" />
              </MenuItem>

              <MenuItem
                onClick={this.delete}
                className={classes.menuItem}>
                <ListItemIcon onClick={() => this.handleClose} className={classes.icon}>
                  <DeleteIcon className={classes.icon} />
                </ListItemIcon>
                <ListItemText classes={{ primary: classes.primary }} inset primary="Delete" />
              </MenuItem>

              <Divider />

              <p className={classes.title}>Change Label</p>
              {/* Meter grupos a los que pertenece */}
              <MenuItem className={classes.menuItem}>
                <ListItemIcon>
                  <Label />
                </ListItemIcon>
                <ListItemText >
                  Patata
                </ListItemText>
              </MenuItem>

            </MenuList>
          </Paper>
        </Menu>

        <Dialog
          open={openEdit}
          onClose={this.handleCloseEdit}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Edit contact</DialogTitle>
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
const ITEM_HEIGHT = 88;

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
  title: {
    fontSize: 12,
  }
});

ListItemComposition.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ListItemComposition);