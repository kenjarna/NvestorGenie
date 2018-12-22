import React, { Component } from 'react';

import './App.css';

import Main from './Main'

class App extends Component {
  constructor() {
    super()

    this.state = {
      portfolio: {},
    }
  }

  //Action handed to StockFetcher component to set app's state to the filtered stock information
  updatePortfolio = (filtereddata) =>  {
    this.setState({portfolio:filtereddata});
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
