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
        this.filterStock(ticker)
        // this.props.updatefilteredPortfolio(ticker);

        ev.target.reset();
    }

    filterStock = async symbol => {
        console.log(symbol)
        let data = axios.get('https://api.iextrading.com/1.0/stock/'+ symbol + '/batch?types=quote')
                    .then(response => { 
                        const filteredPortfolio = this.state.filteredPortfolio;
                        filteredPortfolio[symbol] = response.data.quote;
                        this.setState({filteredPortfolio})});
        this.props.updatePortfolio(this.state.filteredPortfolio)
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