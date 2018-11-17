import React from 'react';
import PropTypes from 'prop-types';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import DeleteIcon from '@material-ui/icons/Delete';
import CloudDownload from "@material-ui/icons/CloudDownload";
import Archive from "@material-ui/icons/Archive";
import Edit from '@material-ui/icons/Edit';
import {
  Divider, IconButton, TextField,
  Menu, MenuList, MenuItem, ListItemIcon, ListItemText,
  Dialog, DialogTitle, DialogActions, DialogContent, withStyles
} from '@material-ui/core';
import Group from "../Containers/Group/GroupContainer";


class ButtonSetting extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      anchorEl: null,
    };
  }
  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };
  render() {
    const { classes } = this.props;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);
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
              <Group auth={this.props.auth} />
            </MenuItem>
          </MenuList>
        </Menu>
      </div>
    )
  }
}
const ITEM_HEIGHT = 88;

const styles = theme => ({
  absolute: {
    position: 'absolute',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 3,
  },
});

ButtonSetting.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ButtonSetting)