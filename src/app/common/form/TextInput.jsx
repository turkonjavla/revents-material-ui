import React from 'react';

/* MUI Components */
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';

const TextInput = ({ input, type, label, meta: { touched, error }, ...custom }) => {
  return (
    <FormControl margin="normal" fullWidth>
      <TextField
        type={type}
        label={label}
        error={touched && !!error}
        {...input}
        {...custom}
      />
      {
        touched &&
        error &&
        <FormHelperText style={{ color: '#f44336' }}>{error}</FormHelperText>
      }
    </FormControl>
  )
}

export default TextInput
