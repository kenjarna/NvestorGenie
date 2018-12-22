import React, { Component } from 'react';
import axios from 'axios';

import './App.css';

import Main from './Main'

class App extends Component {
  constructor() {
    super()

    this.state = {
      portfolio: {},
    }
  }

  updatePortfolio = async symbol =>  {
    let data = await axios.get('https://api.iextrading.com/1.0/stock/aapl/batch?types=quote')
              .then(response => { 
                  const portfolio = this.state.portfolio;
                  portfolio['AAPL'] = response.data.quote;
                  this.setState({portfolio})});
    let data2 = await axios.get('https://api.iextrading.com/1.0/stock/amzn/batch?types=quote')
              .then(response => { 
                  const portfolio = this.state.portfolio;
                  portfolio['AMZN'] = response.data.quote;
                  this.setState({portfolio})});
  }
  
  render() {
    const actions = {
      updatePortfolio: this.updatePortfolio,
    }
    console.log(this.state.portfolio)
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
