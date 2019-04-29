import React from 'react';

/* MUI Components */
import Select from '@material-ui/core/Select';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel'

const SelectInput = ({ input, label, meta: { touched, error }, children, ...custom }) => {
  return (
    <FormControl margin="normal" fullWidth>
      <InputLabel error={touched && !!error} htmlFor="name-disabled">Category</InputLabel>
      <Select
        value={input.value || null}
        onChange={(e, data) => input.onChange(data.value)}
        error={touched && !!error}
        children={children}
        {...custom}
        {...input}
      />
      {
        touched &&
        error &&
        <FormHelperText style={{color: '#f44336'}}>{error}</FormHelperText>
      }
    </FormControl>
  )
}

export default SelectInput;
