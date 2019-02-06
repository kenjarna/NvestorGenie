import React from 'react';
import StockItem from './StockListItem';

const StockList = (props) => {
    const stockTickers = Object.keys(props.stocks.stockList);

    return (
        <div className="stock-list">
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
        </div>
    )
}

export default StockList;