import React from 'react';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Provider } from 'react-redux';
import 'jest-enzyme';

configure({ adapter: new Adapter() });

/**
 * TODO:
 * remove from globals into a utils class
 */
const createMockStore = ({
  dispatch = jest.fn(),
  state = {}
}) => ({
  default: () => {},
  subscribe: () => {},
  dispatch,
  getState: () => state,
});

const withProvider = (WrappedComponent, store) => (
  <Provider store={ store }>
    <WrappedComponent />
  </Provider>
);

global.createMockStore = createMockStore;
global.withProvider = withProvider;
