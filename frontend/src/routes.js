import React, { Fragment } from 'react';
import { Route, Router, Switch } from 'react-router-dom';
import history from './history';
import Auth from './Components/Auth/AuthComponent';
import Callback from './Components/Callback/CallbackComponent';
import ContactContainer from "./Containers/Contact/contactContainer";
import MergeContactsContainer from './Containers/Contact/MergeContactsContainer'
import ContactLoaderContainer from './Containers/Contact/ContactLoaderContainer';
import FavouriteContactsContainer from './Containers/Contact/FavouriteContactsContainer';
import ContactByGroupContainer from './Containers/Contact/ContactByGroupContainer';

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
        <Route render={() => <ContactLoaderContainer auth={auth} />} />
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
              <Route path="/" exact render={({ location }) =>
                <ContactContainer auth={auth} location={location} />
              }/>
              <Route path="/merge" render={({ location }) =>
                <MergeContactsContainer auth={auth} location={location} />
              }/>
              <Route path="/favourite" render={({ location }) =>
              < FavouriteContactsContainer auth={auth} location={location} />
              }/>
              <Route path="/group/:groupName" render={({ location, match }) =>
                <ContactByGroupContainer
                  auth={auth}
                  location={location}
                  groupName={match.params.groupName}
                />
              }/>
            </Fragment>
          )}/>
        </Switch>
      </div>
    </Router>
  )
}
