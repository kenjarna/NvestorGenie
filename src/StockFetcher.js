import React, {Component} from 'react';
import RichTextEditor from 'react-rte';

import Portfolio from './Portfolio.js';
import './StockFetcher.css';


class StockFetcher extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            portfolio: new Portfolio(),
            totalInvestment: 0,
            editorValue: RichTextEditor.createEmptyValue(),
        };

    }

    handleStockSubmit(ev) {
        ev.preventDefault();

        let ticker = document.getElementById('stock-ticker').value.toUpperCase();
        let shares = document.getElementById('num-shares').value;
       

        
        this.amendPortfolio(ticker, shares);
        

        ev.target.reset();
    }
    amendPortfolio(ticker, shares) {
        this.state.portfolio.addStock(ticker, shares);
        
        this.props.updatePortfolio(this.state.portfolio);
    }

    handleTitleChanges = (ev) => {
        const portfolio = this.state.portfolio;

        portfolio.setName(ev.target.value);

        this.setState({portfolio});
    }

    handleEditorChanges = (editorValue) => {
        const portfolio = this.state.portfolio;

        portfolio.setComments(editorValue.toString('html'));

        this.setState({portfolio, editorValue});

        
    }

    render() {
        
        return (
            <div className="stockFetcher">
                <form className="portfolioAttributes">
                    <p>
                        <input 
                            type="text"
                            name="title"
                            placeholder="Title your Portfolio"
                            value={this.state.portfolio.title}
                            onChange={this.handleTitleChanges}
                        />
                    </p>
                    <RichTextEditor
                        name="comments"
                        value={this.state.editorValue}
                        onChange={this.handleEditorChanges}>
                    </RichTextEditor>

                </form>
                <p>Please enter a stock's ticker symbol and the amount of shares you plan to purchase below!</p>
                <form className="stockForm" onSubmit={this.handleStockSubmit.bind(this)}>
                    <input id ="stock-ticker" placeholder="Enter a stock symbol . . ." required/>
                    <input id ="num-shares" placeholder="Enter number of shares . . ." required/>
                    <input type="submit"/>
                </form>
                
            </div>
        )
    }
}


export default StockFetcher