import React from 'react';
import { Tooltip } from '@material-ui/core';
import Logout from "./LogoutComponent";
import DrawerPaper from "./DrawerPaperComponent";
import CreateContact from "../Containers/Contact/CreateContainer";


class App extends React.Component {

  goTo(route) {
    this.props.history.replace(`/${route}`);
  }

  render() {
    const { isAuthenticated } = this.props.auth
    return (
      <div>
        <div>
          {!isAuthenticated() && (<Logout auth={this.props.auth} history={this.props.history} />)}
          {isAuthenticated() &&
            (
              <div>
                <DrawerPaper auth={this.props.auth} history={this.props.history} />

                <Tooltip title="FAB 'position: absolute;'">
                  <CreateContact auth={this.props.auth} />
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

export default App
