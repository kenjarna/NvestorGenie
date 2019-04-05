import React from 'react';

/* PortfolioItem.js
*   Purpose: Dynamically create an item in the portfolio list with the details of a specific portfolio
*   Result:  Portfolio list is populated with all the portfolios in the current portfolio object
*   Member Functions: N/A
*
*
*/

const PortfolioItem = ({ portfolio,setCurrentPortfolio,removePortfolio }) => {
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
                    <button className="remove-portfolio" 
                            onClick={() => {removePortfolio(portfolio)}}
                            title="Delete Portfolio"
                    >
                        <i className="fa fa-trash-o"></i>
                    </button>
                    <div className="portfolio-return">
                        {"Expected Annual Return: " + Number.parseFloat(portfolio.expectedAnnualReturn*100).toPrecision(4) + "%"}
                    </div>
                </div>

            </li>
        </a>
    )
}

export default PortfolioItem;