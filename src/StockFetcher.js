import React, {Component} from 'react';
import Portfolio from './Portfolio.js';


class StockFetcher extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            fetchedPortfolio: props.portfolio,
            totalInvestment: 0,
        };

    }

    handleFormSubmit(ev) {
        ev.preventDefault();

        let ticker = document.getElementById('stock-ticker').value.toUpperCase();
        let shares = document.getElementById('num-shares').value;
       

        
        this.amendPortfolio(ticker, shares);
        

        ev.target.reset();
    }
    amendPortfolio(ticker, shares) {
        this.state.fetchedPortfolio.addStock(ticker, shares);
        
        this.props.updatePortfolio(this.state.fetchedPortfolio);
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