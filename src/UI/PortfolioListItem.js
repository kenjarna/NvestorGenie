import React from 'react';

const PortfolioItem = ({ portfolio }) => {
    return (
        <li>
            <div className="portfolio-item">
                <div className="portfolio-name">
                    {portfolio.title}
                </div>
                <div className="portfolio-comments"
                    dangerouslySetInnerHTML={{__html: portfolio.comments}}
                >
                </div>
            </div>
        </li>
    )
}

export default PortfolioItem;