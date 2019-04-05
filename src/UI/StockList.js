import React from 'react';
import StockItem from './StockItem';

import '../StyleSheets/StockList.css';

/* StockList.js
*   Purpose:    Create a stock list to display the important information regarding the stocks in the portfolio to the user
*   Result:     Render a list of stocks for the user to see in the portfolio stock list editor
*   Member Functions: N/A
*/

const StockList = ({ stockList, removeStock }) => {
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
                            removeStock={removeStock}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default StockList;