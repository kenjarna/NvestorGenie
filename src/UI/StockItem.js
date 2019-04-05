import React from 'react';

/* StockItem.js
*   Purpose:    Dynamically populate the stock list displayed to the user on the stock edit portion of the portfolioManager
*   Result:     Render the stock information correctly within the table of stocks
*   Member Functions: N/A
*/

const StockItem = ({ stock, removeStock }) => {
    return (

        <tr>
            <td>
                <div className="stock-ticker">
                    {stock.ticker}
                </div>
            </td>

            <td>
                <div className="stock-shares">
                    {stock.numShares}
                </div>
            </td>

            <td>
                <div className="stock-shares">
                    {stock.companyName || "Not Yet Fetched"}
                </div>
            </td>

            <td>
                <div className="stock-shares">
                    {Number.parseFloat(stock.expectedReturn*100).toPrecision(4) + "%"}
                </div>
            </td>
            <td>
                <div className="remove-stock">
                    <button onClick={()=>{removeStock(stock)}}>
                        <i className="fa fa-trash-o"></i>
                    </button>
                </div>
            </td>
        </tr>
    )
}

export default StockItem;