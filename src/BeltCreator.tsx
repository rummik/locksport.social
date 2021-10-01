import { useState } from 'react';
import { useDebounce } from 'use-debounce';

import {
  Box,
  Paper,
} from '@mui/material';

import { ColorBox, createColor } from 'material-ui-color';

const palette = {
  white: 'white',
  yellow: 'yellow',
  orange: 'orange',
  green: 'green',
  blue: 'blue',
  purple: 'purple',
  brown: 'brown',
  red: 'red',
  black: 'black',
};

export default function BeltCreator() {
  const [ value, setValue ] = useState(createColor('white'));
  const [ color ] = useDebounce(value.hex, 100);

  return (
    <Box>
      <Paper sx={{ m: 1, mr: 2, p: 1, width: 'min-content', float: 'left' }}>
        <ColorBox value={value} onChange={setValue} palette={palette} disableAlpha />
      </Paper>
      <Box sx={{ overflow: 'auto', maxHeight: '100vh' }}>
        <img src={`/api/belt?color=${color}&${Math.random()}`} alt="Belt" />
      </Box>
    </Box>
  );
}
