import * as actionTypes from './actionTypes';

const initialState = {
  isFetching: false,
  threads: [],
};

export default (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.FETCH_THREADS:
      return {
        ...state,
        isFetching: true,
        threads: [],
      };

    case actionTypes.RECEIVE_THREADS:
      return {
        ...state,
        isFetching: false,
        threads: action.payload.threads,
      };

    default:
      return state;
  }
};
