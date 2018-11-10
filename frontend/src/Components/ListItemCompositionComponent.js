import React from 'react';
import PropTypes from 'prop-types';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreVertIcon from '@material-ui/icons/MoreVert';
// import CloudDownload from "@material-ui/icons/CloudDownload";
// import Archive from "@material-ui/icons/Archive";
import Label from "@material-ui/icons/Label";
import Edit from '@material-ui/icons/Edit';
import {
  Paper, Divider, Button, TextField, IconButton,
  Menu, MenuList, MenuItem, ListItemIcon, ListItemText,
  Dialog, DialogTitle, DialogActions, DialogContent, withStyles
} from '@material-ui/core';


const url_getContact = 'http://localhost:3010/api/contacts/';


class ListItemComposition extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      openEdit: false,
      favourite: 0,
      anchorEl: null,
      contact: this.props.contact
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
      name: this.state.contact.name,
      avatar: "",
      phone: this.state.contact.phone,
      favourite: this.state.favourite,
      [evt.target.name]: evt.target.value
    });
  };


  delete = () => {
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

  submit = evt => {
    evt.preventDefault();
    const { name, phone, favourite } = this.props.form.create;
    const sub = this.props.auth.userProfile.sub;
    const token = this.props.auth.getAccessToken();
    const id = this.props.contact.id;
    const avatar = '';


    fetch('http://localhost:3010/api/contacts/' + id, {
      method: "PUT",
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json',
        'Authorization': 'Bearer ' + token,
      },
      body: JSON.stringify({ id, sub, avatar, name, phone, favourite }, id),
    })
      .then(res => res.text())
      .then(console.log)
      .catch(console.log);

    this.props.editContact(id, { id, sub, avatar, name, phone, favourite });
    this.handleCloseEdit();
  }

  render() {
    const { anchorEl, openEdit } = this.state;
    const open = Boolean(anchorEl);
    const { classes, contact } = this.props;
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
          PaperProps={{
            style: {
              maxHeight: ITEM_HEIGHT * 4.5,
              width: 256,
            },
          }}
        >
          <Paper>
            <MenuList>
              {/* <MenuItem className={classes.menuItem}>
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
              </MenuItem> */}

              <MenuItem
                onClick={this.handleOpenEdit}
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
                <ListItemText primary="Patata" />
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
              defaultValue={this.state.contact.name}
              onChange={this.handleChange('name')}
            />
          </DialogContent>
          <DialogContent>
            <TextField
              margin="normal"
              name="phone"
              label="Phone"
              type="text"
              defaultValue={this.state.contact.phone}
              onChange={this.handleChange('phone')}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleCloseEdit} color="primary">Cancel</Button>
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
    color: '#757575',
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
    margin: '10px 20px',
    color: '#757575;',
    fontSize: 13,
    fontFamily: "Roboto, Arial, sans-serif"
  }
  // Roboto,Arial,sans-serifbody
  // Roboto, RobotoDraft, Helvetica, Arial, sans-serifbody
  // Roboto,RobotoDraft,Helvetica,Arial,sans-serifbody
});

ListItemComposition.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ListItemComposition);