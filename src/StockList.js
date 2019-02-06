import React from 'react';
import StockItem from './StockListItem';

const StockList = ({ stocks }) => {

    const stockTickers = Object.keys(stocks.stockList);

    return (
        <div className="stock-list">
            <h3>Stock List </h3>
            <ul id="stocks">
                {stockTickers.map(ticker => (
                    <StockItem
                        key={ticker}
                        stock={stocks.stockList[ticker]}
                    />
                ))}
            </ul>
        </div>
    )
}

export default StockList;