import React from 'react';
import { Route, Router } from 'react-router-dom';
import history from './history';
import Auth from './Components/Auth/AuthComponent';
import AppComponent from "./Components/AppComponent";
import Callback from './Components/Callback/CallbackComponent';
import LogoutComponent from './Components/LogoutComponent';
import MergeContactContainer from "./Containers/Contact/mergeContactContainer";
import ContactContainer from "./Containers/Contact/contactContainer";
import OtherContactContainer from "./Containers/Contact/otherContactContainer";


const auth = new Auth();

const handleAuthentication = ({ location }) => {
  if (/access_token|id_token|error/.test(location.hash)) {
    auth.handleAuthentication()
  }
}
export const makeMainRoutes = () => {
  return (
    <Router history={history}>
      <div>
        <Route path="/" render={(props) => <AppComponent auth={auth} {...props} />} />
        <Route path="/contacts" render={(props) => <ContactContainer auth={auth} {...props} />} />
        <Route path="/logout" render={(props) => <LogoutComponent auth={auth} {...props} />} />
        <Route path="/merge" render={(props) => <MergeContactContainer auth={auth} {...props} />} />
        <Route path="/other" render={(props) => <OtherContactContainer auth={auth} {...props} />} />
        <Route path="/callback" render={(props) => {
          handleAuthentication(props)
          return <Callback {...props} />
        }} />
      </div>
    </Router>
  )
}
