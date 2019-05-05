import React from 'react';
import { DatePicker } from 'material-ui-pickers';
import moment from 'moment';

/* MUI Components */
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';

const DateOnlyInput = ({
  input: { onChange, value, ...restInput }, meta: { touched, error },
  ...rest
}) => {
  return (
    <FormControl fullWidth>
      <DatePicker
        error={touched && !!error}
        onChange={onChange}
        format="YYYY-MM-DD"
        value={value ? moment(value) : null}
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

export default DateOnlyInput;