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
            editViewHidden: true,
            viewStocksHidden: true,
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

    newPortfolio = () => {
        this.setState(
            {   
                portfolio: new Portfolio(),
                editorValue: RichTextEditor.createEmptyValue(),
                editViewHidden: false,
                viewStocksHidden: true,
            }
        );
    }

    editPortfolio = () => {
        this.setState(
            {
                editViewHidden: false,
                viewStocksHidden: true,
            }
        )
    }

    viewPortfolio = () => {
        this.setState(
            {
                editViewHidden: true,
                viewStocksHidden: false,
            }
        )
    }

    render() {
        
        return (
            <div className="portfolioManager">
                <form className="portfolio-attributes">
                    <div className={this.state.editViewHidden ? "hidden" : "form-actions"}>
                        <p>
                            <input
                                type="text" name="title"
                                placeholder="Title your Portfolio" value={this.state.portfolio.title}
                                onChange={this.handleTitleChanges} required
                            />
                        </p>
                        <RichTextEditor
                            id="rte" name="comments" value={this.state.editorValue}
                            onChange={this.handleEditorChanges}>
                        </RichTextEditor>
                    </div>
                </form>
                
                <form className={this.state.viewStocksHidden ? "hidden" : "stockForm"} onSubmit={this.handleStockSubmit.bind(this)}>
                    <input id ="stock-ticker" placeholder="Enter a stock symbol . . ." required/>
                    <input id="num-shares" placeholder="Enter number of shares . . ." required />
                    <input type="submit"/>
                </form>

                <button className="analyze" onClick={this.state.portfolio.updatePortfolio()}> Analyze Stock List</button>

                <button className="newPortfolio" onClick={this.newPortfolio} title="Add Portfolio">
                    <i className="fa fa-plus-circle"></i>
                </button>
                
                <button className="editPortfolio" onClick={this.editPortfolio} title="Edit Portfolio">
                    <i className="fa fa-edit"></i>
                </button>

                <button className="viewPortfolio" onClick={this.viewPortfolio} title="Save Portfolio">
                    <i className="fa fa-save"></i>
                </button>
            </div>
        )
    }
}


export default PortfolioManager;