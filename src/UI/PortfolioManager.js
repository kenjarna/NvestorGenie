import React, {Component} from 'react';
import RichTextEditor from 'react-rte';

import Portfolio from '../LogicComponents/Portfolio.js';
import StockList from './StockList';
import '../StyleSheets/PortfolioManager.css';


class PortfolioManager extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            portfolio: new Portfolio(),
            totalInvestment: 0,
            editorValue: RichTextEditor.createEmptyValue(),
            editViewHidden: false,
            viewStocksHidden: true,
        };
    }

    componentDidUpdate(prevProps){
        if (this.props.currentPortfolio !== prevProps.currentPortfolio){
            this.setState(
                {
                    portfolio: this.props.currentPortfolio,
                    totalInvestment: this.props.currentPortfolio.totalInvestment,
                    editorValue: RichTextEditor.createValueFromString(this.props.currentPortfolio.comments,'html')
                });
        }
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
                <button className="newPortfolio" onClick={this.newPortfolio} title="Add Portfolio">
                    <i className="fa fa-plus-circle"></i>
                </button>

                <button className="editPortfolio" onClick={this.editPortfolio} title="Edit Portfolio">
                    <i className="fa fa-edit"></i>
                </button>

                <button className="viewPortfolio" onClick={this.viewPortfolio} title="Save Portfolio">
                    <i className="fa fa-save"></i>
                </button>

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
                    <input type="text" id ="stock-ticker" placeholder="Enter a stock symbol . . ." required/>
                    <input type="number"id="num-shares" placeholder="Enter number of shares . . ." required />
                    <input type="submit"/>
                </form>
                <div className={this.state.viewStocksHidden ? "hidden" : "portfolioStockList"}>
                    <StockList
                        stockList={this.state.portfolio.stockList}
                    />
                </div>
                <button className={this.state.viewStocksHidden ? "hidden" : "analyze"}
                    onClick={this.state.portfolio.updatePortfolio()}> Analyze Stock List
                </button>
            </div>
        )
    }
}


export default PortfolioManager;