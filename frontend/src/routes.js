import React from 'react';
import { Route, Router } from 'react-router-dom';
import history from './history';
import Auth from './Components/Auth/AuthComponent';
import App from "./Components/App";
// import Contact from "./Containers/ContactContainer";
import Callback from './Components/Callback/CallbackComponent';


const auth = new Auth()

const handleAuthentication = ({ location }) => {
  if (/access_token|id_token|error/.test(location.hash)) {
    auth.handleAuthentication()
  }
}

export const makeMainRoutes = () => {
  return (
    <Router history={history}>
      <div>
        <Route path="/" render={(props) => <App auth={auth} {...props} />} />
        {/* <Route path="/contacts" render={(props) => {
          handleAuthentication(props)
          return <Contact  auth={auth} {...props} />
        }} /> */}
        <Route path="/callback" render={(props) => {
          handleAuthentication(props)
          return <Callback {...props} />
        }} />
      </div>
    </Router>
  )
}
