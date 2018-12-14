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
    auth.handleAuthentication();
  }
}

export const makeMainRoutes = () => {
  return (
    <Router history={history}>
      <Switch>
        <Route exact path='/callback'>
          <Route path="/callback" render={(props) => {
            handleAuthentication(props);
            return <Callback {...props} />
          }} />
        </Route>
        <Route render={() => (
          <Fragment>
            <Route render={() => { if (!auth.isAuthenticated()) auth.login(); }} />
            <Route render={() => <ContactLoaderContainer auth={auth} />} />
            <Route path="/" exact render={() => <ContactContainer auth={auth} />}/>
            <Route path="/merge" render={() => <MergeContactsContainer auth={auth} />}/>
            <Route path="/favourite" render={() => <FavouriteContactsContainer auth={auth} />}/>
            <Route path="/group/:groupName" render={({ match }) =>
              <ContactByGroupContainer auth={auth} groupName={match.params.groupName}/>
            }/>
          </Fragment>
        )}/>
      </Switch>
    </Router>
  )
}
