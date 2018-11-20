import React from 'react';
import PropTypes from 'prop-types';
import Starfilled from "@material-ui/icons/Grade";
import StarBorder from "@material-ui/icons/StarBorder";
import deepOrange from '@material-ui/core/colors/deepOrange';
import { QUERIES } from "../../querys";
import {
  Table, TableBody, TableCell, TableHead, TableRow,
  Paper, Avatar, withStyles
} from '@material-ui/core';
import ListItemCompositionContainer from '../../Containers/ListItemCompositionContainer';


class ContactComponent extends React.Component {

  constructor() {
    super()
    this.state = {
      favourite: false,
      starFilled: <Starfilled color="primary" onClick={this.handleFavouriteClick} />,
      StarBorder: <StarBorder onClick={this.handleFavouriteClick} />,
    }
  }

  componentWillMount() {
    const { getAccessToken } = this.props.auth;

    fetch(QUERIES.contact,
      {
        method: "GET",
        headers: {
          'Accept': 'application/json',
          'Content-type': 'application/json',
          'Authorization': 'Bearer ' + getAccessToken(),
        },
      })
      .then(res => res.json())
      // .then(console.log)
      .then(contacts => contacts.map(contact => this.props.addContact(contact)))
      .catch(console.log)

  }

  handleFavouriteClick = () => {
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
    const { classes, history } = this.props;
    const { isAuthenticated } = this.props.auth;
    const { contacts } = this.props.contacts;
    console.log('contacts', contacts)
    return (
      <div className={classes.root}>
        {!isAuthenticated() && (history.replace('logout'))}

        {isAuthenticated() && (
          <Paper className={classes.paper}>
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
                        { this.isFavourite(contact.favourite)}
                        <Avatar src={contact.avatar} />
                      </TableCell>
                      <TableCell>{contact.name}</TableCell>
                      <TableCell>{contact.phone}</TableCell>
                      <TableCell><ListItemCompositionContainer auth={this.props.auth} contact={contact} /></TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </Paper>
        )}
      </div>
    );
  }
}

const styles = theme => ({
  root: {

  },
  table: {
    minWidth: 700,
  },
  icon: {
    color: '#666'
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

ContactComponent.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
}

export default withStyles(styles, { withTheme: true })(ContactComponent)