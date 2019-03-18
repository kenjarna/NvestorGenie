import React from 'react';

const PortfolioItem = ({ portfolio }) => {
    return (
        <li>
            <div className="portfolio-item">
                <div className="portfolio-ticker">
                    {portfolio.title}
                </div>
            </div>
        </li>
    )
}

export default PortfolioItem;