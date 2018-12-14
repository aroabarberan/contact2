import React from 'react';
import PropTypes from 'prop-types';
import { CSVLink } from "react-csv";
import DeleteIcon from '@material-ui/icons/Delete';
import Label from "@material-ui/icons/Label";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import CloudDownload from '@material-ui/icons/CloudDownload';
import { QUERIES } from "../querys";
import Edit from '@material-ui/icons/Edit';
import {
  Divider, IconButton,
  Menu, MenuItem, ListItemIcon, ListItemText,
  Dialog, DialogTitle, withStyles, Hidden
} from '@material-ui/core';
import { LabelOutlined } from '@material-ui/icons';
import { withRouter } from "react-router-dom";
import ContactFormContainer from '../Containers/Contact/ContactFormContainer';
import ContactFormWrapperComponent from './Contact/ContactFormWrapperComponent';


class ListItemComposition extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      openEdit: false,
      anchorEl: null,
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

  closeMenuWhenClickOnGroupsIfInGroupsAndIsTheSame = (group) => {
    const { location } = this.props;
    const regex = new RegExp(/\/group\/(.*)/);
    const results = regex.exec(location.pathname);
    if (results && results.length >= 2) {
      const groupNameInPath = results[1];
      if (group.name === groupNameInPath) {
        console.log('CLOSING BECAUSE', group.name, '=', groupNameInPath);
        this.handleClose();
      }
    }
  }

  delete = () => {
    const { contact, deleteContact } = this.props;
    fetch(QUERIES.contact + contact.id, {
      method: "DELETE",
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json',
        'Authorization': 'Bearer ' + this.props.auth.getAccessToken(),
      },
    })
      .then(() => deleteContact(contact.id))
      .catch(console.error);
    this.handleClose();
  }

  click = group => {
    this.hasGroup(group) ? this.removeFromGroup(group) : this.addToGroup(group);
  }

  addToGroup = (group) => {
    const { contact, addContactGroup } = this.props;
    fetch(QUERIES.contactgroup, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json',
        'Authorization': 'Bearer ' + this.props.auth.getAccessToken(),
      },
      body: JSON.stringify({ contactId: contact.id, groupId: group.id }),
    })
      .then(res => res.json())
      .then(() => { addContactGroup(contact, group) })
      .catch(console.log);
  }

  removeFromGroup = (group) => {
    const { contact, removeContactGroup } = this.props;
    fetch(`${QUERIES.contactgroup}${contact.id}/${group.id}`, {
      method: "DELETE",
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json',
        'Authorization': 'Bearer ' + this.props.auth.getAccessToken(),
      },
    })
      .then(res => {
        if (res.status >= 200 && res.status < 400) return 'Contact deleted from group';
        else throw new Error('Cannot delete contact from group');
      })
      .then(() => {
        this.closeMenuWhenClickOnGroupsIfInGroupsAndIsTheSame(group);
        removeContactGroup(contact, group);
      })
      .catch(console.log);
  }

  hasGroup = (group) => {
    const { contact } = this.props;
    return contact.groups
      .map(group => group.id)
      .includes(group.id)
  }

  handleSubmit = (values) => {
    let { id } = this.props.contact
    let { name, last_name, favourite } = values

    fetch(QUERIES.contact + id, {
      method: "PUT",
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json',
        'Authorization': 'Bearer ' + this.props.auth.getAccessToken(),
      },
      body: JSON.stringify({ id, name, last_name, favourite }, id),
    })
      .then(res => res.json())
      .then(data => this.props.editContact(data.contact))
      .catch(console.log);

    this.handleCloseEdit();
  }

  render() {
    const { anchorEl, openEdit } = this.state;
    const open = Boolean(anchorEl);
    const { classes, contact, auth, groups } = this.props;

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
          <MenuItem
            onClick={this.handleOpenEdit}>
            <ListItemIcon>
              <Edit variant="fab" aria-label="Edit" className={classes.icon} />
            </ListItemIcon>
            <ListItemText classes={{ primary: classes.primary }} inset primary="Edit" />
          </MenuItem>

          <CSVLink className={classes.menuLink}
            separator={";"}
            data={[this.props.contact]}
            onClick={() => this.handleClose}
          >
            <MenuItem className={classes.menuItem}>
              <ListItemIcon onClick={() => this.handleClose}>
                <CloudDownload />
              </ListItemIcon>
              <ListItemText>Export</ListItemText>
            </MenuItem>
          </CSVLink>

          <MenuItem className={classes.menuItem}
            onClick={this.delete} >
            <ListItemIcon onClick={() => this.handleClose}>
              <DeleteIcon />
            </ListItemIcon>
            <ListItemText classes={{ primary: classes.primary }} inset primary="Delete" />
          </MenuItem>

          {groups.length > 0 && (
            <div>
              <Divider />
              <p className={classes.title}>Groups</p>
              {groups.map((group, i) => {
                return (
                  <div key={i}>
                    <MenuItem className={classes.menuItem} onClick={() => this.click(group)}>
                      <ListItemIcon>
                        {this.hasGroup(group) ? (<Label />) : (<LabelOutlined />)}
                      </ListItemIcon>
                      <ListItemText primary={group.name} primaryTypographyProps={{
                        style: { textOverflow: 'ellipsis', overflow: 'hidden' }
                       }} />
                    </MenuItem>
                  </div>
                );
              })}
            </div>
          )}
        </Menu>

        <Hidden mdUp>
          <Dialog
            fullScreen
            open={this.state.openEdit}
            onClose={this.handleCloseEdit}
            aria-labelledby="scroll-dialog-title"
            scroll='paper'
          >
            <ContactFormWrapperComponent
              title='Edit Contact'
              auth={auth}
              handleClose={this.handleCloseEdit}
              contactInfo={contact}
            />
          </Dialog>
        </Hidden>
        <Hidden smDown>
          <Dialog
            open={this.state.openEdit}
            onClose={this.handleCloseEdit}
            aria-labelledby="scroll-dialog-title"
            scroll='paper'
          >
            <ContactFormWrapperComponent
              title='Edit Contact'
              auth={auth}
              handleClose={this.handleCloseEdit}
              contactInfo={contact}
            />
          </Dialog>
        </Hidden>
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
  dialog: {
    width: '600px',
  },
  space: {
    margin: '0 5px',
  },
  primary: {},
  title: {
    color: '#666;',
    fontSize: 13,
    margin: '20px',
    fontFamily: "Roboto, Arial, sans-serif"
  },
  menuLink: {
    textDecoration: 'none',
    outline: 'none'
  },
});

ListItemComposition.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(ListItemComposition));
