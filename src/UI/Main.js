import React from 'react';
import '../StyleSheets/Main.css';

import PortfolioManager from './PortfolioManager';
import PortfolioList from './PortfolioList';


const Main = (props) => {
    return (
        <div className="Main">
            <PortfolioList
                portfolios={props.portfolios}
                setCurrentPortfolio={props.setCurrentPortfolio}
                savePortfolio={props.savePortfolio}
            />
            <PortfolioManager
                savePortfolio={props.savePortfolio}
                portfolios={props.portfolios}
                setCurrentPortfolio={props.setCurrentPortfolio}
                currentPortfolio={props.currentPortfolio}
            />

        </div>
    )
}

export default Main