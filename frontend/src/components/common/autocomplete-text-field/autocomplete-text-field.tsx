import React, { FC } from 'react';

import { TextField, TextFieldProps } from '@mui/material';
import './styles.scss';

const AutocompleteTextField: FC<TextFieldProps> = (props) => {
  return <TextField id="outlined-basic" {...props} />;
};

export { AutocompleteTextField };
