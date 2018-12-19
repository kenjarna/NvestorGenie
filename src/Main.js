import React, {Component} from 'react';
import './Main.css';

import StockFetcher from './StockFetcher';
import ReportHandler from './ReportHandler';
import Analysis from './StockAnalysis';

const Main = (props) => {
    return (
        <div>
            <p>Testing Main.js</p>
            <StockFetcher />
            <ReportHandler />
            <Analysis />
        </div>
    )
}

export default Main