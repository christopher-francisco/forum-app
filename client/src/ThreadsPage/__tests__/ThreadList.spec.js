import React from 'react';
import { shallow } from 'enzyme';

import ThreadList from '../ThreadList';
import ThreadListItem from '../ThreadListItem';

describe('<ThreadList />', () => {
  it('renders as many <ThreadListItem /> as threads', () => {
    const threads = Array.from(Array(3), (e, i) => ({ id: i }));

    const wrapper = shallow(<ThreadList threads={ threads } />);

    expect(wrapper.find(ThreadListItem)).toHaveLength(3);
  });
});
