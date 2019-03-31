import React, { Component } from 'react';
import '../StyleSheets/App.css';
import Main from './Main'
import Portfolio from '../LogicComponents/Portfolio';

class App extends Component {
    constructor() {
        super()
    
        this.state = {
            portfolios: {},
            currentPortfolio: new Portfolio(),
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

    setCurrentPortfolio = (portfolio) => {
        this.setState({currentPortfolio: portfolio});
    }
        
    render() {
    const actions = {
        savePortfolio: this.savePortfolio,
        removeStock: this.removeStock,
        setCurrentPortfolio: this.setCurrentPortfolio,
    }
    return (
      
        <div className="App">
        <Main 
            {...actions}
            portfolios = {this.state.portfolios}
            currentPortfolio = {this.state.currentPortfolio}
        />
        </div>
    );
    }
}

export default App;
