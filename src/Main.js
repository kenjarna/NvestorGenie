import React, {Component} from 'react';
import './Main.css';

import StockFetcher from './StockFetcher';
import ReportHandler from './ReportHandler';
import Analysis from './StockAnalysis';
import PortfolioList from './PortfolioList';
import Sidebar from './Sidebar';

const Main = (props) => {
    return (
        <div className="Main">
            <Sidebar />
            <PortfolioList
                portfolios={props.portfolio}
                removeStock={props.removeStock}
            />
            <StockFetcher
                updatePortfolio={props.updatePortfolio}
                portfolio={props.portfolio}
            />

        </div>
    )
}

export default Main