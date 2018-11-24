import React from 'react';
import PropTypes from 'prop-types';
import Edit from '@material-ui/icons/Edit';
import Label from "@material-ui/icons/Label";
import DeleteIcon from '@material-ui/icons/Delete';
import { QUERIES } from "../../querys";
import {
  Button, Divider, TextField,
  Dialog, DialogTitle, DialogActions, DialogContent, 
  List, MenuItem, ListItemText, withStyles
} from '@material-ui/core';


class GroupComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
    };
  }
  componentWillMount() {
    const token = this.props.auth.getAccessToken();
    if (this.props.groups.groups.length === 0) {
      fetch(QUERIES.group,
        {
          method: "GET",
          headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json',
            'Authorization': 'Bearer ' + token,
          },
        })
        .then(res => res.json())
        .then(groups => groups.map(group => this.props.addGroup(group)))
        .catch(console.log)
    }
  }

  handleOpenEdit = () => {
    console.log('click edit');
    this.handleCloseEdit();
    this.setState({ openEdit: true });
  }

  handleCloseEdit = () => {
    console.log('click edit');
    this.setState({ openEdit: false });
  }

  delete = () => {
    console.log('click delete');
    const token = this.props.auth.getAccessToken();
    const { id } = this.state;

    fetch(QUERIES.group + id, {
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

  submit = () => {
    console.log('on submit')
  }

  render() {
    const { classes } = this.props;
    const open = Boolean(this.state.open);
    const { groups } = this.props.groups;
    return (
      <div >
        {groups.map((group, i) => {
          return (
            <List key={i}>
              {/* <MenuItem onClick={this.handleOpenEdit}> */}
              <MenuItem className={classes.menuItem}>
                <Label />
                <ListItemText onClick={this.handleOpenEdit}>{group.name}</ListItemText>
                <Edit onClick={this.handleOpenEdit} />
                <DeleteIcon onClick={this.delete} />
              </MenuItem>
            </List>
          );
        })}
        <Dialog
          open={open}
          onClose={this.handleCloseEdit}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Edit group</DialogTitle>
          <Divider />
          <DialogContent>
            <TextField
              margin="normal"
              name="name"
              label="Name"
              type="text"
              // defaultValue={this.props.contact.phone}
              onChange={this.handleChange()}
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


const styles = theme => ({
  menuItem: {
    color: '#666',
  },
  primary: {},

});

GroupComponent.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(GroupComponent);