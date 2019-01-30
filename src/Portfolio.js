import Stock from './Stock.js';

export default class Portfolio {
    constructor(){
        this.stockList = {};
        this.totalValue = 0;
    }
    async addStock(ticker, numshares) {
        let stock = await( new Stock(ticker, numshares));
        this.stockList[stock.ticker] = stock;
        this.totalValue += stock.investmentAmount;

        
    }
    updateStats() {
        for (let i in this.stockList) {
            this.totalValue += this.stockList[i].investmentAmount;
        }
    }
    resetPortfolio() {
        this.stockList = {};
        this.totalValue = 0;
    }
}