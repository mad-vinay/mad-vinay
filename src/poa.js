import React from 'react';
import './index.css';
import { BrowserRouter as Router } from 'react-router-dom';
import store from '../src/store';
import { Provider } from 'react-redux'
import baseTheme from './themes/baseTheme'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import AppRouter from './poarouter';
const theme = createMuiTheme(baseTheme);

const App = ({country}) => (
    <MuiThemeProvider theme={theme}>
        <Provider store={store}>
            <Router>
                <AppRouter country={country} />
            </Router>
        </Provider>
    </MuiThemeProvider>
);

export default App;