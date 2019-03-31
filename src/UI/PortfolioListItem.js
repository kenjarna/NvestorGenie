import React from 'react';

const PortfolioItem = ({ portfolio,setCurrentPortfolio }) => {
    const handleClick = () => {
        setCurrentPortfolio(portfolio);

    }
    return (
        <a onClick = {handleClick}>
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
        </a>
    )
}

export default PortfolioItem;