import Portfolio from '../LogicComponents/Portfolio';
import Stock from '../LogicComponents/Stock';

describe('Testing Portfolio Object functionality', function () {
    let portfolio1;
    let portfolio2;
    const GOOGL = new Stock('GOOGL', 100, 0.8);

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
            portfolio1.addStock('GOOGL', 100,0.8);
            expect(portfolio1.stockList).toEqual({
                'GOOGL': GOOGL
            });
            expect(portfolio1.totalValue).toEqual(0);
            expect(portfolio1).not.toEqual(portfolio2);
        });
        it('Test resetPortfolio method of Portfolio object', () => {
            portfolio1.addStock('GOOGL', 100,0.8);
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
                expect(portfolio1.stockList['AMZN'][key]).not.toBe(null);
            }
            for (let key in portfolio1.stockList['GOOGL']){
                expect(portfolio1.stockList['GOOGL'][key]).not.toBe(null);
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
        it("Test analyzePortfolio method on a non-empty stock list",()=>{
            portfolio1.addStock('AMZN',100, 0.8);
            portfolio1.addStock('GOOGL',100, 0.75);
            const googl = portfolio1.stockList['GOOGL'];
            const amzn = portfolio1.stockList['AMZN'];

            //Manually set the stats of AMZN and GOOGL
            const AMZNQuote = {
                'companyName': 'Amazon',
                'latestTime': '2/10/2019',
                'primaryExchange': 'NASDAQ',
                'latestPrice': 1760,
                'PERatio': 45.7,
                'week52High': 1905,
                'week52Low': 1203,
                'ytdChange': 23,
                'close': 1548,
                'open': 1500
            };
            const AMZNStats = {
                'beta': 54,
                'dividendRate': 14.065,
                'dividendYield': 15.322,
                'latestEPS': 1.86,
                'latestEPSDate': '2/10/19'
            };
            const GOOGLQuote = {
                'companyName': 'Alphabet Inc',
                'latestTime': '4/3/2019',
                'primaryExchange': 'NASDAQ',
                'latestPrice': 300,
                'PERatio': 22,
                'week52High': 325,
                'week52Low': 150,
                'ytdChange': 5,
                'close': 300,
                'open': 275
            };
            const GOOGLStats = {
                'beta': 10,
                'dividendRate': 14.065,
                'dividendYield': 15.322,
                'latestEPS': 1.86,
                'latestEPSDate': '2/10/19'
            };
            amzn.setStockInfo(AMZNStats);
            amzn.setBasicStats(AMZNQuote);
            googl.setStockInfo(GOOGLStats);
            googl.setBasicStats(GOOGLQuote);
            const calculatedTotalValue = googl.investmentAmount + amzn.investmentAmount
            googl.analyzeStock(calculatedTotalValue);
            amzn.analyzeStock(calculatedTotalValue);

            expect(calculatedTotalValue).toEqual(206000);
            expect(amzn.portionOfPortfolio).toEqual(amzn.investmentAmount / calculatedTotalValue);
            expect(googl.portionOfPortfolio).toEqual(googl.investmentAmount / calculatedTotalValue);
            expect(amzn.weightedBeta).toBeCloseTo(46.1359, 4);
            expect(amzn.expectedReturn).toBeCloseTo(.54679612, 8);
            expect(googl.weightedBeta).toBeCloseTo(1.45631, 5);
            expect(googl.expectedReturn).toBeCloseTo(0.08737864,8);
        });
    });

});
