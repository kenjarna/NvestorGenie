import axios from 'axios';

const baseAPILink = 'https://api.iextrading.com/1.0/stock/';
const quoteLink = '/batch?types=quote';
const stockStatsLink = '/stats';

export default class Stock{
    
    constructor(symbol, shares, growth, stockObj = null) {
        this.ticker = symbol;
        this.numShares = shares;
        this.growth = growth;
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
        this.weightedBeta = null;
        this.portionOfPortfolio = null;
        this.expectedGrowthReturn = 0;
        this.expectedRecessionReturn = 0;
        this.expectedReturn = 0;

        this.createStockFromObject(stockObj);
    }

    createStockFromObject(object) {
        console.log(object);
        if (object === null) { return; }
        else {
            this.companyName = object.companyName;
            this.latestTime = object.latestTime;
            this.primaryExchange = object.primaryExchange;
            this.latestPrice = object.latestPrice;
            this.PERatio = object.PERatio;
            this.week52High = object.week52High;
            this.week52Low = object.week52Low;
            this.ytdChange = object.ytdChange;
            this.closePrice = object.closePrice;
            this.openPrice = object.openPrice;
            this.beta = object.beta;
            this.dividendRate = object.dividendRate;
            this.dividendYield = object.dividendYield;
            this.latestEPS = object.latestEPS;
            this.latestEPSDate = object.latestEPSDate;
            this.investmentAmount = object.investmentAmount;
            this.weightedBeta = object.weightedBeta;
            this.portionOfPortfolio = object.portionOfPortfolio;
            this.expectedGrowthReturn = object.expectedGrowthReturn;
            this.expectedRecessionReturn = object.expectedRecessionReturn;
            this.expectedReturn = object.expectedReturn;
        }
    }

    async fetchStockInfo() {
        //Need to handle when the ticker symbol is not found. 
        // Not sure what payload is delivered in this case.
        await axios.get(this.buildLink('quote', this.ticker))
            .then(response => {
                const quote = response.data.quote;
                this.setBasicStats(quote);
            });
        await axios.get(this.buildLink('stats', this.ticker))
            .then(response => {
                const stats = response.data;
                this.setStockInfo(stats);
            });
     
    }
    buildLink(type,ticker) {
        if (type === 'quote') {
            return baseAPILink + ticker + quoteLink;
        }
        else if (type === 'stats') {
            return baseAPILink + ticker + stockStatsLink;
        }
    }
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
    analyzeStock(portion) {
        const growth = this.growth;
        const totalPortfolioValue = portion;
        this.portionOfPortfolio = this.investmentAmount / totalPortfolioValue;
        this.weightedBeta = this.beta * this.portionOfPortfolio;
        this.expectedGrowthReturn = (this.portionOfPortfolio * growth) * 0.8;
        this.expectedRecessionReturn = (this.portionOfPortfolio*-0.2) * 0.2;
        this.expectedReturn = this.expectedGrowthReturn + this.expectedRecessionReturn;
    }
}

