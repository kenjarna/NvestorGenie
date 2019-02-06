import React from 'react';

const StockItem = (props) => {
    return (
        <li>
            <div className="stock-item">
                <div className="stock-ticker">
                    {props.stock.ticker}, {props.stock.numShares}
                </div>
            </div>
        </li>
    )
}

export default StockItem;