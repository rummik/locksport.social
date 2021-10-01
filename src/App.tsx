import React, {
  useState,
} from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

import {
  ThemeProvider,
  createTheme,
} from '@mui/material/styles';

import {
  Box,
} from '@mui/material';

import {
  deepPurple,
  blueGrey,
} from '@mui/material/colors';

import logo from './logo.svg';
import './App.css';

import BeltCreator from './BeltCreator';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',

    primary: {
      main: deepPurple[400],
      contrastText: 'rgba(255, 0, 0, 0.2)',
    },

    secondary: blueGrey,

    background: {
      default: blueGrey[800],
      paper: blueGrey[900],
    },

    text: {
      primary: blueGrey[50],
      secondary: blueGrey[100],
    },
  },
});

export default function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <Router>
        <Box sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          height: '100vh',
          bgcolor: 'background.default',
          color: 'text.primary',
        }}>
          <Switch>
            <Route path="/belt-creator">
              <BeltCreator />
            </Route>

            <Route path="/">
              <div className="App">
                <header className="App-header">
                  <img src={logo} className="App-logo" alt="logo" />
                </header>
              </div>
            </Route>
          </Switch>
        </Box>
      </Router>
    </ThemeProvider>
  );
}
