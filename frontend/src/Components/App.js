import React from 'react';
import Logout from "./LogoutComponent";
import DrawerPaper from "./DrawerPaperComponent";
import CreateContact from "../Containers/Contact/CreateContactContainer";


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
                  <CreateContact auth={this.props.auth} />
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
