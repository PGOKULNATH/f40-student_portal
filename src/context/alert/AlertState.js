import React, {useReducer} from 'react';
import AlertContext from './alertContext';
import AlertReducer from  './alertReducer';
import {
  SET_ALERT,
  REMOVE_ALERT
} from '../types';

const AlertState = props => {
  const initialState = null;

  const [state, dispatch] = useReducer(AlertReducer, initialState);

  const setAlert = (msg, timeout = 3000) => {
    dispatch({
      type : SET_ALERT,
      payload : msg
    });

    setTimeout(() => {
      dispatch({type : REMOVE_ALERT})
    }, timeout);
  };

  return(
    <AlertContext.Provider
      value={{
        alerts : state,
        setAlert
      }}>
      {props.children}
    </AlertContext.Provider>
  )
};

export default AlertState;
