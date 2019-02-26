import React from 'react';
import StockItem from './StockListItem';
import './StockList.css';
const StockList = (props) => {
    const stockTickers = Object.keys(props.stocks.stockList);

    return (
        <div className="stockList">
            <h3>Stock List </h3>
            <ul id="stocks">
                {stockTickers.map(ticker => (
                    <StockItem
                        key={ticker}
                        stock={props.stocks.stockList[ticker]}
                        removeStock={props.removeStock}
                        
                    />

                ))}

            </ul>
            <div className="actionBar">
                <button 
                    id="printReport" 
                    onClick={console.log("print report")}
                    title="Run Report"> Print Report
                </button>
                <button 
                    id="runReport" 
                    onClick={console.log("submitted report for analysis")}
                    title="Run Report"> Analyze
                </button>
            </div>

        </div>
    )
}

export default StockList;