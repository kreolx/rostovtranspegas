import React, { Component } from 'react';
import {Header} from './header/header';
import { Body } from './body/body';
import {Calculator} from './calculator/calculator';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';

class App extends Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <Header/>
          <Body />
          <Calculator />
        </div>
      </div>
    );
  }
}

export default App;
