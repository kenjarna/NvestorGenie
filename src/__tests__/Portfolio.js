import Portfolio from '../LogicComponents/Portfolio';
import Stock from '../LogicComponents/Stock';

describe('Testing Portfolio Object functionality', function () {
    let portfolio1;
    let portfolio2;
    let GOOGL = new Stock('GOOGL', 100);

    beforeEach(() => {
        portfolio1 = new Portfolio();
        portfolio2 = new Portfolio();
    })
    describe('Testing the creation of empty Portfolio object', function () {
        it('Test creation of a portfolio object', () => {
            expect(portfolio1.stockList).toEqual({});
            expect(portfolio1.totalValue).toEqual(0);
            expect(portfolio2.stockList).toEqual({});
            expect(portfolio2.totalValue).toEqual(0);
            expect(portfolio1.id).toEqual(0);
            expect(portfolio2.id).toEqual(1);
        });

    });

    describe('Testing Portfolio object methods', function () {

        it('Test addStock method of Portfolio object', () => {
            portfolio1.addStock('GOOGL', 100);
            expect(portfolio1.stockList).toEqual({
                'GOOGL': GOOGL
            });
            expect(portfolio1.totalValue).toEqual(0);
            expect(portfolio1).not.toEqual(portfolio2);
        });
        it('Test resetPortfolio method of Portfolio object', () => {
            portfolio1.addStock('GOOGL', 100);
            portfolio1.resetPortfolio();
            expect(portfolio1.stockList).toEqual({});
            expect(portfolio1.totalValue).toEqual(0);
            expect(portfolio1.id).toEqual(4);
            expect(portfolio1.title).toEqual("");
            expect(portfolio1.comments).toEqual("");

        });
        it('Test updatePortfolio method of Portfolio object on empty stock list', () => {
            portfolio1.updatePortfolio();
            expect(portfolio1.stockList).toEqual({});
            expect(portfolio1.totalValue).toEqual(0);
            expect(portfolio1.id).toEqual(6);
        });
        it('Test async updatePortfolio method on non-empty stock list', async ()=>{
            portfolio1.addStock('AMZN',100);
            portfolio1.addStock('GOOGL',53);
            const stocksBeforeUpdate = portfolio1.stockList;
            const titleBeforeUpdate = portfolio1.title;
            const commentsBeforeUpdate = portfolio1.comments;
            const idBeforeUpdate = portfolio1.id;


            await portfolio1.updatePortfolio();

            expect(portfolio1.stockList).toEqual(stocksBeforeUpdate);
            expect(portfolio1.title).toEqual(titleBeforeUpdate);
            expect(portfolio1.comments).toEqual(commentsBeforeUpdate);
            expect(portfolio1.id).toEqual(idBeforeUpdate);
            expect(portfolio1.lastModified).not.toEqual(null);

            for (let key in portfolio1.stockList['AMZN']){
                expect(portfolio1.stockList['AMZN'][key]).not.toEqual(null);
            }
            for (let key in portfolio1.stockList['GOOGL']){
                expect(portfolio1.stockList['GOOGL'][key]).not.toEqual(null);
            }
            
            let googlValue = portfolio1.stockList['GOOGL'].investmentAmount;
            let amznValue = portfolio1.stockList['AMZN'].investmentAmount;
            expect(portfolio1.totalValue).toEqual(googlValue + amznValue);

            //Ensure that multiple calls results in the correct behavior
            await portfolio1.updatePortfolio();
            googlValue = portfolio1.stockList['GOOGL'].investmentAmount;
            amznValue = portfolio1.stockList['AMZN'].investmentAmount;
            expect(portfolio1.totalValue).toEqual(googlValue + amznValue);
            
        });
    });

});
