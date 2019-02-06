import Stock from './Stock.js';

export default class Portfolio {
    constructor(){
        this.stockList = {};
        this.totalValue = 0;
    }
    //Make this function synchronous
    async addStock(ticker, numshares) {
        /*Should the user already have entered a ticker, remove the initial
        *investmentAmount so that totalValue of the portfolio reflects the 
        *the correct (and soon-to-be-added) investmentAmount of the "new" ticker 
        */
        //if (ticker in this.stockList) {
        //    this.totalValue -= this.stockList[ticker].investmentAmount;
        //}
        let stock = new Stock(ticker, numshares);
        this.stockList[ticker] = stock;
        stock = await (stock.fetchStockInfo());

        this.updatePortfolio();
        
    }
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
