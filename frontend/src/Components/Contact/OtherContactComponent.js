import React from 'react';
import PropTypes from 'prop-types';
import LogoutComponent from "../LogoutComponent";
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
            <main className={classes.content}>
              <h1>Contacts Hidden</h1>
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
});

OtherComponent.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
}

export default withStyles(styles, { withTheme: true })(OtherComponent)
