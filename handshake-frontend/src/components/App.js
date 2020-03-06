import React, { Component } from 'react';
import Main from './Main';
import {BrowserRouter, Switch} from 'react-router-dom';
import "../components/App.css"

class App extends Component {
  render() {
    return(
      <BrowserRouter>
        <Switch>
        <div>
          <Main/>
        </div>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;