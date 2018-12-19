import React, { Component } from 'react';

import './App.css';

import Main from './Main'

class App extends Component {
  constructor() {
    super()

    this.state = {
      portfolio: {
        'name': "Amazon",
        'ticker': "AMZN",
        'price': 1548.22,
        'lastUpdate': Date(Date.now())
      }
    }
  }
  render() {
    return (
      <div className="App">
        <Main {...this.state}/>
      </div>
    );
  }
}

export default App;
