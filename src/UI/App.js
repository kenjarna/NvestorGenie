import React, { Component } from 'react';
import '../StyleSheets/App.css';
import Main from './Main'
import Portfolio from '../LogicComponents/Portfolio';
import Stock from '../LogicComponents/Stock';

class App extends Component {
    constructor() {
        super()

        this.state = {
            portfolios: {},
            currentPortfolio: new Portfolio(),
        }
    }

    componentDidMount() {
        let loadedPortfolioList = {};
        
        if (localStorage.getItem('portfolios')) {
            const portfolios = JSON.parse(localStorage.getItem('portfolios'));
            this.setState({ portfolios: {} });
            const portfolioKeys = Object.keys(portfolios);
            //Must change the portfolios from local storage back into portfolio objects
            for (let portfolioId of portfolioKeys) {
                let stockList = {};
                let portfolioObj = portfolios[portfolioId];
                loadedPortfolioList[portfolioId] = new Portfolio(portfolioObj.title, portfolioObj.comments, portfolioObj);
                let loadedPortfolioObj = loadedPortfolioList[portfolioId];
                
                let stockKeys = Object.keys(loadedPortfolioObj.stockList);
                //Must change the stocks in each portfolio's stockList from local storage back into Stock objects
                for (let stockId of stockKeys) {
                    let stockObj = loadedPortfolioObj.stockList[stockId];
                    stockList[stockId] = new Stock(stockObj.ticker, stockObj.numShares, stockObj.growth, stockObj);
                }

                loadedPortfolioObj.stockList = stockList;
            }
            
            this.setState({
                portfolios: loadedPortfolioList
            });
        }
    }

    //Action handed to StockFetcher component to set app's state to the filtered stock information
    savePortfolio = (data) => {
        const portfolios = { ...this.state.portfolios }
        if(!Object.keys(portfolios).includes(data.id)){
            portfolios[data.id] = data;
        }
        this.setState({ portfolios });
        localStorage.setItem('portfolios', JSON.stringify(this.state.portfolios));
        localStorage.setItem('currentPortfolio', JSON.stringify(this.state.currentPortfolio));
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
