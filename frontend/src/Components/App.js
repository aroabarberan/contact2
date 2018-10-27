import React, { Component } from 'react'
import MiniDrawer from "../Components/MiniDrawerComponet";
// import MiniDrawer from "../Containers/MiniDrawerContainer";

class App extends Component {

  goTo(route) {
    this.props.history.replace(`/${route}`);
  }

  login() {
    this.props.auth.login();
  }

  logout() {
    this.props.auth.logout();
  }

  render() {
    const { isAuthenticated } = this.props.auth
    return (
      <div>
        <div>
          <div>
            {!isAuthenticated() &&
              (<button onClick={this.login.bind(this)}>Log In</button>)
            }

            {isAuthenticated() &&
              (
                <div>
                  <MiniDrawer auth={this.props.auth} />
                  <button onClick={this.logout.bind(this)}>Log Out</button>
                  {/* <button onClick={this.goTo.bind(this, 'home')}>Home</button> */}
                  {/* <button onClick={this.goTo.bind(this, 'profile')}>Profile</button> */}
                  {/* <button onClick={this.goTo.bind(this, 'createContact')}>CreateContact</button> */}
                </div>
                )
            }
          </div>
        </div>
        <div>
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default App
