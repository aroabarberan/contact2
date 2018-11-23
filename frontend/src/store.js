import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from "redux-devtools-extension";
import { logger } from "redux-logger";
import immutable from "redux-immutable-state-invariant";
import contacts from './Reducers/contactReducer';
import groups from './Reducers/groupReducer';

const store = createStore(
  combineReducers({
    contacts,
    groups,
  }),
  composeWithDevTools(applyMiddleware(logger, immutable()))
)
export default store;