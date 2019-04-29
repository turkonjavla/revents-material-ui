import React from 'react';
import { DateTimePicker  } from 'material-ui-pickers';

/* MUI Components */
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';

const DateInput = ({
  type,
  input: { onChange, value, ...restInput },
  meta: { touched, error },
  ...rest
}) => {
  return (
    <FormControl margin="normal" fullWidth>
      <DateTimePicker
        clearable
        {...rest}
        error={Boolean(touched && !!error)}
        onChange={onChange}
        value={value === '' ? null : value}
        {...restInput}
      />
      {
        touched &&
        error &&
        <FormHelperText style={{ color: '#f44336' }}>{error}</FormHelperText>
      }
    </FormControl>
  )
}

export default DateInput;