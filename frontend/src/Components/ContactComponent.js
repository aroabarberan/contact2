import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Starfilled from "@material-ui/icons/Grade";
import StarBorder from "@material-ui/icons/StarBorder";
import { Grid, Divider } from '@material-ui/core';
import ListItemComposition from '../Containers/ListItemCompositionContainer';
import Avatar from '@material-ui/core/Avatar';
import { withStyles } from '@material-ui/core';


class Contact extends Component {
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
    const { classes, contact } = this.props;
    console.log(this.props.contact)
    const path = '/home/aroa/Documents/contact2/backend/public/images/'

    return (
      <div>
        <Grid container direction="row" justify="space-between" 
          alignItems="center" spacing={24}
        >

          <Grid item className={classes.row}>
          <Grid item container direction="row" alignItems="center">{this.isFavourite(contact.favourite)}</Grid>
          {/* <Avatar className={classes.avatar} src={contact.avatar}></Avatar> */}
          <Avatar className={classes.avatar}>{contact.avatar}</Avatar>
          <Grid item container direction="row" justify="space-between"  alignItems="center">{contact.name} </Grid>
          </Grid>
          <Grid item>{contact.phone}</Grid>
          <Grid item>
            <ListItemComposition auth={this.props.auth} contact={contact} />
          </Grid>
        </Grid>
        <Divider />
      </div >
    );
  }
}
const styles = {
  avatar: {
    margin: 10,
  },
  row: {
    display: 'flex',
    justifyContent: 'space-between',
  },
};

Contact.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(Contact);