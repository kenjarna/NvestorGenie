import axios from 'axios';

export default class Stock {
    constructor(symbol,shares) {
        this.ticker = symbol;
        this.numShares = shares;
        this.companyName = null;
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

        this.fetchStockInfo();
    }
    async fetchStockInfo() {
        //Need to handle when the ticker symbol is not found. 
        // Not sure what payload is delivered in this case.
        try {
            axios.get('https://api.iextrading.com/1.0/stock/' + this.ticker + '/batch?types=quote')
                .then(response => {
                    this.setStockInfo(response);
                });
        } catch (err) { console.log(err);}
            
    }
    setStockInfo(fetchedInfo) {
        const basicStats = fetchedInfo.data.quote;
        this.setStats(basicStats);
    }

    setStats(stats) {
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
}

