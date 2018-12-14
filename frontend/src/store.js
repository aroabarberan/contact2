import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from "redux-devtools-extension";
import { logger } from "redux-logger";
import immutable from "redux-immutable-state-invariant";
import contacts from './Reducers/contactReducer';
import groups from './Reducers/groupReducer';

let store;

if (process.env && process.env.NODE_ENV === 'development') {
  store = createStore(
    combineReducers({
      contacts,
      groups,
    }),
    composeWithDevTools(applyMiddleware(logger, immutable()))
  )
} else {
  store = createStore(
    combineReducers({
      contacts,
      groups,
    })
  )
}

export default store;
