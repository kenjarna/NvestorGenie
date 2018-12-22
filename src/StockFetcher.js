import React, {Component} from 'react';



const StockFetcher = (props) => {
    return (
        <div>
            <p>Testing StockFetcher (for IEXFinance API)</p>
            <button name="Test button" onClick={props.updatePortfolio}>Stock Updater</button>
        </div>
    )
}

export default StockFetcher