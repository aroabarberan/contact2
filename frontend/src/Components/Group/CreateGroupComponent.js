import React from 'react';
import { QUERIES } from "../../querys";
import PropTypes from 'prop-types';
import Add from "@material-ui/icons/Add";
import {
  Divider, Button, Dialog, DialogTitle, TextField,
  ListItemText, DialogActions, DialogContent, MenuItem,
  withStyles, ListItemIcon,
} from '@material-ui/core';
import { Formik, Field } from "formik";


class CreateGroupComponent extends React.Component {
  constructor() {
    super()
    this.state = {
      open: false,
      anchorEl: null,
    }
  }

  handleOpen = () => { this.setState({ open: true }); }
  handleClose = () => { this.setState({ open: false }); }

  submit = (values, actions) => {
    const { name } = values;
    fetch(QUERIES.group, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json',
        'Authorization': 'Bearer ' + this.props.auth.getAccessToken(),
      },
      body: JSON.stringify({ name }),
    })
      .then(res => res.json())
      .then(data => this.props.addGroup(data.group))
      .catch(console.log);
    this.handleClose();
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <MenuItem className={classes.menuItem} onClick={this.handleOpen}>
          <ListItemIcon>
            <Add />
          </ListItemIcon>
          <ListItemText>Create Group</ListItemText>
        </MenuItem>

        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <Formik
            onSubmit={this.submit}
            initialValues={{ name: '' }}
            render={(props) => (
              <div>
                <DialogTitle id="form-dialog-title">Create new group</DialogTitle>
                <Divider />
                <DialogContent>
                  <Field
                    name='name'
                    render={({ field }) => (
                      <TextField
                        {...field}
                        autoFocus
                        margin="normal"
                        label="Name"
                        type="text"
                      />
                    )}
                  />
                </DialogContent>
                <DialogActions>
                  <Button onClick={() => {
                    this.handleClose();
                    props.resetForm();
                  }} color="primary">Cancel</Button>
                  <Button onClick={props.handleSubmit} color="primary">Save</Button>
                </DialogActions>
              </div>
            )}
          />
        </Dialog>
      </div>
    );
  }
}

const styles = theme => ({
  menuItem: {
    color: '#666',
  },
});

CreateGroupComponent.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CreateGroupComponent);
