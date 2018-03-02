import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

const ThreadsPage = ({ isFetching, threads }) => {
  return (
    <div>
      <pre>
        Is Fetching: { isFetching ? 'true' : 'false'  },
        Threads: { threads.length }
      </pre>
    </div>
  );
}

const mapStateToProps = state => ({
  isFetching: state.threads.isFetching,
  threads: state.threads.threads,
});

const mapDispatchToProps = dispatch => bindActionCreators({
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ThreadsPage);
