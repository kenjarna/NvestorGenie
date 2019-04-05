import React, {Component} from 'react';
import RichTextEditor from 'react-rte';

import Portfolio from '../LogicComponents/Portfolio.js';
import StockList from './StockList';
import '../StyleSheets/PortfolioManager.css';

/* PortfolioManager.js
*   Purpose:    Manage a portfolio. Allow a user to change the title and comments, create new portfolios, add stocks to the stock list
                and analyze the stocks as well as the portfolio object.
*   Result:     The user is able to see the basic portfolio information as well as an annual expected return for individual stocks and the portfolio
*   Member Functions:
*        componentDidUpdate  - once changes are made to the app's state and new props are recieved, be sure to update this component to reflect those changes
*        handleStockSubmit   - take the information entered from user input on the stock form (ticker, number of shares, growth) and add that stock to the
*                                portfolio's stockList. Then, save that updated portfolio using savePortfolio from the App's props
*        handleTitleChanges  - save all changes to the title of a portfolio using savePortfolio from App's props
*        handleEditorChanges - save all changes to the comments of a portoflio using savePortfolio from App's props
*        editPortfolio       - toggle view to show the "edit" portion of the portfolio (allowing the user to change the title and comments of a portfolio)
*        viewPortfolio       - toggle view to show the "view" portion of the portfolio (allowing the user to add stocks to the portfolio's stock list)
*        fetchStocks         - get the stocks for a portfolio and analyze those stocks in the process (called after hitting the "Analyze Portfolio" button)
*/

class PortfolioManager extends Component {
    constructor(props) {
        
        super(props);
        this.state = {
            portfolio: new Portfolio(),
            editorValue: RichTextEditor.createEmptyValue(),
            editViewHidden: false,
            viewStocksHidden: true,
        };
    }

    componentDidUpdate(prevProps){
        if (this.props.currentPortfolio.stockList !== prevProps.currentPortfolio.stockList){
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
        const ticker = document.getElementById('stock-ticker').value.toUpperCase();
        const shares = document.getElementById('num-shares').value; 
        const growth = document.getElementById('expected-growth').value;
        this.state.portfolio.addStock(ticker, shares, growth);
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

    removeStock = (stockObj) => {
        const portfolio = this.state.portfolio;
        const lessStock = portfolio.stockList
        const key = Object.keys(lessStock).find(key => lessStock[key] === stockObj);

        delete lessStock[key];
        portfolio.stockList = lessStock;
        this.setState({portfolio: portfolio});
        this.props.savePortfolio(portfolio);

        this.state.portfolio.updatePortfolio();
    }

    async fetchStocks (rawPortfolio) {
        await rawPortfolio.updatePortfolio();

        this.props.setCurrentPortfolio(rawPortfolio);
        
    }

    render() {
        
        return (
            <div className="portfolioManager">
                <button className="newPortfolio" onClick={() => {this.props.setCurrentPortfolio(new Portfolio()); this.editPortfolio();}} title="Add Portfolio">
                    <i className="fa fa-plus-circle"></i>
                </button>

                <button className="editPortfolio" onClick={this.editPortfolio} title="Edit Portfolio">
                    <i className="fa fa-edit"></i>
                </button>

                <button className="viewPortfolio" onClick={this.viewPortfolio} title="Add Stocks">
                    <i className="fa fa-list"></i>
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
                            onChange={this.handleEditorChanges} placeholder="Add a note about your portfolio . . .">
                        </RichTextEditor>
                    </div>
                </form>
                
                <form className={this.state.viewStocksHidden ? "hidden" : "stockForm"} onSubmit={this.handleStockSubmit.bind(this)}>
                    <input type="text" id ="stock-ticker" placeholder="Enter a stock symbol . . ." required/>
                    <input type="number" id="num-shares" placeholder="Enter number of shares . . ." required />
                    <input type="number" id="expected-growth" step="any" placeholder="Enter the expected growth % for 1 year . . ." required />
                    <input type="submit" value="Add Stock to List"/>
                </form>
                
                <div className={this.state.viewStocksHidden ? "hidden" : "portfolioStockList"}>
                    <StockList
                        stockList={this.state.portfolio.stockList}
                        removeStock={this.removeStock}
                    />
                </div>
                
                <button className={this.state.viewStocksHidden ? "hidden" : "analyze"}
                    onClick={() => {this.fetchStocks(this.state.portfolio)}}> Analyze Stock List
                </button>
            </div>
        )
    }
}


export default PortfolioManager;