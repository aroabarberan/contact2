import React from 'react';
import PropTypes from 'prop-types';
import { QUERIES } from "../../querys";
import Starfilled from "@material-ui/icons/Grade";
import StarBorder from "@material-ui/icons/StarBorder";
import {
  Table, TableBody, TableCell, TableHead, TableRow,
  Paper, Avatar, withStyles
} from '@material-ui/core';
import LogoutComponent from "../LogoutComponent";
import DrawerPaperComponent from "../DrawerPaperComponent";
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
      const token =  this.props.auth.getAccessToken();
      if(this.props.contacts.contacts.length === 0) {
      fetch(QUERIES.contact, {
        method: "GET",
        headers: {
          'Accept': 'application/json',
          'Content-type': 'application/json',
          'Authorization': 'Bearer ' + token,
        },
      })
        .then(res => res.json())
        .then(contacts => contacts.map(contact => this.props.addContact(contact)))
        .catch(console.log)
    }
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
        {!isAuthenticated() && (
          <LogoutComponent
            auth={this.props.auth}
            history={this.props.history} />
        )}

        {isAuthenticated() && (
          // <div className={classes.root}>
          <div>
            {/* <DrawerPaperComponent auth={this.props.auth} history={this.props.history} /> */}

            {/* <div className={classes.toolbar} /> */}
            <main className={classes.content}>
              <Paper className={classes.paper}>
                <Table>
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
                            {this.isFavourite(contact.favourite)}
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
            </main>
          </div>
        )}
      </div>
    );
  }
}

const styles = theme => ({
  root: {
    display: 'flex',
    color: '#666',
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
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
})

ContactComponent.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
}

export default withStyles(styles, { withTheme: true })(ContactComponent)