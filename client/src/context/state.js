import React, {useReducer} from 'react';
import {HeroContext} from './context';
import {
  FETCH_DATA_ERROR,
  FETCH_DATA_START,
  FETCH_DATA_SUCCESS,
  SET_LOADING,
} from './actionTypes';
import {HeroReducer} from './reducer';


const HttpHelper = ()=>{}

export const HeroState = ({children}) => {
  const initialState = {
    heroes: [1,2,3],
    loading: false,
    error: null,
  };

  const [state, dispatch] = useReducer(HeroReducer, initialState);

  const fetchData = async () => {
    dispatch({
      type: FETCH_DATA_START,
    });
    try {
      const data = await HttpHelper();
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

  const changeLoading = () => {
    dispatch({
      type: SET_LOADING
    });
  };

  return (
    <HeroContext.Provider
      value={{...state, fetchData, changeLoading}}>
      {children}
    </HeroContext.Provider>
  );
};
