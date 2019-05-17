import React, { Component } from 'react';
import MUIPlacesAutocomplete from 'mui-places-autocomplete';
import Script from 'react-load-script';

/* MUI Components */
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';

class PlaceInput extends Component {
  state = {
    scriptLoaded: false
  }

  handleScriptLoad = () => {
    this.setState({
      scriptLoaded: true
    })
  }

  render() {
    const { input, onSuggestionSelected, createAutocompleteRequest, meta: { touched, error }, ...other } = this.props;
    return (
      <FormControl margin="normal" fullWidth>
        <Script
          url={`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&libraries=places`}
          onLoad={this.handleScriptLoad}
        />
        {
          this.state.scriptLoaded &&
          <MUIPlacesAutocomplete
            textFieldProps={{ ...input, ...other }}
            error={touched && !!error}
            onSuggestionSelected={onSuggestionSelected}
            createAutocompleteRequest={createAutocompleteRequest}
            renderTarget={() => (<div />)}
          />
        }
        {
          touched &&
          error &&
          <FormHelperText style={{ color: '#f44336' }}>{error}</FormHelperText>
        }
      </FormControl>
    )
  }
}

export default PlaceInput;