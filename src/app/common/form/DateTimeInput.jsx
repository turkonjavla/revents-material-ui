import React from 'react';
import { DateTimePicker } from 'material-ui-pickers';
import moment from 'moment';

/* MUI Components */
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';

const DateInput = ({
  input: { onChange, value, ...restInput }, meta: { touched, error },
  ...rest
}) => {
  return (
    <FormControl margin="normal" fullWidth>
      <DateTimePicker
        clearable
        keyboard
        error={touched && !!error}
        onChange={onChange}
        format="YYYY-MM-DD HH:mm"
        value={value ? moment(value) : null}
        mask={[
          /\d/,
          /\d/,
          /\d/,
          /\d/,
          "-",
          /\d/,
          /\d/,
          "-",
          /\d/,
          /\d/,
          " ",
          /\d/,
          /\d/,
          ":",
          /\d/,
          /\d/
        ]}
        {...rest}
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