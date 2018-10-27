import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Home extends Component {
  login() {
    this.props.auth.login();
  }

  render() {
    const { isAuthenticated } = this.props.auth;
    return (
      <div className="container">
        {/* {isAuthenticated() && 
          (<h4>You are logged in<Link to="profile">profile area</Link></h4>)
        } */}
        {!isAuthenticated() &&
          (<h4>You are not logged in! 
            <button onClick={this.login.bind(this)}>Log In</button>
          </h4>)
        }
      </div>
    );
  }
}

export default Home