import Stock from '../Stock';

describe("Testing Stock Object functionality", function () {
    let amzn = new Stock('AMZN', 100);
    let aapl = new Stock('AAPL', 103);
    describe('Testing creation of empty Stock object', function () {
        it('Test create Amazon Stock Object', () => {
            expect(amzn.ticker).toBe('AMZN');
            expect(amzn.numShares).toBe(100);
            expect(amzn.companyName).toBe('');
            expect(amzn.latestTime).toBe(0);
            expect(amzn.primaryExchange).toBe(0);
            expect(amzn.PERatio).toBe(0);
            expect(amzn.week52High).toBe(0);
            expect(amzn.week52Low).toBe(0);
            expect(amzn.ytdChange).toBe(0);
            expect(amzn.closePrice).toBe(0);
            expect(amzn.openPrice).toBe(0);
            expect(amzn.beta).toBe(0);
            expect(amzn.dividendRate).toBe(0);
            expect(amzn.dividendYield).toBe(0);
            expect(amzn.latestEPS).toBe(0);
            expect(amzn.latestEPSDate).toBe(0);
            expect(amzn.investmentAmount).toBe(0);
            expect(amzn.latestPrice).toBe(0);
        });
        it('Test create apple stock object', () => {
            expect(aapl.ticker).toBe('AAPL');
            expect(aapl.numShares).toBe(103);
            expect(aapl.companyName).toBe('');
            expect(aapl.latestTime).toBe(0);
            expect(aapl.primaryExchange).toBe(0);
            expect(aapl.PERatio).toBe(0);
            expect(aapl.week52High).toBe(0);
            expect(aapl.week52Low).toBe(0);
            expect(aapl.ytdChange).toBe(0);
            expect(aapl.closePrice).toBe(0);
            expect(aapl.openPrice).toBe(0);
            expect(aapl.beta).toBe(0);
            expect(aapl.dividendRate).toBe(0);
            expect(aapl.dividendYield).toBe(0);
            expect(aapl.latestEPS).toBe(0);
            expect(aapl.latestEPSDate).toBe(0);
            expect(aapl.investmentAmount).toBe(0);
            expect(aapl.latestPrice).toBe(0);
        });
        it('Test inequality of Amazon and Apple Stock objects', () => {
            expect(aapl).not.toBe(amzn);
        });
    });

    describe('Testing Stock object methods', function () {
        it('Testing setBasicStats method of Stock Object', () => {
            const quote = {
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
            amzn.setBasicStats(quote);
            aapl.setBasicStats(quote);
            //Tests for Amazon
            expect(amzn.ticker).toBe('AMZN');
            expect(amzn.numShares).toBe(100);
            expect(amzn.companyName).toBe('Amazon');
            expect(amzn.latestTime).toBe('2/10/2019');
            expect(amzn.primaryExchange).toBe('NASDAQ');
            expect(amzn.week52High).toBe(1905);
            expect(amzn.week52Low).toBe(1203);
            expect(amzn.ytdChange).toBe(23);
            expect(amzn.closePrice).toBe(1548);
            expect(amzn.openPrice).toBe(1500);
            expect(amzn.investmentAmount).toBe(176000);
            expect(amzn.latestPrice).toBe(1760);

            //Tests for Apple
            expect(aapl.ticker).toBe('AAPL');
            expect(aapl.numShares).toBe(103);
            expect(aapl.companyName).toBe('Amazon');
            expect(aapl.latestTime).toBe('2/10/2019');
            expect(aapl.primaryExchange).toBe('NASDAQ');
            expect(aapl.week52High).toBe(1905);
            expect(aapl.week52Low).toBe(1203);
            expect(aapl.ytdChange).toBe(23);
            expect(aapl.closePrice).toBe(1548);
            expect(aapl.openPrice).toBe(1500);
            expect(aapl.investmentAmount).toBe(181280);
            expect(aapl.latestPrice).toBe(1760);

            expect(aapl).not.toBe(amzn);

        });
        it('Testing setStockInfo method of Stock Object', () => {
            const stats = {
                'beta': 54,
                'dividendRate': 14.065,
                'dividendYield': 15.322,
                'latestEPS': 1.86,
                'latestEPSDate': '2/10/19'
            };
            amzn.setStockInfo(stats);
            aapl.setStockInfo(stats);

            expect(aapl).not.toBe(amzn);
            //Be sure the previously set stats using setBasicStats did NOT change for Apple Stock object
            expect(aapl.ticker).toBe('AAPL');
            expect(aapl.numShares).toBe(103);
            expect(aapl.companyName).toBe('Amazon');
            expect(aapl.latestTime).toBe('2/10/2019');
            expect(aapl.primaryExchange).toBe('NASDAQ');
            expect(aapl.week52High).toBe(1905);
            expect(aapl.week52Low).toBe(1203);
            expect(aapl.ytdChange).toBe(23);
            expect(aapl.closePrice).toBe(1548);
            expect(aapl.openPrice).toBe(1500);
            expect(aapl.investmentAmount).toBe(181280);
            expect(aapl.latestPrice).toBe(1760);
            //Check that the new stats have been set properly for Apple Stock object
            expect(aapl.beta).toBe(54);
            expect(aapl.dividendYield).toBe(15.322);
            expect(aapl.dividendRate).toBe(14.065);
            expect(aapl.latestEPS).toBe(1.86);
            expect(aapl.latestEPSDate).toBe('2/10/19');

            //Be sure the previously set stats using setBasicStats did NOT change for Amazon Stock object
            expect(amzn.ticker).toBe('AMZN');
            expect(amzn.numShares).toBe(100);
            expect(amzn.companyName).toBe('Amazon');
            expect(amzn.latestTime).toBe('2/10/2019');
            expect(amzn.primaryExchange).toBe('NASDAQ');
            expect(amzn.week52High).toBe(1905);
            expect(amzn.week52Low).toBe(1203);
            expect(amzn.ytdChange).toBe(23);
            expect(amzn.closePrice).toBe(1548);
            expect(amzn.openPrice).toBe(1500);
            expect(amzn.investmentAmount).toBe(176000);
            expect(amzn.latestPrice).toBe(1760);
            //Check that the new stats have been set properly for Amazon Stock object
            expect(amzn.beta).toBe(54);
            expect(amzn.dividendYield).toBe(15.322);
            expect(amzn.dividendRate).toBe(14.065);
            expect(amzn.latestEPS).toBe(1.86);
            expect(amzn.latestEPSDate).toBe('2/10/19');
        });
    });

});