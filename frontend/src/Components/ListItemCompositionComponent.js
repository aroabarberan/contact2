import React from 'react';
import PropTypes from 'prop-types';
import DraftsIcon from '@material-ui/icons/Drafts';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Cloud from "@material-ui/icons/Cloud";
import {
  Menu, MenuList, MenuItem, Paper, IconButton, Divider,
  ListItemIcon, ListItemText, withStyles,
} from '@material-ui/core';

const url_getContact = 'http://localhost:3010/api/contacts/';


class ListItemComposition extends React.Component {
  constructor() {
    super()
    this.state = {
      anchorEl: null,
    };
    this.delete = this.delete.bind(this);
  }

  delete() {
    const token = this.props.auth.getAccessToken();
    const id = this.props.idContact;

    fetch(url_getContact + id, {
      method: "DELETE",
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json',
        'Authorization': 'Bearer ' + token,
      },
    }).catch(console.log);
    this.props.deleteContact(id)
  }

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);
    const { classes } = this.props;

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
              width: 200,
            },
          }}
        >
          <Paper>
            <MenuList>

              <MenuItem className={classes.menuItem}>
                <ListItemIcon className={classes.icon}>
                  <Cloud />
                </ListItemIcon>
                <ListItemText classes={{ primary: classes.primary }} inset primary="Export" />
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

              <MenuItem className={classes.menuItem}>
                <ListItemIcon className={classes.icon}>
                  <DraftsIcon />
                </ListItemIcon>
                <ListItemText classes={{ primary: classes.primary }} inset primary="Draf" />
              </MenuItem>

            </MenuList>
          </Paper>
        </Menu>
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

ListItemComposition.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ListItemComposition);