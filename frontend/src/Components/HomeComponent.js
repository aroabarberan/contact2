import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Starfilled from "@material-ui/icons/Grade";
import StarBorder from "@material-ui/icons/StarBorder";
import Avatar from '@material-ui/core/Avatar';
import ListItemComposition from '../Containers/ListItemCompositionContainer';
import deepOrange from '@material-ui/core/colors/deepOrange';


import {
  Table, TableBody, TableCell, TableHead, TableRow,
  Paper, withStyles
} from '@material-ui/core';

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
      });
    } else {
      this.setState({ profile: userProfile });
    }
  }

  constructor() {
    super()
    this.state = {
      favourite: false,
      starFilled: <Starfilled color="primary" onClick={this.handleFavouriteClick} />,
      StarBorder: <StarBorder onClick={this.handleFavouriteClick} />,
    }
    this.handleFavouriteClick = this.handleFavouriteClick.bind(this)
  }

  handleFavouriteClick() {
    if (this.state.favourite) {
      this.setState({ favourite: false });

    } else {
      this.setState({ favourite: true });
    }

  }

  isFavourite(favourite) {
    if (favourite) {
      return <Starfilled color="primary" />
    } else {
      return <StarBorder />
    }

  }

  render() {
    const { classes } = this.props;
    const { contacts } = this.props.contacts;
    const path = 'home/aroa/Documents/contact2/backend/public/images/';

    console.log(contacts)
    return (
      <div>
        {/* this.isFavourite(contact.favourite)} */}

        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>Avatar</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Setting</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {contacts.map((contact, i) => {
                return (
                  <TableRow key={i}>
                    <TableCell component="th" scope="row">
                      <Avatar src={path + contact.avatar} />

                    </TableCell>
                    <TableCell>{contact.name}</TableCell>
                    <TableCell>{contact.phone}</TableCell>
                    <TableCell><ListItemComposition auth={this.props.auth} contact={contact} /></TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Paper>

      </div>
    );
  }
}

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
  row: {
    display: 'flex',
    justifyContent: 'center',
  },
  paper: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
  orangeAvatar: {
    color: '#fff',
    backgroundColor: deepOrange[500],
  },
})

Home.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
}

export default withStyles(styles, { withTheme: true })(Home)