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
        
        this.amendPortfolio(ticker, shares);
        

        ev.target.reset();
    }
    async amendPortfolio(ticker, shares) {
        await (portfolio.addStock(ticker, shares));
        this.setState({
            filteredPortfolio: portfolio,
            totalInvestment: portfolio.totalValue
        });
    }

    componentDidUpdate() {
        this.props.updatePortfolio();
    }

    render() {
        return (
            <div>
                <p>Please enter a stock's ticker symbol and the amount of shares you plan to purchase below!</p>
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