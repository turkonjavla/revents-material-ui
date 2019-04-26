import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { compose } from 'redux';
import { connect } from 'react-redux';

/* Test Actions */
import { incrementCounter, decrementCounter } from './testActions';

class TestComponent extends Component {
  render() {
    const { data, incrementCounter, decrementCounter } = this.props;
    return (
      <div style={{padding: '4em'}}>
        <h1>Test Area</h1>
        <h2>{data}</h2>
        <Button onClick={incrementCounter} variant="outlined" color="primary">Increment</Button>
        <Button onClick={decrementCounter} variant="outlined" color="secondary">Decrement</Button>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  data: state.test.data
})

const actions = {
  incrementCounter,
  decrementCounter
}

export default compose(
  connect(mapStateToProps, actions)
)(TestComponent);