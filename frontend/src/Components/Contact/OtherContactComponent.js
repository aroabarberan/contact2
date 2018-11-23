import React from 'react';
import PropTypes from 'prop-types';
import LogoutComponent from "../LogoutComponent";
import DrawerPaper from "../DrawerPaperComponent";
import { withStyles } from '@material-ui/core';


class OtherComponent extends React.Component {

  goTo = (route) => {
    this.props.history.replace(`/${route}`);
  }

  render() {
    const { classes } = this.props;
    const { isAuthenticated } = this.props.auth
    return (
      <div>
        <div>
          {!isAuthenticated() && (<LogoutComponent auth={this.props.auth} history={this.props.history} />)}
          {isAuthenticated() && (
            <div className={classes.root}>
              <DrawerPaper auth={this.props.auth} history={this.props.history} />
              <main className={classes.content}>
                <h1>Contacts Hidden</h1>
              </main>
            </div>
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
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
  },
});

OtherComponent.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
}

export default withStyles(styles, { withTheme: true })(OtherComponent)
