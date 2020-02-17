import React, {Fragment} from 'react';

import{
  CssBaseline,
} from '@material-ui/core'; 

import AppHeader from './components/AppHeader';
import Home from './components/home';


const App = () => (
  <Fragment>
    <CssBaseline />
    <AppHeader />
    <Home />
  </Fragment>
);

export default App;
