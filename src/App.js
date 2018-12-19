import React, { Component } from 'react';
import axios from 'axios';

import './App.css';

import Main from './Main'

class App extends Component {
  constructor() {
    super()

    this.state = {
      portfolio: [],
    }
  }

  updatePortfolio = async symbol =>  {
    let data = await axios.get('https://api.iextrading.com/1.0/stock/aapl/batch?types=quote')
              .then(response => { 
                  const portfolio = this.state.portfolio;
                  portfolio['AAPL'] = response.data.quote;
                  this.setState({portfolio})});
  }
  
  render() {
    return (
      <div className="App">
        <button onClick={this.updatePortfolio}>Click Me!</button>
        <Main {...this.state}/>
      </div>
    );
  }
}

export default App;
