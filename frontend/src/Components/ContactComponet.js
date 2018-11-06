import React, { Component } from 'react';
// import Starfilled from "@material-ui/icons/Grade";
// import StarBorder from "@material-ui/icons/StarBorder";
import { Grid, Divider } from '@material-ui/core';
import ListItemComposition from '../Containers/ListItemCompositionContainer';

class Contact extends Component {
  // constructor() {
  //   super()
  //   this.state = {
  //     favourite: false,
  //     starFilled: <Starfilled color="primary" onClick={this.handleFavouriteClick} />,
  //     StarBorder: <StarBorder onClick={this.handleFavouriteClick} />,
  //   }
  //   this.handleFavouriteClick = this.handleFavouriteClick.bind(this)
  // }
  // handleFavouriteClick() {
  //   if (this.) {
  //     this.setState({ favourite: false });

  //   } else {
  //     this.setState({ favourite: true });
  //   }
  // }

  render() {
    const { contact } = this.props;
    return (
      <div>
        <Grid container direction="row" justify="space-between"
          alignItems="center" spacing={24}
        >
          <Grid item>{contact.name}</Grid>
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

export default Contact