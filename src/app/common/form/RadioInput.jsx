import React from 'react';

/* MUI Components */
import FormControl from '@material-ui/core/FormControl';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const SelectInput = ({ input, type, label }) => {
  return (
    <FormControl component="fieldset">
      <FormControlLabel
        {...input}
        type={type}
        label={label}
        control={<Radio color="primary" />}
      />
    </FormControl>
  )
}

export default SelectInput;
