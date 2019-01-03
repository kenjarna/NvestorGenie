import React, { Component } from 'react';

import './App.css';

import Main from './Main'

class App extends Component {
  constructor() {
    super()

    this.state = {
      analyzedPortfolio: {},
    }
  }

  //Action handed to StockFetcher component to set app's state to the filtered stock information
  updatePortfolio = (filtereddata) =>  {
    this.setState({analyzedPortfolio:filtereddata});
  }
  
  render() {
    const actions = {
      updatePortfolio: this.updatePortfolio,
    }
    return (
      
      <div className="App">
        <Main 
          {...actions}
          {...this.state}
        />
      </div>
    );
  }
}

export default App;
