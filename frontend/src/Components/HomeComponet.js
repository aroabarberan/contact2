import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Typography, Paper, withStyles } from '@material-ui/core';
import Contact from "../Containers/CrudContactContainer";


class Home extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div>
        <Typography>Contacts</Typography>
        <Paper className={classes.paper} elevation={1}>
          <Contact auth={this.props.auth} />
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
})


Home.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
}

export default withStyles(styles, { withTheme: true })(Home)