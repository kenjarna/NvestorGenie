import Portfolio from './Portfolio';
import Stock from './Stock';

describe('Testing Portfolio Object functionality', function () {
    let portfolio1 = new Portfolio();
    let portfolio2 = new Portfolio();
    let googl = new Stock('GOOGL', 100);
    describe('Testing the creation of empty Portfolio object', function () {
        it('Test creation of a portfolio object', () => {
            expect(portfolio1.stockList).toEqual({});
            expect(portfolio1.totalValue).toBe(0);
            expect(portfolio2.stockList).toEqual({});
            expect(portfolio2.totalValue).toBe(0);
            expect(portfolio1).toEqual(portfolio2);
        });

    });

    describe('Testing Portfolio object methods', function () {
        it('Test addStock method of Portfolio object', () => {
            portfolio1.addStock('GOOGL', 100);
            expect(portfolio1.stockList).toEqual({
                'GOOGL': googl
            });
            expect(portfolio1.totalValue).toBe(0);

            expect(portfolio1).not.toEqual(portfolio2);
        });
        it('Test resetPortfolio method of Portfolio object', () => {
            portfolio1.resetPortfolio();
            expect(portfolio1.stockList).toEqual({});
            expect(portfolio1.totalValue).toBe(0);
            expect(portfolio1).toEqual(portfolio2);
        })
    });

});
