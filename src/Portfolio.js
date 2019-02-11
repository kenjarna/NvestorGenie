import Stock from './Stock.js';

export default class Portfolio {
    constructor(){
        this.stockList = {};
        this.totalValue = 0;
    }
    addStock(ticker, numshares) {
        let stock = new Stock(ticker, numshares);
        this.stockList[ticker] = stock;  
    }
    //This function should update the stock information of all stocks in the portfolio
    updatePortfolio() {
        let keys = Object.keys(this.stockList);
        for (let i = 0; i < keys.length; i = i + 1) {
            console.log(this.stockList[keys[i]]);
        }
    }
    resetPortfolio() {
        this.stockList = {};
        this.totalValue = 0;
    }
}
