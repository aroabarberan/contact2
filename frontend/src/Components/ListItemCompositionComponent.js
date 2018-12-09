import React from 'react';
import PropTypes from 'prop-types';
import DeleteIcon from '@material-ui/icons/Delete';
import CloudDownload from "@material-ui/icons/CloudDownload";
import Label from "@material-ui/icons/Label";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { CSVLink } from "react-csv";
import { QUERIES } from "../querys";
import Edit from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';
import RemoveCircle from '@material-ui/icons/RemoveCircleOutline';
import { Formik, Form, Field, FieldArray } from 'formik';
import {
  Divider, Button, IconButton, Fab,
  Menu, MenuItem, ListItemIcon, ListItemText,
  Dialog, DialogTitle, DialogActions, DialogContent, withStyles
} from '@material-ui/core';


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

  delete = () => {
    const { id } = this.props.contact;
    fetch(QUERIES.contact + id, {
      method: "DELETE",
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json',
        'Authorization': 'Bearer ' + this.props.auth.getAccessToken(),
      },
    })
      .then(res => res.json())
      .then(data => this.props.deleteContact(data.contact.id))
      .catch(console.log);
    this.handleClose();
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

    // fetch(QUERIES.contact + contactId, {
    //   method: "PUT",
    //   headers: {
    //     'Accept': 'application/json',
    //     'Content-type': 'application/json',
    //     'Authorization': 'Bearer ' + this.props.auth.getAccessToken(),
    //   },
    //   body: JSON.stringify({ groups: group }, contactId),
    // })
    //   .then(res => res.json())
    //   .then(console.log)
    //   .catch(console.log);
    // this.props.editContact(contactId, group);
    this.handleClose();

  }

  handleSubmit = (values) => {
    let { id } = this.props.contact
    let { name, lastName, favourite } = values

    fetch(QUERIES.contact + id, {
      method: "PUT",
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json',
        'Authorization': 'Bearer ' + this.props.auth.getAccessToken(),
      },
      body: JSON.stringify({ id, name, lastName, favourite }, id),
    })
      .then(res => res.json())
      .then(data => this.props.editContact(data.contact.id, data.contact))
      .catch(console.log);


    console.log(this.props.contacts.contacts)
    values.phones.map(p => {
      
      let phone = p.phone;
      let contact_id = id;

      // fetch(QUERIES.phone, {
      //   method: "POST",
      //   headers: {
      //     'Accept': 'application/json',
      //     'Content-type': 'application/json',
      //     'Authorization': 'Bearer ' + this.props.auth.getAccessToken(),
      //   },
      //   body: JSON.stringify({ phone, contact_id }),
      // })
      //   .then(res => res.json())
      //   .then(console.log)
      //   .then(data => this.props.addPhone(data.phone))
      //   .catch(console.log);

    //   fetch(QUERIES.phone + p.id, {
    //     method: "PUT",
    //     headers: {
    //       'Accept': 'application/json',
    //       'Content-type': 'application/json',
    //       'Authorization': 'Bearer ' + this.props.auth.getAccessToken(),
    //     },
    //     body: JSON.stringify({ phone, contact_id }, p.id),
    //   })
    //     .then(res => res.json())
    //     .then(console.log)
    //     .then(data => this.props.editPhone(data.phone.id, data.phone))
    //     .catch(console.log);
    })

    this.handleCloseEdit();
  }

  render() {
    const { anchorEl, openEdit } = this.state;
    const open = Boolean(anchorEl);
    const { classes, contact } = this.props;
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
          <CSVLink data={[this.props.contact]} className={classes.menuLink} separator={";"}>
            <MenuItem className={classes.menuItem}>
              <ListItemIcon onClick={() => this.handleClose}>
                <CloudDownload />
              </ListItemIcon>
              <ListItemText>Export</ListItemText>
            </MenuItem>
          </CSVLink>

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
        </Menu>

        <Dialog
          open={openEdit}
          onClose={this.handleCloseEdit}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Edit contact</DialogTitle>
          <Divider />
          <DialogContent></DialogContent>

          <Formik
            initialValues={{ phones: contact.phones, name: contact.name, lastName: contact.lastName, favourite: contact.favourite }}
            onSubmit={values => this.handleSubmit(values)}
            render={({ values }) => (
              <Form>
                <DialogContent className={classes.dialog}>
                  <Field
                    className={classes.space}
                    autoFocus
                    margin="normal"
                    name="name"
                    label="Name"
                    type="text"
                    value={values.name}
                  />
                  <Field
                    className={classes.space}
                    margin="normal"
                    name="lastName"
                    label="Last Name"
                    type="text"
                    value={values.lastName}
                  />
                </DialogContent>
                <DialogContent className={classes.dialog}>
                  <FieldArray
                    name="phones"
                    render={arrayHelpers => (
                      <div>
                        {values.phones && values.phones.length > 0 ? (
                          values.phones.map((phone, index) => (
                            <div key={index}>
                              <Field name={`phones.${index}.phone`} />

                              <Fab size="small" color="primary"
                                className={classes.margin}
                                onClick={() => arrayHelpers.remove(index)}>
                                <RemoveCircle />
                              </Fab>

                              <Fab size="small" color="primary"
                                className={classes.margin}
                                onClick={() => arrayHelpers.insert(index, '')}>
                                <AddIcon />
                              </Fab>
                            </div>
                          ))
                        ) : (
                            <DialogActions>
                              <Button type="button" onClick={() => arrayHelpers.push('')}>
                                Add a Phone
                          </Button>
                            </DialogActions>
                          )}
                        <DialogActions>
                          <Button onClick={this.handleCloseEdit} color="primary">Cancel</Button>
                          <Button type="submit" color="primary" >Save</Button>
                        </DialogActions>
                      </div>
                    )}
                  />
                </DialogContent>
              </Form>
            )}
          />

          {/* <DialogContent className={classes.dialog}>
            <TextField
              className={classes.space}
              margin="normal"
              name="lastName"
              label="Last name"
              type="text"
              defaultValue={this.props.contact.lastName}
              onChange={this.handleChange('lastName')}
            />
            <TextField
              className={classes.space}
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
              className={classes.space}
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
          </DialogActions> */}
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
    margin: '10px 20px',
    fontFamily: "Roboto, Arial, sans-serif"
  },
  menuLink: {
    color: '#666',
    textDecoration: 'none',
  },
});

ListItemComposition.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ListItemComposition);