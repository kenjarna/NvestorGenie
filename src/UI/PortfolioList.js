import React from 'react';
import PortfolioItem from './PortfolioListItem';
import '../StyleSheets/PortfolioList.css';

const PortfolioList = ({ portfolios, setCurrentPortfolio }) => {
    const portfolioIds = Object.keys(portfolios);
    return (
        <div className="portfolioList">
            <h3>Portfolio List </h3>
            <ul id="portfolios">
                {portfolioIds.map(portfolioId => (
                    <PortfolioItem
                        key={portfolioId}
                        portfolio={portfolios[portfolioId]}
                        setCurrentPortfolio={setCurrentPortfolio}
                    />
                ))}
            </ul>
            <div className="actionBar">
                <button 
                    id="printReport" 
                    onClick={console.log("print report")}
                    title="Run Report"> Print Report
                </button>
                <button 
                    id="runReport" 
                    onClick={console.log("submitted report for analysis")}
                    title="Run Report"> Analyze
                </button>
            </div>

        </div>
    )
}

export default PortfolioList;