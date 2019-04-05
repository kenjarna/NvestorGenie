import Stock from './Stock.js';

/* Portfolio.js
*   Purpose: Create portfolio objects
*   Result:  Portfolio objects created and can be manipulated using the webpage
*   Member Functions:
*       addStock                  - add a stock to the active portfolio's stockList object (thus, creating a dictionary of stockObjects)
*       createPortfolioFromObject - given an object reflecting a portfolio, convert it into a Portfolio. Generally used
*                                      to allow loading of portfolio objects as they don't keep the Portfolio prototype upon storage
*       updatePortfolio           - updates the stock information of all stocks in the portfolio. Once the information has been fetched,
*                                      the portfolio analyses the stocks using analyzePortfolio
*       analyzePortfolio          - for every stock in the stockList, analyze the value of the stock. Then, use updatePortfolioReturn to determine
*                                      and set the value of the portfolio's expected annual return
*       updatePortfolioReturn     - calculate/update the portfolio's expected annual return
*       setName                   - save changes from title alterations in the interactive part of the webpage
*       setComments               - save changes from comment alterations in the interactive part of the webpage
*       resetPortfolio            - reset the portfolio to initial values outlined in the constructor
*/

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
