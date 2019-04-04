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
                    <div className="portfolio-return">
                        {"Expected Annual Return: " + Number.parseFloat(portfolio.expectedAnnualReturn*100).toPrecision(4) + "%"}
                    </div>
                </div>
            </li>
        </a>
    )
}

export default PortfolioItem;