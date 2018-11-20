import React from 'react';
import PropTypes from 'prop-types';
import DeleteIcon from '@material-ui/icons/Delete';
import CloudDownload from "@material-ui/icons/CloudDownload";
import Archive from "@material-ui/icons/Archive";
import MoreVertIcon from '@material-ui/icons/MoreVert';

import { QUERIES } from "../querys";
import Edit from '@material-ui/icons/Edit';
import {
  Divider, Button, IconButton, TextField,
  Menu, MenuList, MenuItem, ListItemIcon, ListItemText,
  Dialog, DialogTitle, DialogActions, DialogContent, withStyles
} from '@material-ui/core';
import GroupContainer from "../Containers/Group/groupContainer";


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

  changeAvatar = evt => {
    let files = evt.target.files || evt.dataTransfer.files;
    if (!files.length)
      return;
    this.createImage(files[0]);
  }

  createImage = file => {
    let reader = new FileReader();
    reader.onload = (evt) => {
      this.setState({
        avatar: evt.target.result
      })
      this.props.updateForm({
        avatar: evt.target.result
      });
    };
    reader.readAsDataURL(file);
  }

  handleChange = name => evt => {
    this.setState({
      [name]: evt.target.value,
    });
    this.props.updateForm({
      name: this.state.name,
      avatar: this.state.avatar,
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
    }).then(console.log).catch(console.log);
    this.props.deleteContact(id);
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

  render() {
    const { anchorEl, openEdit } = this.state;
    const open = Boolean(anchorEl);
    const { classes } = this.props;
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

            <MenuItem className={classes.menuItem}>
              <ListItemIcon>
                <Archive />
              </ListItemIcon>
              <ListItemText classes={{ primary: classes.primary }} inset primary="Hidden" />
            </MenuItem>

            <MenuItem
              onClick={this.handleOpenEdit}
              className={classes.menuItem}>
              <ListItemIcon>
                <Edit variant="fab" aria-label="Edit" className={classes.icon} />
              </ListItemIcon>
              <ListItemText classes={{ primary: classes.primary }} inset primary="Edit" />
            </MenuItem>

            <MenuItem
              onClick={this.delete}
              className={classes.menuItem}>
              <ListItemIcon onClick={() => this.handleClose}>
                <DeleteIcon />
              </ListItemIcon>
              <ListItemText classes={{ primary: classes.primary }} inset primary="Delete" />
            </MenuItem>

            <Divider />

            <p className={classes.title}>Change Label</p>
            <MenuItem className={classes.menuItem}>
              <GroupContainer auth={this.props.auth} />
            </MenuItem>
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
              name="avatar"
              label="Avatar"
              type="file"
              defaultValue={this.props.contact.avatar}
              onChange={this.changeAvatar}
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
      backgroundColor: theme.palette.primary.main,
      '& $primary, & $icon': {
        color: theme.palette.common.white,
      },
    },
  },
  primary: {},
  title: {
    margin: '10px 20px',
    color: '#666;',
    fontSize: 13,
    fontFamily: "Roboto, Arial, sans-serif"
  }
});

ListItemComposition.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ListItemComposition);