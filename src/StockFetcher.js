import React, {Component} from 'react';



const StockFetcher = ({updatePortfolio}) => {


    return (
        <div>
            <p>Testing StockFetcher (for IEXFinance API)</p>
            <form className="stock-ticker-form" onSubmit={handleFormSubmit}>
                <input className="stock-ticker" id ="stock-ticker" placeholder="Enter a stock symbol . . ."/>
                <input type="submit"/>
            </form>
        </div>
    )
}

function handleFormSubmit(ev,action) {
    ev.preventDefault();

    var address = document.getElementById('stock-ticker').value.toUpperCase();
    
    console.log(address)
};

export default StockFetcher