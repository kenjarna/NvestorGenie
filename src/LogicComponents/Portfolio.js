import Stock from './Stock.js';

export default class Portfolio {
    constructor(title = '', comments = '', object = null) {
        this.stockList = {};
        this.totalValue = 0;
        this.title = title;
        this.lastModified = Date(Date.now());
        this.comments = comments;
        this.id = id;
        this.expectedAnnualReturn = 0;

        this.createPortfolioFromObject(object);

        id++;
    }
    addStock(ticker, numshares, growth) {
        let stock = new Stock(ticker, numshares, growth);
        this.stockList[ticker] = stock;
    }
    createPortfolioFromObject(object) {
        if (object === null) { return; }
        else {
            this.stockList = object.stockList;
            this.totalValue = object.totalValue;
            this.lastModified = object.lastModified;
            this.expectedAnnualReturn = object.expectedAnnualReturn;
        }
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
        this.updatePortfolioReturn();
    }
    updatePortfolioReturn() {
        let keys = Object.keys(this.stockList);
        this.expectedAnnualReturn = 0;
        for (let stock of keys) {
            this.expectedAnnualReturn += this.stockList[stock].expectedReturn * this.stockList[stock].portionOfPortfolio;
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
        this.expectedAnnualReturn = 0;
    }
}

var id = 0;
