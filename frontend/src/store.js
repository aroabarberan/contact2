import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from "redux-devtools-extension";
import { logger } from "redux-logger";
import immutable from "redux-immutable-state-invariant";
import contacts from './Reducers/contactReducer';
import groups from './Reducers/groupReducer';
import phones from './Reducers/phoneReducer';

const store = createStore(
  combineReducers({
    contacts,
    groups,
    phones,
  }),
  composeWithDevTools(applyMiddleware(logger, immutable()))
)
export default store;