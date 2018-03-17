import React from 'react';

import ThreadListItem from './ThreadListItem';

const ThreadList = ({ threads }) => (
  <div>
    { threads.map(thread =>
      <ThreadListItem key={ thread.id } thread={ thread } />
    )}
  </div>
);

export default ThreadList;
