import React from 'react';

const StockItem = ({ stock }) => {
    return (
        <li>
            <div className="stock-item">
                <div className="stock-ticker">
                    {stock.ticker}, {stock.numShares}
                </div>
            </div>
        </li>
    )
}

export default StockItem;