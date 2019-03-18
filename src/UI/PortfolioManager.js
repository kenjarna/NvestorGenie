import React, {Component} from 'react';
import RichTextEditor from 'react-rte';

import Portfolio from '../LogicComponents/Portfolio.js';
import '../StyleSheets/PortfolioManager.css';


class PortfolioManager extends Component {
    
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
        this.state.portfolio.addStock(ticker, shares);
        this.props.savePortfolio(this.state.portfolio); 
        
        ev.target.reset();
    }

    handleTitleChanges = (ev) => {
        const portfolio = this.state.portfolio;
        
        portfolio.setName(ev.target.value);
        this.setState({portfolio}, () => this.props.savePortfolio(portfolio));
    }

    handleEditorChanges = (editorValue) => {
        const portfolio = this.state.portfolio;
  
        portfolio.setComments(editorValue.toString('html'));
        this.setState({portfolio, editorValue}, ()=>this.props.savePortfolio(portfolio)); 
    }

    render() {
        
        return (
            <div className="portfolioManager">
                <p>Please enter a stock's ticker symbol and the amount of shares you plan to purchase below!</p>
                <form className="stockForm" onSubmit={this.handleStockSubmit.bind(this)}>
                    <input
                        type="text" name="title"
                        placeholder="Title your Portfolio" value={this.state.portfolio.title}
                        onChange={this.handleTitleChanges} required
                    />
                    <input id ="stock-ticker" placeholder="Enter a stock symbol . . ." required/>
                    <input id="num-shares" placeholder="Enter number of shares . . ." required />
                    <RichTextEditor
                        name="comments" value={this.state.editorValue}
                        onChange={this.handleEditorChanges}>
                    </RichTextEditor>
                    <input type="submit"/>
                </form>

                <button className="analyze" onClick={this.state.portfolio.updatePortfolio()}> Anlyze Stock List</button>
            </div>
        )
    }
}


export default PortfolioManager;