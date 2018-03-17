import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux'

import threads from './ThreadsPage/reducer';

export default combineReducers({
  routing: routerReducer,
  threads,
});
