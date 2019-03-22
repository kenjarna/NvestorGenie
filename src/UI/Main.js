import React from 'react';
import '../StyleSheets/Main.css';

import PortfolioManager from './PortfolioManager';
import PortfolioList from './PortfolioList';
import Sidebar from './Sidebar';

const Main = (props) => {
    return (
        <div className="Main">
            <Sidebar />
            <PortfolioList
                portfolios={props.portfolios}
                removeStock={props.removeStock}
            />
            <PortfolioManager
                savePortfolio={props.savePortfolio}
                portfolios={props.portfolios}
            />

        </div>
    )
}

export default Main