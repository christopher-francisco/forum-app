import reducer from '../reducer';
import * as actionTypes from '../actionTypes';

describe('threads reducer', () => {
  it('returns the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      isFetching: false,
      threads: [],
    });
  });

  describe('when modifying the state', () => {
    // We just want to make sure we're not overriding state
    // that we don't intend to override.
    // This approach won't work once Flow is setup
    const initialState = {
      foo: 'bar',
    };

    it('handles FETCH_THREADS', () => {
      const fetchThreadsAction = {
        type: actionTypes.FETCH_THREADS,
      };

      expect(reducer(initialState, fetchThreadsAction)).toEqual({
        ...initialState,
        isFetching: true,
        threads: [],
      });
    });

    it('handles RECEIVE_THREADS', () => {
      const receiveThreadsAction = {
        type: actionTypes.RECEIVE_THREADS,
        payload: { threads: 'foo' },
      };

      expect(reducer(initialState, receiveThreadsAction)).toEqual({
        ...initialState,
        isFetching: false,
        threads: 'foo',
      });
    });

    it('handles FETCH_THREADS_FAILED');
  });
});
