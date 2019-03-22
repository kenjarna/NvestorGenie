import Portfolio from '../LogicComponents/Portfolio';
import Stock from '../LogicComponents/Stock';

describe('Testing Portfolio Object functionality', function () {
    let portfolio1 = new Portfolio();
    let portfolio2 = new Portfolio();
    let googl = new Stock('GOOGL', 100);
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
        beforeEach(() => {
            portfolio1 = new Portfolio();
            portfolio2 = new Portfolio();
        })

        it('Test addStock method of Portfolio object', () => {
            portfolio1.addStock('GOOGL', 100);
            expect(portfolio1.stockList).toEqual({
                'GOOGL': googl
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
        it('Test updatePortfolio method of Portfolio object on non-empty stock list', () => {
            portfolio1.addStock('AMZN', 100);
            portfolio1.addStock('GOOGL', 100);

            portfolio1.updatePortfolio();
            expect(portfolio1).not.toEqual(portfolio2);
            expect(portfolio1.stockList).not.toEqual({});
            expect(portfolio1.totalValue).not.toEqual(0);
            //We should be sure that all the stats of a stock are not 
            //their intially - assigned values
            expect(portfolio1.stockList['AMZN'].companyName).not.toEqual('');
            expect(portfolio1.stockList['AMZN'].latestTime).not.toEqual(null);
            expect(portfolio1.stockList['AMZN'].primaryExchange).not.toEqual(null);
            expect(portfolio1.stockList['AMZN'].latestPrice).not.toEqual(null);
            expect(portfolio1.stockList['AMZN'].PERatio).not.toEqual(null);
            expect(portfolio1.stockList['AMZN'].week52High).not.toEqual(null);
            expect(portfolio1.stockList['AMZN'].week52Low).not.toEqual(null);
            expect(portfolio1.stockList['AMZN'].ytdChange).not.toEqual(null);
            expect(portfolio1.stockList['AMZN'].closePrice).not.toEqual(null);
            expect(portfolio1.stockList['AMZN'].openPrice).not.toEqual(null);
            expect(portfolio1.stockList['AMZN'].beta).not.toEqual(null);
            expect(portfolio1.stockList['AMZN'].dividendRate).not.toEqual(null);
            expect(portfolio1.stockList['AMZN'].dividendYield).not.toEqual(null);
            expect(portfolio1.stockList['AMZN'].latestEPS).not.toEqual(null);
            expect(portfolio1.stockList['AMZN'].latestEPSDate).not.toEqual(null);
            expect(portfolio1.stockList['AMZN'].investmentAmount).not.toEqual(null);
            //Because there are two stocks in stockList, we need to make sure they have both been updated
            expect(portfolio1.stockList['GOOGL'].companyName).not.toEqual('');
            expect(portfolio1.stockList['GOOGL'].latestTime).not.toEqual(null);
            expect(portfolio1.stockList['GOOGL'].primaryExchange).not.toEqual(null);
            expect(portfolio1.stockList['GOOGL'].latestPrice).not.toEqual(null);
            expect(portfolio1.stockList['GOOGL'].PERatio).not.toEqual(null);
            expect(portfolio1.stockList['GOOGL'].week52High).not.toEqual(null);
            expect(portfolio1.stockList['GOOGL'].week52Low).not.toEqual(null);
            expect(portfolio1.stockList['GOOGL'].ytdChange).not.toEqual(null);
            expect(portfolio1.stockList['GOOGL'].closePrice).not.toEqual(null);
            expect(portfolio1.stockList['GOOGL'].openPrice).not.toEqual(null);
            expect(portfolio1.stockList['GOOGL'].beta).not.toEqual(null);
            expect(portfolio1.stockList['GOOGL'].dividendRate).not.toEqual(null);
            expect(portfolio1.stockList['GOOGL'].dividendYield).not.toEqual(null);
            expect(portfolio1.stockList['GOOGL'].latestEPS).not.toEqual(null);
            expect(portfolio1.stockList['GOOGL'].latestEPSDate).not.toEqual(null);
            expect(portfolio1.stockList['GOOGL'].investmentAmount).not.toEqual(null);

            expect(portfolio1.stockList['AMZN']).not.toEqual(portfolio1.stockList['GOOGL']);

        });
    });

});
