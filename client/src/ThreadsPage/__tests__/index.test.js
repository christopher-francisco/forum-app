import React from 'react';
import { mount } from 'enzyme';

import ThreadsPage from '../index.js';

/**
 * FIXME:
 * Network call is being made on `actions.fetchThreads()` call
 */
describe('<ThreadsPage />', () => {
  it('renders without crashing', () => {
    const dispatchSpy = jest.fn();
    const store = createMockStore({
      dispatch: dispatchSpy,
      state: {
        threads: {
          isFetching: true,
          threads: [ 'foo', 'bar' ],
        },
      },
    });
    const connectedThreadPage = withProvider(ThreadsPage, store);

    const wrapper = mount(connectedThreadPage);

    expect(wrapper.find(ThreadsPage)).toHaveLength(1);
    expect(wrapper.find('div')).toBePresent();
    expect(wrapper.find('pre')).toBePresent();

    expect(dispatchSpy).toBeCalled();
  });
});
