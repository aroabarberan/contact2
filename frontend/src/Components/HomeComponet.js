import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Typography, withStyles } from '@material-ui/core';
import Contact from "../Containers/ContactContainer";

const url_getContact = 'http://localhost:3010/api/contacts/';

class Home extends Component {

  componentWillMount() {
    this.setState({ profile: {} });

    const { userProfile, getProfile } = this.props.auth;
    if (!userProfile) {
      getProfile((err, profile) => {
        this.setState({ profile });
        const { getAccessToken } = this.props.auth;

        fetch(url_getContact,
          {
            method: "POST",
            headers: {
              'Accept': 'application/json',
              'Content-type': 'application/json',
              'Authorization': 'Bearer ' + getAccessToken(),
            },
            body: JSON.stringify({ sub: this.state.profile.sub }),
          })
          .then(res => res.json())
          .then(contacts => contacts.map(contact => this.props.addContact(contact)))
          .catch(console.log)

        const token = getAccessToken();
        const { sub, nickname, name, picture, updated_at } = profile
        this.props.saveProfile({ sub, nickname, name, picture, updated_at, token })
      });
    } else {
      this.setState({ profile: userProfile });
    }
  }
  render() {
    const { classes } = this.props;
    return (
      <div>
        <Typography className={classes.title}>Contacts</Typography>
        <Contact auth={this.props.auth} />
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

  }
})

Home.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
}

export default withStyles(styles, { withTheme: true })(Home)