import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import createThunkerMiddleware from 'redux-thunker';
import rootReducer from './reducers/index';

const initialState = {};

const thunk = createThunkerMiddleware({});
const middleware = [thunk];

export default createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);
