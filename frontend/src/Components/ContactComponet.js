import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Edit from '@material-ui/icons/Edit';
import { Divider, Paper, withStyles } from '@material-ui/core';
import ListItemComposition from '../Containers/ListItemCompositionContainer';


class Contact extends Component {

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Paper className={classes.paper} elevation={1}>
          {this.props.contacts.contacts.map((contact, i) =>
            <div key={i}>
              <p>{contact.name} {contact.phone}</p>
              <ListItemComposition  auth={this.props.auth} idContact={contact.id} />
              <Edit onClick={this.props.editContact} />
              <Divider />
            </div>
          )}
        </Paper>
      </div>
    );
  }
}
const styles = theme => ({
  paper: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
  title: {

  },
})


Contact.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
}

export default withStyles(styles, { withTheme: true })(Contact)