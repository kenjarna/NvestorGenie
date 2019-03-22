import Stock from './Stock.js';

export default class Portfolio {
    constructor(title = '', comments = ''){
        this.stockList = {};
        this.totalValue = 0;
        this.title = title;
        this.lastModified = null;
        this.comments = comments;
        this.id = id;

        id++;
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
    setName(name) {
        this.title = name;
        this.lastModified = Date(Date.now());
    }
    setComments(comment) {
        this.comments = comment;
        this.lastModified = Date(Date.now());
    }
    resetPortfolio() {
        this.stockList = {};
        this.totalValue = 0;
        this.lastModified = Date(Date.now());
        this.comments = "";
        this.title = "";
    }
}

var id = 0;
