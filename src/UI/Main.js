import React from 'react';
import '../StyleSheets/Main.css';

import PortfolioManager from './PortfolioManager';
import PortfolioList from './PortfolioList';


/* Main.js
*   Purpose: Disseminate information from props received from App.js to the correct React component
*   Result:  Components recieved the correct properties necessary to complete their purpose
*   Member Functions: N/A
*/

const Main = (props) => {
    return (
        <div className="Main">
            <PortfolioList
                portfolios={props.portfolios}
                setCurrentPortfolio={props.setCurrentPortfolio}
                savePortfolio={props.savePortfolio}
                removePortfolio = {props.removePortfolio}
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