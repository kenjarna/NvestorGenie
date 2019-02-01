import axios from 'axios';

const baseAPILink = 'https://api.iextrading.com/1.0/stock/';
const quoteLink = '/batch?types=quote';
const stockStatsLink = '/stats';

export default class Stock{
    
    constructor(symbol, shares) {
        this.ticker = symbol;
        this.numShares = shares;
        this.companyName = '';
        this.latestTime = 0;
        this.primaryExchange = 0;
        this.latestPrice = 0;
        this.PERatio = 0;
        this.week52High = 0;
        this.week52Low = 0;
        this.ytdChange = 0;
        this.closePrice = 0;
        this.openPrice = 0;
        this.beta = 0;
        this.dividendRate = 0;
        this.dividendYield = 0;
        this.latestEPS = 0;
        this.latestEPSDate = 0;
        this.investmentAmount = 0;  
    }
    async fetchStockInfo() {
        //Need to handle when the ticker symbol is not found. 
        // Not sure what payload is delivered in this case.
        try {
            await(axios.get(this.buildLink('quote', this.ticker))
                .then(response => {
                    this.setStockInfo(response);
                }));
            await(axios.get(this.buildLink('stats',this.ticker))
                .then(response => {
                    this.setStockInfo(response);
                }));

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
    setStockInfo(fetchedInfo) {
        //If the data has a quote object, the information is from the first request.
        if (fetchedInfo.data.quote != null) {
            this.setStats(fetchedInfo.data.quote);
        }
        //If the data has an EBITDA attribute, the information is from the second request.
        else if (fetchedInfo.data.EBITDA != null) {
            this.setStats(fetchedInfo.data);
        } 
    }


    setStats(stats) {
        if (stats.latestTime != null) {
            this.companyName = stats.companyName;
            this.latestTime = stats.latestTime;
            this.primaryExchange = stats.primaryExchange;
            this.latestPrice = stats.latestPrice;
            this.PERatio = stats.peRatio;
            this.week52High = stats.week52High;
            this.week52Low = stats.week52Low;
            this.ytdChange = stats.ytdChange;
            this.closePrice = stats.close;
            this.openPrice = stats.open;
            this.investmentAmount = this.latestPrice * this.numShares;
        }
        else if (stats.beta != null) {
            this.beta = stats.beta;
            this.dividendRate = stats.dividendRate;
            this.dividendYield = stats.dividendYield;
            this.latestEPS = stats.latestEPS;
            this.latestEPSDate = stats.latestEPSDate;
        }   
    }
}

