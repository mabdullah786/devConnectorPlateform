import { REMOVE_ALERT, SET_ALERT } from '../types/alert';
import { v4 as uuidv4 } from 'uuid';

export const set_alert = (alertType, msg) => ({ getState, dispatch }) => {
  const uniqueId = uuidv4();
  dispatch({
    type: SET_ALERT,
    payload: {
      alertType,
      msg,
      id: uniqueId,
    },
  });

  setTimeout(() => {
    dispatch({
      type: REMOVE_ALERT,
      payload: uniqueId,
    });
  }, 3000);
};
