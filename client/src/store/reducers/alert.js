import { REMOVE_ALERT, SET_ALERT } from '../types/alert';

const ALERT_INITIALSTATE = [];

const alertReducer = (state = ALERT_INITIALSTATE, action) => {
  
  switch (action.type) {
    case SET_ALERT:
      return [...state, action.payload];

    case REMOVE_ALERT:
      return state.filter((alert) => alert.id !== action.payload);
    default:
      return state;
  }
};

export default alertReducer;
