import React from 'react';
import StockItem from './StockItem';

import '../StyleSheets/StockList.css';


const StockList = ({ stockList }) => {
    const stockIds = Object.keys(stockList);

    return (
        <div className="stockList">
            <table id="stocks">
                <thead>
                    <tr>
                        <th> Stock Ticker</th>

                        <th> Number of Shares</th>

                        <th> Company Name</th>

                        <th> Annual Expected Return</th>
                    </tr>
                </thead>
                <tbody>
                    {stockIds.map(stockId => (
                        <StockItem
                            key={stockId}
                            stock={stockList[stockId]}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default StockList;