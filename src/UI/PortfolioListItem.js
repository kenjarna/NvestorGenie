import React from 'react';

const PortfolioItem = (props) => {
    return (
        <li>
            <div className="stock-item">
                <div className="stock-ticker">
                    {props.portfolio}
                </div>
            </div>
        </li>
    )
}

export default PortfolioItem;