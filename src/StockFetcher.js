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
        this.saveStockInfo(ticker)

        ev.target.reset();
    }

    saveStockInfo = async symbol => {
        axios.get('https://api.iextrading.com/1.0/stock/'+ symbol + '/batch?types=quote')
                .then(response => { 
                    const filteredPortfolio = this.state.filteredPortfolio;
                    const filteredStock = this.filterStock(response.data.quote)
                    filteredPortfolio[symbol] = filteredStock;
                    this.setState({filteredPortfolio})});
        this.props.updatePortfolio(this.state.filteredPortfolio)
    }

    filterStock = (data) => {
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
        };
        return stock;
    }

    render() {
        return (
            <div>
                <p>Testing StockFetcher (for IEXFinance API)</p>
                <form className="stock-ticker-form" onSubmit={this.handleFormSubmit.bind(this)}>
                    <input className="stock-ticker" id ="stock-ticker" placeholder="Enter a stock symbol . . ."/>
                    <input type="submit"/>
                </form>
            </div>
        )
    }
}


export default StockFetcher