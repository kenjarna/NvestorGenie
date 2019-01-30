import React, {Component} from 'react';
import Portfolio from './Portfolio.js';

let portfolio = new Portfolio();
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

        let ticker = document.getElementById('stock-ticker').value.toUpperCase();
        let shares = document.getElementById('num-shares').value;
        
        portfolio.addStock(ticker, shares);
        this.setState({ filteredPortfolio: portfolio })
        console.log(portfolio);

        ev.target.reset();
    }

    componentDidUpdate() {
        let stockList = portfolio.stockList;
        let totalAmount = 0;
        for (let i in stockList) {
            totalAmount += stockList[i].investmentAmount;
        }
        console.log(totalAmount);
        //this.setState({ totalInvestment: totalAmount });
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