import * as actionTypes from './actionTypes';

export const fetchThreads = () => {
  return async dispatch => {
    dispatch({ type: actionTypes.FETCH_THREADS });

    // TODO: handle error case
    const response = await fetch('/threads');
    const body = await response.json();

    const threads = body.data;

    dispatch({
      type: actionTypes.RECEIVE_THREADS,
      payload: { threads },
    });
  };
};
