import React, {Component} from 'react';
import './Main.css';

import StockFetcher from './StockFetcher';

const Main = (props) => {
    return (
        <div>
            <p>Testing Main.js</p>
            <StockFetcher />
        </div>
    )
}

export default Main