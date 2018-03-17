import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import fetchMock from 'fetch-mock';

import * as actionTypes from '../actionTypes';
import * as actions from '../actions';

const middlewares = [ thunk ];
const mockStore = configureMockStore(middlewares);

describe('threads actions', () => {
  afterEach(() => {
    fetchMock.reset()
    fetchMock.restore()
  });

  it('creates FETCH_THREADS at the begining and RECEIVE_FETCH on success', () => {
    /**
     * FIXME:
     * Abstrack network mock configuration into a utils
     */
    fetchMock
      .getOnce('/threads', {
        body: {
          data: 'foo',
        },
        headers: {
          'content-type': 'application/json',
        },
      });

    const store = mockStore({});

    const expectedActions = [
      { type: actionTypes.FETCH_THREADS },
      { type: actionTypes.RECEIVE_THREADS, payload: { threads: 'foo' } },
    ];

    return store.dispatch(actions.fetchThreads())
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
});
