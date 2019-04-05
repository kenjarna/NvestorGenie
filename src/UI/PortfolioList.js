import React from 'react';
import PortfolioItem from './PortfolioListItem';
import '../StyleSheets/PortfolioList.css';

/* PortfolioList.js
*   Purpose: Render the list of the portfolios and allow for the user to analyze all portfolios in a single click
*   Result:  The portfolio list is created based on what items are returned from the portfolioListItem component.
             The user is also able to analyze all portfolios in the current list.
*   Member Functions: N/A
*
*
*/

const PortfolioList = ({ portfolios, setCurrentPortfolio, savePortfolio }) => {
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
                    onClick={
                        async function () {
                            for (let i in portfolios){
                                await portfolios[i].updatePortfolio();
                                savePortfolio(portfolios[i]);
                            }
                        }
                    }
                    title="Run Report"> Analyze All Portfolios
                </button>
            </div>

        </div>
    )
}

export default PortfolioList;