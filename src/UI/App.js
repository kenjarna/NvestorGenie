import React, { Component } from 'react';
import '../StyleSheets/App.css';
import Main from './Main'

class App extends Component {
    constructor() {
        super()
    
        this.state = {
            portfolio: {},
        }

        this.updatePortfolio = this.updatePortfolio.bind(this);
    }

    //Action handed to StockFetcher component to set app's state to the filtered stock information
    updatePortfolio = (data) =>  {
        this.setState({ portfolio: data });  
    }

    removeStock = (ticker) => {
        const stocks = { ...this.state.portfolio };
        delete stocks[ticker];
    }
        
    render() {
    const actions = {
        updatePortfolio: this.updatePortfolio,
        removeStock: this.removeStock
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
