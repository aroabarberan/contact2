import React from 'react';
import PropTypes from 'prop-types';
import LogoutComponent from "./LogoutComponent";
import DrawerPaperContainer from "../Containers/DrawerPaperContainer";
import CreateContactContainer from "../Containers/Contact/createContactContainer";
import { Tooltip, withStyles } from '@material-ui/core';


class AppComponent extends React.Component {
  render() {
    const { classes } = this.props;
    const { isAuthenticated } = this.props.auth;
    return (
      <div>
        <div>
          {!isAuthenticated() && (<LogoutComponent auth={this.props.auth} />)}
          {isAuthenticated() && (
            <div className={classes.root}>
              <DrawerPaperContainer auth={this.props.auth} />
              <div className={classes.toolbar} />
              <Tooltip title="FAB 'position: absolute;'">
                <CreateContactContainer auth={this.props.auth} />
              </Tooltip>
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
  toolbar: theme.mixins.toolbar,
});

AppComponent.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
}

export default withStyles(styles, { withTheme: true })(AppComponent)
