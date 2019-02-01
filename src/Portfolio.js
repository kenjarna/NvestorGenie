import Stock from './Stock.js';

export default class Portfolio {
    constructor(){
        this.stockList = {};
        this.totalValue = 0;
    }
    async addStock(ticker, numshares) {
        /*Should the user already have entered a ticker, remove the initial
        *investmentAmount so that totalValue of the portfolio reflects the 
        *the correct (and soon-to-be-added) investmentAmount of the "new" ticker 
        */
        if (ticker in this.stockList) {
            this.totalValue -= this.stockList[ticker].investmentAmount;
        }
        let stock = new Stock(ticker, numshares);
        await (stock.fetchStockInfo());
        this.stockList[ticker] = stock;
        this.totalValue += this.stockList[ticker].investmentAmount;
    }
    resetPortfolio() {
        this.stockList = {};
        this.totalValue = 0;
    }
}
