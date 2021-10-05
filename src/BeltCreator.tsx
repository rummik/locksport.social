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
    <Box sx={{ m: 'auto', display: 'flex', flexDirection: 'column', textAlign: 'center' }}>
      <Paper sx={{ m: 'auto', p: 1, width: 'min-content' }}>
        <ColorBox value={value} onChange={setValue} palette={palette} disableAlpha />
      </Paper>
      <Box sx={{ maxHeight: '100vh', overflow: 'hidden' }}>
        <img src={`/api/belt?color=${color}`} alt="Belt" style={{ margin: '-120px 0' }} />
      </Box>
    </Box>
  );
}
