import React, { Component } from 'react';
import { geocodeBySuggestion } from 'mui-places-autocomplete';
import PlacesAutocomplete from 'react-places-autocomplete';

/* MUI Components */
import Button from '@material-ui/core/Button';

/* Redux */
import { compose } from 'redux';
import { connect } from 'react-redux';

/* Test Actions */
import { incrementCounter, decrementCounter } from './testActions';

/* Modals */
import { openModal } from '../modals/modalActions';

class TestComponent extends Component {
  static defaultProps = {
    center: {
      lat: 59.95,
      lng: 30.33
    },
    zoom: 11
  };

  state = {
    open: false,
    address: '',
    errorMessage: null,
    scriptLoaded: false
  }

  onClose() {
    this.setState({ open: false, coordinates: null, errorMessage: null })
  }

  onSuggestionSelected = (suggestion) => {
    geocodeBySuggestion(suggestion).then((results) => {
      const { geometry } = results[0]
      const address = {
        lat: geometry.location.lat(),
        lng: geometry.location.lng(),
      }
      this.setState({ open: true, address })
    }).catch((err) => {
      this.setState({ open: true, errorMessage: err.message })
    })
  }

  handleScriptLoad = () => {
    this.setState({
      scriptLoaded: true
    })
  }

  onChange = address => this.setState({ address })

  render() {
    const { data, incrementCounter, decrementCounter, openModal } = this.props;
    const inputProps = {
      value: this.state.address,
      onChange: this.onChange
    }
    return (
      <div style={{ padding: '4em' }}>
        {/*         <Script
          url="https://maps.googleapis.com/maps/api/js?key=AIzaSyDta0x7RCcbBQdsQwvC5KjtXf00xxAKt1s&libraries=places"
          onLoad={this.handleScriptLoad}
        /> */}
        <h1>Test Area</h1>
        <h2>{data}</h2>
        <Button onClick={incrementCounter} variant="outlined" color="primary">Increment</Button>
        <Button onClick={decrementCounter} variant="outlined" color="secondary">Decrement</Button>
        <br />
        <br />
        <div>
          {
            this.state.scriptLoaded &&
            <PlacesAutocomplete
              inputProps={inputProps}
            />
          }
        </div>
{/*         <div style={{ height: '300px', width: '100%' }}>
          <GoogleMapReact
            bootstrapURLKeys={{ key: 'AIzaSyDta0x7RCcbBQdsQwvC5KjtXf00xxAKt1s' }}
            defaultCenter={this.props.center}
            defaultZoom={this.props.zoom}
          >
            <Marker
              lat={59.955413}
              lng={30.337844}
              text="My Marker"
            />
          </GoogleMapReact>
        </div> */}
        <Button onClick={() => openModal('TestModal', { data: 42 })}>Open modal</Button>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  data: state.test.data
})

const actions = {
  incrementCounter,
  decrementCounter,
  openModal
}

export default compose(
  connect(mapStateToProps, actions)
)(TestComponent);