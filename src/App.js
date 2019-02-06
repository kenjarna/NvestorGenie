import React, { Component } from 'react';
import './App.css';
import Main from './Main'
import Portfolio from './Portfolio';

class App extends Component {
  constructor() {
    super()
    
      this.state = {
          portfolio: new Portfolio()  
      }

      this.updatePortfolio = this.updatePortfolio.bind(this);
  }

  //Action handed to StockFetcher component to set app's state to the filtered stock information
  updatePortfolio = (data) =>  {
      this.setState({ portfolio: data });
      
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
