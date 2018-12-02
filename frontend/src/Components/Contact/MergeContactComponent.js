import React from 'react';
import PropTypes from 'prop-types';
import LogoutComponent from "../LogoutComponent";
import deepOrange from '@material-ui/core/colors/deepOrange';
import { QUERIES } from "../../querys";
import Starfilled from "@material-ui/icons/Grade";
import StarBorder from "@material-ui/icons/StarBorder";
import {
  Table, TableBody, TableCell, TableHead, TableRow,
  Paper, Avatar, withStyles
} from '@material-ui/core';
import ListItemCompositionContainer from '../../Containers/ListItemCompositionContainer';


class MergeComponent extends React.Component {
  constructor() {
    super()
    this.state = {
      favourite: false,
      starFilled: <Starfilled color="primary" onClick={this.handleFavouriteClick} />,
      StarBorder: <StarBorder onClick={this.handleFavouriteClick} />,
    }
  }
  componentWillMount() {
    const token = this.props.auth.getAccessToken();
      fetch(QUERIES.contact + 'merge', {
        method: "GET",
        headers: {
          'Accept': 'application/json',
          'Content-type': 'application/json',
          'Authorization': 'Bearer ' + token,
        },
      })
        .then(console.log)
        // .then(contacts => {))
        .catch(console.log)

  }

  handleFavouriteClick = () => {
    if (this.state.favourite) this.setState({ favourite: false });
    this.setState({ favourite: true });
  }

  isFavourite(favourite) {
    if (favourite) return <Starfilled color="primary" />
    return <StarBorder />
  }


  render() {
    const { classes } = this.props;
    const { isAuthenticated } = this.props.auth;
    const { contacts } = this.props.contacts;

    return (
      <div>
        <div>
          {!isAuthenticated() && (<LogoutComponent auth={this.props.auth} history={this.props.history} />)}
          {isAuthenticated() && (
            <main className={classes.content}>
              <h1>Contacts Duplicates</h1>
              <Paper className={classes.paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Fav</TableCell>
                      <TableCell>Avatar</TableCell>
                      <TableCell>Name</TableCell>
                      <TableCell>Last Name</TableCell>
                      <TableCell>Phone</TableCell>
                      <TableCell>Setting</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {contacts.map((contact, i) => {
                      return (
                        <TableRow key={i}>
                          <TableCell component="th" scope="row">
                            {this.isFavourite(contact.favourite)}
                          </TableCell>
                          <TableCell>
                            <Avatar className={classes.orangeAvatar}>{contact.name[0]}</Avatar>
                          </TableCell>
                          <TableCell>{contact.name}</TableCell>
                          <TableCell>{contact.lastName}</TableCell>
                          <TableCell>{contact.phone}</TableCell>
                          <TableCell><ListItemCompositionContainer auth={this.props.auth} contact={contact} /></TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </Paper>
            </main>
          )}
        </div>
        {this.props.children}
      </div>
    );
  }
}

const styles = theme => ({
  root: {
    display: 'flex',
    color: '#666',
  },
  content: {
    margin: '0 0 0 245px',
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
  },
  row: {
    display: 'flex',
    justifyContent: 'center',
  },
  paper: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    minWidth: '800px',
  },
  orangeAvatar: {
    color: '#fff',
    backgroundColor: deepOrange[500],
  },
});

MergeComponent.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
}

export default withStyles(styles, { withTheme: true })(MergeComponent)
