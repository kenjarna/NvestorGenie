This project was boostrapped using Create-React-App

The following is a friendly documentation of the capabilities of the application:
- Search for stock information given a ticker or name.
- Analyze a given stock for expected yearly returns (DOES NOT GAURANTEE THE RESULTS CALCULATED WILL HAPPEN)
- Allow the user to create an account to keep track of past reports and allow them to print these reports.


How to develop the application:
- Must use React 16.0.0^
- Application takes advantage of axios HTTP requests
- Install npm or yarn to establish the development environmnet and use hot reloading
- Install react RTE and axios as well. 


Users:
- Using the application is simple and easy. Simply click the link above and start adding portfolios/stocks!
- To add a stock, hit the hamburger list icon in the top left portion of the Portfolio Manager. Add your stock Ticker, number of shares you're buying, and the expected annual growth rate (that information can be found on NASDAQ.com or other stock sites).
    - Once you add the stocks you like, simply hit "Analyze stock list" and wait for the system to calculate your predicted annual return on the given list!
        - IT SHOULD BE NOTED THAT THIS PROGRAM DOES NOT GAURANTEE RETURNS OF ANY AMOUNT
    - You can edit the title/comments of existing portfolios by clicking on them in the portfolio list, clicking the title/comment section of the screen that populates and making your changes
    - You can delete portfolios from the portfolio list by hitting the trashcan. You can delete stocks from a specific portfolio by selecting the portfolio from the list, navigating to the stock list and hitting the trashcan on the stock(s) you want to delete from the list. The system then updates your portfolio for you.

