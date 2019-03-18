import axios from 'axios';

const baseAPILink = 'https://api.iextrading.com/1.0/stock/';
const quoteLink = '/batch?types=quote';
const stockStatsLink = '/stats';

export default class Stock{
    
    constructor(symbol, shares) {
        this.ticker = symbol;
        this.numShares = shares;
        this.companyName = '';
        this.latestTime = null;
        this.primaryExchange = null;
        this.latestPrice = null;
        this.PERatio = null;
        this.week52High = null;
        this.week52Low = null;
        this.ytdChange = null;
        this.closePrice = null;
        this.openPrice = null;
        this.beta = null;
        this.dividendRate = null;
        this.dividendYield = null;
        this.latestEPS = null;
        this.latestEPSDate = null;
        this.investmentAmount = null;  
    }

    //Look into observer methods to automatically update the portfolio's values when Stock object changes
    //Can fake the axios request to test the async
    async fetchStockInfo() {
        //Need to handle when the ticker symbol is not found. 
        // Not sure what payload is delivered in this case.
        try {
            let quote = await (axios.get(this.buildLink('quote', this.ticker)));
            let stats = await (axios.get(this.buildLink('stats', this.ticker)));
            this.setBasicStats(quote);
            this.setStockInfo(stats);

        } catch (err) { console.log(err);}
            
    }
    buildLink(type,ticker) {
        if (type === 'quote') {
            return baseAPILink + ticker + quoteLink;
        }
        else if (type === 'stats') {
            return baseAPILink + ticker + stockStatsLink;
        }
    }
    //Setup a spy to determine if this method was called (by the fetchStockInfo fcn)
    setBasicStats(quote) {
        this.companyName = quote.companyName;
        this.latestTime = quote.latestTime;
        this.primaryExchange = quote.primaryExchange;
        this.latestPrice = quote.latestPrice;
        this.PERatio = quote.peRatio;
        this.week52High = quote.week52High;
        this.week52Low = quote.week52Low;
        this.ytdChange = quote.ytdChange;
        this.closePrice = quote.close;
        this.openPrice = quote.open;
        this.investmentAmount = this.latestPrice * this.numShares;
    }


    setStockInfo(stats) {
        this.beta = stats.beta;
        this.dividendRate = stats.dividendRate;
        this.dividendYield = stats.dividendYield;
        this.latestEPS = stats.latestEPS;
        this.latestEPSDate = stats.latestEPSDate;    
    }
}
