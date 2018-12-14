import React from 'react';
import PropTypes from 'prop-types';
import Edit from '@material-ui/icons/Edit';
import Label from "@material-ui/icons/Label";
import DeleteIcon from '@material-ui/icons/Delete';
import { withRouter } from "react-router-dom";
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
      openEdit: false,
      id: null,
      name: '',
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
  handleOpen = (group) => {
    console.log('click name group', group);
  }

  handleOpenEdit = (group) => {
    this.setState({ id: group.id });
    this.setState({ name: group.name });
    this.setState({ openEdit: true });
  }

  handleCloseEdit = () => {
    this.setState({ openEdit: false });
  }

  delete = (group) => {
    fetch(QUERIES.group + group.id, {
      method: "DELETE",
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json',
        'Authorization': 'Bearer ' + this.props.auth.getAccessToken(),
      },
    })
      .then(res => res.json())
      .then(console.log)
      .catch(console.log);
    this.props.deleteGroup(group.id);
    this.handleCloseEdit();
  }

  handleChange = name => evt => {
    this.setState({ [name]: evt.target.value });
    this.props.updateForm({
      id: this.state.id,
      name: this.state.name,
      [evt.target.name]: evt.target.value
    });
  };

  submit = evt => {
    evt.preventDefault();
    const { id, name } = this.state;
    const token = this.props.auth.getAccessToken();

    fetch(QUERIES.group + id, {
      method: "PUT",
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json',
        'Authorization': 'Bearer ' + token,
      },
      body: JSON.stringify({ id, name, }, id),
    })
      .then(res => res.json())
      .then(data => this.props.editGroup(data.group.id, data.group))
      .catch(console.log);
    this.handleCloseEdit();
  }

  render() {
    const { classes, history } = this.props;
    const { openEdit } = this.state;
    const { groups } = this.props.groups;
    return (
      <div >
        {groups.map((group, i) => {
          return (
            <div key={i}>
              <Divider />
              <List>
                <MenuItem className={classes.menuItem} onClick={() => history.push('/group/'+ group.name)}>
                  <Label />
                  <ListItemText>
                    {group.name}
                  </ListItemText>
                  <Edit onClick={() => this.handleOpenEdit(group)} />
                  <DeleteIcon onClick={() => this.delete(group)} style={{ paddingLeft: 8 }} />
                </MenuItem>
              </List>
            </div>
          );
        })}
        <Dialog
          open={openEdit}
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
              defaultValue={this.state.name}
              onChange={this.handleChange('name')}
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
  link: {
    color: theme.typography.body1.color,
    textDecoration: 'none',
  }
});

GroupComponent.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(GroupComponent));
