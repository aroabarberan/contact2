import React, { Fragment } from 'react';
import { Route, Router, Switch } from 'react-router-dom';
import history from './history';
import Auth from './Components/Auth/AuthComponent';
import AppComponent from "./Components/AppComponent";
import Callback from './Components/Callback/CallbackComponent';
import ContactContainer from "./Containers/Contact/contactContainer";

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
        <Switch>
          <Route exact path='/callback'>
            <Route path="/callback" render={(props) => {
              handleAuthentication(props)
              return <Callback {...props} />
            }} />
          </Route>
          <Route render={() => (
            <Fragment>
              <Route render={() => { if (!auth.isAuthenticated()) auth.login(); }} />
              <Route path="/" render={(props) => <AppComponent auth={auth} {...props} />} />
              <Route path="/contacts" render={(props) => <ContactContainer auth={auth} {...props} />} />
              <Route path="/merge" render={(props) => <ContactContainer auth={auth} {...props} />} />
              <Route path="/favourite" render={(props) => <ContactContainer auth={auth} {...props} />} />
              <Route path="/group/:nameGroup" render={(props) => <ContactContainer auth={auth} {...props} />} />
            </Fragment>
          )}/>
        </Switch>
      </div>
    </Router>
  )
}
