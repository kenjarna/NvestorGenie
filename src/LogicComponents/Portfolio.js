import Stock from './Stock.js';

export default class Portfolio {
    constructor(title = '', comments = ''){
        this.stockList = {};
        this.totalValue = 0;
        this.title = title;
        this.lastModified = Date(Date.now());
        this.comments = comments;
        this.id = id;

        id++;
    }
    addStock(ticker, numshares, growth) {
        let stock = new Stock(ticker, numshares, growth);
        this.stockList[ticker] = stock;  
    }
    //This function should update the stock information of all stocks in the portfolio
    async updatePortfolio() {
        let keys = Object.keys(this.stockList);
        this.lastModified = Date(Date.now());
        this.totalValue = 0;
        for (let stock of keys) {
            await this.stockList[stock].fetchStockInfo();
            this.totalValue += this.stockList[stock].investmentAmount;
        }   
        this.analyzePortfolio();
    }
    analyzePortfolio() {
        let keys = Object.keys(this.stockList);
        this.lastModified = Date(Date.now());
        for (let stock of keys) {
            this.stockList[stock].analyzeStock(this.totalValue);
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
