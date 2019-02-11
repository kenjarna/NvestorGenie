import React, {Component} from 'react';
import './Main.css';

import StockFetcher from './StockFetcher';
import ReportHandler from './ReportHandler';
import Analysis from './StockAnalysis';
import StockList from './StockList';

const Main = (props) => {
    return (
        <div>
            <p>Testing Main.js</p>
            <StockFetcher
                updatePortfolio={props.updatePortfolio}
                portfolio={props.portfolio}
            />
            <StockList
                stocks={props.portfolio}
                removeStock={props.removeStock}
            />
        </div>
    )
}

export default Main