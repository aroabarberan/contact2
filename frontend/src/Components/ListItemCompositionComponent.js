import React from 'react';
import PropTypes from 'prop-types';
import DeleteIcon from '@material-ui/icons/Delete';
import CloudDownload from "@material-ui/icons/CloudDownload";
import Label from "@material-ui/icons/Label";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { QUERIES } from "../querys";
import Edit from '@material-ui/icons/Edit';
import {
  Divider, Button, IconButton, TextField, List,
  Menu, MenuList, MenuItem, ListItemIcon, ListItemText,
  Dialog, DialogTitle, DialogActions, DialogContent, withStyles
} from '@material-ui/core';


class ListItemComposition extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      openEdit: false,
      anchorEl: null,
      contact: {},
      id: this.props.contact.id,
      avatar: this.props.contact.avatar,
      name: this.props.contact.name,
      phone: this.props.contact.phone,
      favourite: 0,
    };
  }

  handleOpenEdit = () => {
    this.handleClose();
    this.setState({ openEdit: true });
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


  handleChange = name => evt => {
    this.setState({
      [name]: evt.target.value,
    });
    this.props.updateForm({
      name: this.state.name,
      lastName: this.state.lastName,
      phone: this.state.phone,
      favourite: this.state.favourite,
      [evt.target.name]: evt.target.value
    });
  };


  delete = () => {
    const token = this.props.auth.getAccessToken();
    const { id } = this.state;
    fetch(QUERIES.contact + id, {
      method: "DELETE",
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json',
        'Authorization': 'Bearer ' + token,
      },
    })
      .then(res => res.json())
      .then(data => this.props.deleteContact(data.contact.id))
      .catch(console.log);
    this.handleClose();
  }

  submit = evt => {
    evt.preventDefault();
    const { id, avatar, name, phone, favourite } = this.state;
    const sub = this.props.auth.userProfile.sub;
    const token = this.props.auth.getAccessToken();

    fetch(QUERIES.contact + id, {
      method: "PUT",
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json',
        'Authorization': 'Bearer ' + token,
      },
      body: JSON.stringify({ id, sub, avatar, name, phone, favourite }, id),
    })
      .then(res => res.json())
      .then(console.log)
      .catch(console.log);
    this.props.editContact(id, { id, sub, avatar, name, phone, favourite });
    this.handleCloseEdit();
  }

  click = group => {
    const groupId = group.id;
    const contactId = this.props.contact.id

    fetch(QUERIES.contactgroup, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json',
        'Authorization': 'Bearer ' + this.props.auth.getAccessToken(),
      },
      body: JSON.stringify({ contactId, groupId }),
    })
      .then(res => res.json())
      .then(console.log)
      // .then(data => this.props.addContact(data.contact))
      .catch(console.log);
    this.handleClose();

  }

  render() {
    const { anchorEl, openEdit } = this.state;
    const open = Boolean(anchorEl);
    const { classes } = this.props;
    const { groups } = this.props.groups;

    return (
      <div>
        <IconButton aria-label="More" aria-owns={open ? 'long-menu' : undefined}
          aria-haspopup="true" onClick={this.handleClick} >
          <MoreVertIcon />
        </IconButton>

        <Menu
          id="long-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={this.handleClose}
          PaperProps={{ style: { maxHeight: ITEM_HEIGHT * 4.5, width: 256, }, }}
        >
          <MenuList>
            <MenuItem className={classes.menuItem}>
              <ListItemIcon>
                <CloudDownload />
              </ListItemIcon>
              <ListItemText classes={{ primary: classes.primary }} inset primary="Export" />
            </MenuItem>

            <MenuItem
              onClick={this.handleOpenEdit}
              className={classes.menuItem}>
              <ListItemIcon>
                <Edit variant="fab" aria-label="Edit" className={classes.icon} />
              </ListItemIcon>
              <ListItemText classes={{ primary: classes.primary }} inset primary="Edit" />
            </MenuItem>

            <MenuItem className={classes.menuItem}
              onClick={this.delete} >
              <ListItemIcon onClick={() => this.handleClose}>
                <DeleteIcon />
              </ListItemIcon>
              <ListItemText classes={{ primary: classes.primary }} inset primary="Delete" />
            </MenuItem>
            <Divider />
            <p className={classes.title}>Groups</p>
            {groups.map((group, i) => {
              return (
                <div key={i}>
                  <MenuItem className={classes.menuItem} onClick={() => this.click(group)}>
                    <ListItemIcon onClick={() => this.handleClose}>
                      <Label />
                    </ListItemIcon>
                    <ListItemText>{group.name}</ListItemText>
                  </MenuItem>
                </div>
              );
            })}
          </MenuList>
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
              margin="normal"
              name="lastName"
              label="Last name"
              type="text"
              defaultValue={this.props.contact.avatar}
              onChange={this.handleChange('lastName')}
            />
          </DialogContent>
          <DialogContent>
            <TextField
              margin="normal"
              name="name"
              label="Name"
              type="text"
              defaultValue={this.props.contact.name}
              onChange={this.handleChange('name')}
            />
          </DialogContent>
          <DialogContent>
            <TextField
              margin="normal"
              name="phone"
              label="Phone"
              type="text"
              defaultValue={this.props.contact.phone}
              onChange={this.handleChange('phone')}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleCloseEdit} color="primary">Cancel</Button>
            <Button onClick={this.submit} color="primary">Save</Button>
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
  menuItem: {
    '&:focus': {
      color: '#fff',
      backgroundColor: theme.palette.primary.main,
    },
  },
  primary: {},
  title: {
    color: '#666;',
    fontSize: 13,
    margin: '10px 20px',
    fontFamily: "Roboto, Arial, sans-serif"
  },
  title: {
    margin: '10px 20px',
    color: '#757575;',
    fontSize: 13,
    fontFamily: "Roboto, Arial, sans-serif"
  },
});

ListItemComposition.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ListItemComposition);