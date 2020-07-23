import {
  FETCH_DATA_ERROR,
  FETCH_DATA_START,
  FETCH_DATA_SUCCESS,
  SET_LOADING,
} from './actionTypes';

export const HeroReducer = (state, {type, payload}) => {
  switch (type) {
    case FETCH_DATA_START:
      return {
        ...state, loading: true
      };
    case FETCH_DATA_SUCCESS:
      return {
        ...state,
        heroes: payload,
        loading: false,
        error: false,
      };
    case FETCH_DATA_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };

    case SET_LOADING:
      return {
        ...state,
        loading: payload,
      };
    default:
      return {
        ...state
      };
  }
};
