import React, {Component} from 'react';
import axios from 'axios';


class StockFetcher extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            filteredPortfolio: {},
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
                    const filteredPortfolio = this.state.filteredPortfolio;
                    const filteredStock = this.filterStock(response.data.quote,numShares)
                    const analyzedStock = this.analyzeStock(filteredStock);
                    filteredPortfolio[symbol] = analyzedStock;
                    this.setState({filteredPortfolio})});
    }

    //Additonal Data needed: 
    /* Beta
    * Expected growth return
    * 1 year expected growth
    * Number of shares purchased
    * 
    */
    filterStock = (data,numShares) => {
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
    analyzeStock = (stockObj) => {
        console.log(stockObj);
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