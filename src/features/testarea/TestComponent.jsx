import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux'

class TestComponent extends Component {
  render() {
    const { data } = this.props;
    return (
      <div style={{padding: '4em'}}>
        <h1>Test Area</h1>
        <h2>{data}</h2>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  data: state.test.data
})

export default compose(
  connect(mapStateToProps)
)(TestComponent);