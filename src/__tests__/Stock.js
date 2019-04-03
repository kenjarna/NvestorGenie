import Stock from '../LogicComponents/Stock';

describe("Testing Stock Object functionality", function () {
    let amzn = new Stock('AMZN', 100, .82);
    describe('Testing creation of empty Stock object', function () {
        it('Test create Amazon Stock Object', () => {
            expect(amzn.ticker).toEqual('AMZN');
            expect(amzn.numShares).toEqual(100);
            expect(amzn.growth).toEqual(0.82);
            expect(amzn.companyName).toEqual('');
            expect(amzn.latestTime).toEqual(null);
            expect(amzn.primaryExchange).toEqual(null);
            expect(amzn.PERatio).toEqual(null);
            expect(amzn.week52High).toEqual(null);
            expect(amzn.week52Low).toEqual(null);
            expect(amzn.ytdChange).toEqual(null);
            expect(amzn.closePrice).toEqual(null);
            expect(amzn.openPrice).toEqual(null);
            expect(amzn.beta).toEqual(null);
            expect(amzn.dividendRate).toEqual(null);
            expect(amzn.dividendYield).toEqual(null);
            expect(amzn.latestEPS).toEqual(null);
            expect(amzn.latestEPSDate).toEqual(null);
            expect(amzn.investmentAmount).toEqual(null);
            expect(amzn.latestPrice).toEqual(null);
            expect(amzn.weightedBeta).toEqual(null);
            expect(amzn.portionOfPortfolio).toEqual(null);
            expect(amzn.expectedReturn).toEqual(0);
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

            expect(amzn.ticker).toEqual('AMZN');
            expect(amzn.numShares).toEqual(100);
            expect(amzn.growth).toEqual(0.82);
            expect(amzn.companyName).toEqual('Amazon');
            expect(amzn.latestTime).toEqual('2/10/2019');
            expect(amzn.primaryExchange).toEqual('NASDAQ');
            expect(amzn.week52High).toEqual(1905);
            expect(amzn.week52Low).toEqual(1203);
            expect(amzn.ytdChange).toEqual(23);
            expect(amzn.closePrice).toEqual(1548);
            expect(amzn.openPrice).toEqual(1500);
            expect(amzn.investmentAmount).toEqual(176000);
            expect(amzn.latestPrice).toEqual(1760);

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

            //Be sure the previously set stats using setBasicStats did NOT change for Amazon Stock object
            expect(amzn.ticker).toEqual('AMZN');
            expect(amzn.numShares).toEqual(100);
            expect(amzn.growth).toEqual(0.82);
            expect(amzn.companyName).toEqual('Amazon');
            expect(amzn.latestTime).toEqual('2/10/2019');
            expect(amzn.primaryExchange).toEqual('NASDAQ');
            expect(amzn.week52High).toEqual(1905);
            expect(amzn.week52Low).toEqual(1203);
            expect(amzn.ytdChange).toEqual(23);
            expect(amzn.closePrice).toEqual(1548);
            expect(amzn.openPrice).toEqual(1500);
            expect(amzn.investmentAmount).toEqual(176000);
            expect(amzn.latestPrice).toEqual(1760);
            //Check that the new stats have been set properly for Amazon Stock object
            expect(amzn.beta).toEqual(54);
            expect(amzn.dividendYield).toEqual(15.322);
            expect(amzn.dividendRate).toEqual(14.065);
            expect(amzn.latestEPS).toEqual(1.86);
            expect(amzn.latestEPSDate).toEqual('2/10/19');
        });
        it('Test buildLink method of Stock object', () => {
            expect(amzn.buildLink('quote', 'AMZN')).toEqual('https://api.iextrading.com/1.0/stock/AMZN/batch?types=quote');
            expect(amzn.buildLink('stats', 'AMZN')).toEqual('https://api.iextrading.com/1.0/stock/AMZN/stats');
        });
    });

});