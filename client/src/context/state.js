import React, {useReducer} from 'react';
import {HeroContext} from './index';
import {
  FETCH_DATA_ERROR,
  FETCH_DATA_START,
  FETCH_DATA_SUCCESS,
  SET_ACTIVE_PAGE,
  SET_LOADING,
} from './actionTypes';
import {HeroReducer} from './reducer';
import {httpHelper} from '../helpers/httpHelper';

export const HeroState = ({children}) => {
  const initialState = {
    heroes: [],
    activePage: 1,
    pages: 1,
    loading: false,
    error: null,
  };

  const [state, dispatch] = useReducer(HeroReducer, initialState);

  const fetchData = async (page = 1) => {
    dispatch({
      type: SET_ACTIVE_PAGE,
      payload: page
    });
    dispatch({
      type: FETCH_DATA_START,
    });
    try {
      const {data} = await httpHelper(`/api/${page}`);
      dispatch({
        type: FETCH_DATA_SUCCESS,
        payload: data
      });
    } catch (e) {
      console.error(e);
      setError(e);
    }
  };

  const setError = err => {
    dispatch({
      type: FETCH_DATA_ERROR,
      payload: err
    });
  };

  const toggleLoading = loading => {
    dispatch({
      type: SET_LOADING,
      payload: loading
    });
  };

  const setActivePage = async page => {
    try {
      await fetchData(page);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <HeroContext.Provider
      value={{...state, fetchData, toggleLoading, setError, setActivePage}}>
      {children}
    </HeroContext.Provider>
  );
};
