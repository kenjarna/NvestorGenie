import React from 'react';

const StockItem = ({ stock }) => {
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
                    {stock.expectedReturn*100 + "%" || "Not Yet Analyzed"}
                </div>
            </td>
        </tr>
    )
}

export default StockItem;