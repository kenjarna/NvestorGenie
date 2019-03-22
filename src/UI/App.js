import React, { Component } from 'react';
import '../StyleSheets/App.css';
import Main from './Main'

class App extends Component {
    constructor() {
        super()
    
        this.state = {
            portfolios: {},
        }
    }

    //Action handed to StockFetcher component to set app's state to the filtered stock information
    savePortfolio = (data) => {
        const portfolios = { ...this.state.portfolios }
        if(!Object.keys(portfolios).includes(data.id)){
            portfolios[data.id] = data;
        }
        this.setState({ portfolios });  
    }

    removeStock = (ticker) => {
        const stocks = { ...this.state.portfolio };
        delete stocks[ticker];
    }

    componentWillUpdate
        
    render() {
    const actions = {
        savePortfolio: this.savePortfolio,
        removeStock: this.removeStock
    }
    return (
      
        <div className="App">
        <Main 
            {...actions}
            portfolios = {this.state.portfolios}
        />
        </div>
    );
    }
}

export default App;
