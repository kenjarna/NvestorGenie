import React, {Component} from 'react';
import axios from 'axios';


class StockFetcher extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            filteredPortfolio: {},
            totalInvestment: 0,
        }
    }

    handleFormSubmit(ev) {
        ev.preventDefault();

        var ticker = document.getElementById('stock-ticker').value.toUpperCase();
        var shares = document.getElementById('num-shares').value;
        this.saveStockInfo(ticker,shares);

        ev.target.reset();
    }

    saveStockInfo = async (symbol,numShares) => {
        axios.get('https://api.iextrading.com/1.0/stock/'+ symbol + '/batch?types=quote')
                .then(response => { 
                    const basicStats = response.data.quote;
                    axios.get('https://api.iextrading.com/1.0/stock/'+symbol+'/stats')
                            .then(response => {
                                const investmentAmount = numShares*basicStats.latestPrice;
                                const filteredStock = this.filterStock(basicStats, numShares, response.data,investmentAmount);
                                const analzyedStock = this.analyzeStock(filteredStock);
                            });
        });
    }

    //Additonal Data needed: 
    /* Beta
    * Expected growth return
    * 1 year expected growth
    * Number of shares purchased
    * 
    */
    filterStock = (data,numShares,additionalStats, investmentAmount) => {
        const stock = {
            ticker: data.symbol,
            companyName: data.companyName,
            latestTime: data.latestTime,
            primaryExchange: data.primaryExchange,
            latestPrice: data.latestPrice,
            peRatio: data.peRatio,
            week52High: data.week52High,
            week52Low: data.week52Low,
            ytdChange: data.ytdChange,
            close: data.close,
            open: data.open,
            numShares: numShares,
            beta: additionalStats.beta,
            dividendRate: additionalStats.dividendRate,
            dividendYield: additionalStats.dividendYield,
            latestEPS: additionalStats.latestEPS,
            latestEPSDate: additionalStats.latestEPSDate,
            investmentAmount: investmentAmount,
        };
        return stock;
        
    }

    /* Items to calculate
    * Total Invested
    * Expected Portfolio Beta
    * Calculated Portfolio Expected Return
    * Risk Free Rate
    * Expected Annual Return
    * Expected Market Returns
    * Portion of portfolio
    */
    analyzeStock = (filteredStock) => {
        var totalInvestment = this.state.totalInvestment;

        totalInvestment += filteredStock.investmentAmount;
        this.setState({totalInvestment});

        //Need to update other stocks once this is calculated
        const portionPortfolio = filteredStock.investmentAmount/totalInvestment*100
        filteredStock.portionPortfolio = portionPortfolio;
        console.log('Total:',totalInvestment,' Portion:',portionPortfolio);
    }

    render() {
        return (
            <div>
                <p>Testing StockFetcher (for IEXFinance API)</p>
                <form className="stock-form" onSubmit={this.handleFormSubmit.bind(this)}>
                    <input className="stock-form" id ="stock-ticker" placeholder="Enter a stock symbol . . ." required/>
                    <input className="stock-form" id ="num-shares" placeholder="Enter number of shares . . ." required/>
                    <input type="submit"/>
                </form>
            </div>
        )
    }
}


export default StockFetcher