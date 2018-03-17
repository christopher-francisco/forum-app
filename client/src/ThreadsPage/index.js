import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { fetchThreads } from './actions';

class ThreadsPage extends React.Component {
  componentDidMount() {
    this.props.fetchThreads();
  }

  render() {
    return (
      <div>
        <pre>
          Is Fetching: { this.props.isFetching ? 'true' : 'false'  },
          Threads: { this.props.threads.length }
        </pre>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isFetching: state.threads.isFetching,
  threads: state.threads.threads,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchThreads,
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ThreadsPage);
