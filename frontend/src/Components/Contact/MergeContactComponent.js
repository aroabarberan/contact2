import React from 'react';
import PropTypes from 'prop-types';
import { Tooltip } from '@material-ui/core';
import LogoutComponent from "../LogoutComponent";
import DrawerPaper from "../DrawerPaperComponent";
import CreateContactContainer from "../../Containers/Contact/createContactContainer";

import { withStyles } from '@material-ui/core';

class MergeComponent extends React.Component {

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
          {isAuthenticated() &&
            (
              <div className={classes.root}>
                <DrawerPaper auth={this.props.auth} history={this.props.history} />

                <main className={classes.content}>
                  <div className={classes.toolbar} />
                  {/* Merge */}
                  <h1>Contacts Duplicates</h1>
                </main>

                <Tooltip title="FAB 'position: absolute;'">
                  <CreateContactContainer auth={this.props.auth} />
                </Tooltip>
              </div>
            )
          }
        </div>
        <div>
          {this.props.children}
        </div>
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

  toolbar: theme.mixins.toolbar,
});

MergeComponent.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
}

export default withStyles(styles, { withTheme: true })(MergeComponent)
