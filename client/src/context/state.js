import React, {useReducer} from 'react';
import {HeroContext} from './index';
import {
  FETCH_DATA_ERROR,
  FETCH_DATA_START,
  FETCH_DATA_SUCCESS,
  SET_LOADING,
} from './actionTypes';
import {HeroReducer} from './reducer';
import {httpHelper} from '../helpers/httpHelper';

export const HeroState = ({children}) => {
  const initialState = {
    heroes: [],
    loading: false,
    error: null,
  };

  const [state, dispatch] = useReducer(HeroReducer, initialState);

  const fetchData = async () => {
    dispatch({
      type: FETCH_DATA_START,
    });
    try {
      const {data} = await httpHelper('/api');
      dispatch({
        type: FETCH_DATA_SUCCESS,
        payload: data
      });
    } catch (e) {
      console.error(e);
      dispatch({
        type: FETCH_DATA_ERROR,
        payload: e
      });
    }
  };

  const toggleLoading = loading => {
    dispatch({
      type: SET_LOADING,
      payload: loading
    });
  };

  return (
    <HeroContext.Provider
      value={{...state, fetchData, toggleLoading}}>
      {children}
    </HeroContext.Provider>
  );
};
