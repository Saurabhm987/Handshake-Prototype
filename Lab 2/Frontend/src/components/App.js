import React, { Component } from 'react';
import Main from './Main';
import {BrowserRouter, Switch} from 'react-router-dom';
import "../components/App.css"
import store from '../store'
import {Provider} from 'react-redux';

class App extends Component {
  render() {
    return(
      <Provider store = {store}>
            <BrowserRouter>
              <Switch>
              <div>
                <Main/>
              </div>
              </Switch>
            </BrowserRouter>
        </Provider>
    );
  }
}

export default App;