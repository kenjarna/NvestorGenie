import React from 'react';

const PortfolioItem = ({ portfolio }) => {
    return (
        <li>
            <div className="portfolio">
                <div className="portfolio-title">
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