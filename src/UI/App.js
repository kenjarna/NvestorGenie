import React, { Component } from 'react';
import '../StyleSheets/App.css';
import Main from './Main'
import Portfolio from '../LogicComponents/Portfolio';
import Stock from '../LogicComponents/Stock';


/* App.js
*   Purpose: To store app state and contain the information pertinent to the app's functionality
*   Result:  Loads previously stored portfolios and allows the user to save new or update older portfolios to the general application
             Controls the flow of information from the top down using React Components
*   Member Functions:
*       componentDidMount      - called when the component mounts to the DOM. Handles loading the information from localStorage when App mounts
*       createPortfolioObjects - helper function for componentDidMount; takes the portfolios stored in the localStorage and converts them back to Portfolio Objects
*       createStockObjects     - similar to createPortfolioObjects, but takes a portfolio's stockList and turns them into Stock Objects
*       savePortfolio          - used to update the app's state from the PortfolioManager to store changes to a portfolio
*       setCurrentPortfolio    - used to tell the PortfolioManager component which portfolio is currently being used/altered by the user
*       saveToLocalStorage     - save the currentPortfolio and portfolios stored in the App's state to the local storage for retrieval later
*/
class App extends Component {
    constructor() {
        super()

        this.state = {
            portfolios: {},
            currentPortfolio: new Portfolio(),
        }
    }

    componentDidMount() {
        if (Object.keys(localStorage.getItem('portfolios')).length !== 2) {
            const portfolios = JSON.parse(localStorage.getItem('portfolios'));
            this.setState({ portfolios: {} });
            let loadedPortfolioList = this.createPortfolioObjects(portfolios);        
            this.setState({
                portfolios: loadedPortfolioList
            });
        }
    }

    createPortfolioObjects = (portfolios) => {
        let loadedPortfolioList = {};
        let loadedPortfolioObj;
        const portfolioKeys = Object.keys(portfolios);
        for (let portfolioId of portfolioKeys) {
            let portfolioObj = portfolios[portfolioId];
            //Each portfolio we find, create a portfolio object from it
            loadedPortfolioList[portfolioId] = new Portfolio(portfolioObj.title, portfolioObj.comments, portfolioObj);
            loadedPortfolioObj = loadedPortfolioList[portfolioId];
            let stockList = this.createStockObjects(loadedPortfolioObj);
            loadedPortfolioObj.stockList = stockList;
        }
        this.createStockObjects(loadedPortfolioObj);
        return loadedPortfolioList;
    }

    createStockObjects = (portfolioObject) => {
        let stockList = {};
        let stockKeys = Object.keys(portfolioObject.stockList);
        for (let stockId of stockKeys) {
            //Each stock we find, create a stock object from it
            let stockObj = portfolioObject.stockList[stockId];
            stockList[stockId] = new Stock(stockObj.ticker, stockObj.numShares, stockObj.growth, stockObj);
        }
        return stockList;
    }

    savePortfolio = (data) => {
        const portfolios = { ...this.state.portfolios };
        if (!Object.keys(portfolios).includes(data.id)) {
            portfolios[data.id] = data;
        }
        this.setState({ portfolios });
        this.saveToLocalStorage();
    }

    saveToLocalStorage = () => {
        localStorage.setItem('portfolios', JSON.stringify(this.state.portfolios));
        localStorage.setItem('currentPortfolio', JSON.stringify(this.state.currentPortfolio));
    }

    removePortfolio = (portfolioObj) => {
        const lessPortfolios = this.state.portfolios;
        const key = Object.keys(lessPortfolios).find(key => lessPortfolios[key] === portfolioObj);
        delete lessPortfolios[key];
        this.setState({portfolio:lessPortfolios});
        this.saveToLocalStorage();
    }
    
    setCurrentPortfolio = (portfolio) => {
        this.setState({ currentPortfolio: portfolio });
    }

    render() {
        const actions = {
            savePortfolio: this.savePortfolio,
            setCurrentPortfolio: this.setCurrentPortfolio,
            removePortfolio: this.removePortfolio,
        }
        return (

            <div className="App">
                <Main
                    {...actions}
                    portfolios={this.state.portfolios}
                    currentPortfolio={this.state.currentPortfolio}
                />
            </div>
        );
    }
}

export default App;
