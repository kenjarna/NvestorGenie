(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{19:function(t,e,o){t.exports=o(59)},24:function(t,e,o){},26:function(t,e,o){},30:function(t,e,o){},53:function(t,e,o){},55:function(t,e,o){},57:function(t,e,o){},59:function(t,e,o){"use strict";o.r(e);var i=o(0),a=o.n(i),n=o(11),r=o.n(n),s=(o(24),o(3)),l=o(4),c=o(7),u=o(6),h=o(8),f=(o(26),o(30),o(1)),d=o.n(f),m=o(5),p=o(9),v=o.n(p),k=o(12),P=o.n(k),E="https://api.iextrading.com/1.0/stock/",y=function(){function t(e,o,i){var a=arguments.length>3&&void 0!==arguments[3]?arguments[3]:null;Object(s.a)(this,t),this.ticker=e,this.numShares=o,this.growth=i,this.companyName="",this.latestTime=null,this.primaryExchange=null,this.latestPrice=null,this.PERatio=null,this.week52High=null,this.week52Low=null,this.ytdChange=null,this.closePrice=null,this.openPrice=null,this.beta=null,this.dividendRate=null,this.dividendYield=null,this.latestEPS=null,this.latestEPSDate=null,this.investmentAmount=null,this.weightedBeta=null,this.portionOfPortfolio=null,this.expectedGrowthReturn=0,this.expectedRecessionReturn=0,this.expectedReturn=0,this.createStockFromObject(a)}return Object(l.a)(t,[{key:"createStockFromObject",value:function(t){null!==t&&(this.companyName=t.companyName,this.latestTime=t.latestTime,this.primaryExchange=t.primaryExchange,this.latestPrice=t.latestPrice,this.PERatio=t.PERatio,this.week52High=t.week52High,this.week52Low=t.week52Low,this.ytdChange=t.ytdChange,this.closePrice=t.closePrice,this.openPrice=t.openPrice,this.beta=t.beta,this.dividendRate=t.dividendRate,this.dividendYield=t.dividendYield,this.latestEPS=t.latestEPS,this.latestEPSDate=t.latestEPSDate,this.investmentAmount=t.investmentAmount,this.weightedBeta=t.weightedBeta,this.portionOfPortfolio=t.portionOfPortfolio,this.expectedGrowthReturn=t.expectedGrowthReturn,this.expectedRecessionReturn=t.expectedRecessionReturn,this.expectedReturn=t.expectedReturn)}},{key:"fetchStockInfo",value:function(){var t=Object(m.a)(d.a.mark(function t(){var e=this;return d.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,P.a.get(this.buildLink("quote",this.ticker)).then(function(t){var o=t.data.quote;e.setBasicStats(o)});case 2:return t.next=4,P.a.get(this.buildLink("stats",this.ticker)).then(function(t){var o=t.data;e.setStockInfo(o)});case 4:case"end":return t.stop()}},t,this)}));return function(){return t.apply(this,arguments)}}()},{key:"buildLink",value:function(t,e){return"quote"===t?E+e+"/batch?types=quote":"stats"===t?E+e+"/stats":void 0}},{key:"setBasicStats",value:function(t){this.companyName=t.companyName,this.latestTime=t.latestTime,this.primaryExchange=t.primaryExchange,this.latestPrice=t.latestPrice,this.PERatio=t.peRatio,this.week52High=t.week52High,this.week52Low=t.week52Low,this.ytdChange=t.ytdChange,this.closePrice=t.close,this.openPrice=t.open,this.investmentAmount=this.latestPrice*this.numShares}},{key:"setStockInfo",value:function(t){this.beta=t.beta,this.dividendRate=t.dividendRate,this.dividendYield=t.dividendYield,this.latestEPS=t.latestEPS,this.latestEPSDate=t.latestEPSDate}},{key:"analyzeStock",value:function(t){var e=this.growth,o=t;this.portionOfPortfolio=this.investmentAmount/o,this.weightedBeta=this.beta*this.portionOfPortfolio,this.expectedGrowthReturn=this.portionOfPortfolio*e*.8,this.expectedRecessionReturn=-.2*this.portionOfPortfolio*.2,this.expectedReturn=this.expectedGrowthReturn+this.expectedRecessionReturn}}]),t}(),b=function(){function t(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",o=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"",i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null;Object(s.a)(this,t),this.stockList={},this.totalValue=0,this.title=e,this.lastModified=Date(Date.now()),this.comments=o,this.id=S,this.expectedAnnualReturn=0,this.createPortfolioFromObject(i),S++}return Object(l.a)(t,[{key:"addStock",value:function(t,e,o){var i=new y(t,e,o);this.stockList[t]=i}},{key:"createPortfolioFromObject",value:function(t){null!==t&&(this.stockList=t.stockList,this.totalValue=t.totalValue,this.lastModified=t.lastModified,this.expectedAnnualReturn=t.expectedAnnualReturn)}},{key:"updatePortfolio",value:function(){var t=Object(m.a)(d.a.mark(function t(){var e,o,i;return d.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:e=Object.keys(this.stockList),this.lastModified=Date(Date.now()),this.totalValue=0,o=0;case 4:if(!(o<e.length)){t.next=12;break}return i=e[o],t.next=8,this.stockList[i].fetchStockInfo();case 8:this.totalValue+=this.stockList[i].investmentAmount;case 9:o++,t.next=4;break;case 12:this.analyzePortfolio();case 13:case"end":return t.stop()}},t,this)}));return function(){return t.apply(this,arguments)}}()},{key:"analyzePortfolio",value:function(){var t=Object.keys(this.stockList);this.lastModified=Date(Date.now());for(var e=0;e<t.length;e++){var o=t[e];this.stockList[o].analyzeStock(this.totalValue)}this.updatePortfolioReturn()}},{key:"updatePortfolioReturn",value:function(){var t=Object.keys(this.stockList);this.expectedAnnualReturn=0;for(var e=0;e<t.length;e++){var o=t[e];this.expectedAnnualReturn+=this.stockList[o].expectedReturn*this.stockList[o].portionOfPortfolio}}},{key:"setName",value:function(t){this.title=t,this.lastModified=Date(Date.now())}},{key:"setComments",value:function(t){this.comments=t,this.lastModified=Date(Date.now())}},{key:"resetPortfolio",value:function(){this.stockList={},this.totalValue=0,this.lastModified=Date(Date.now()),this.comments="",this.title="",this.expectedAnnualReturn=0}}]),t}(),S=0,w=function(t){var e=t.stock,o=t.removeStock;return a.a.createElement("tr",null,a.a.createElement("td",null,a.a.createElement("div",{className:"stock-ticker"},e.ticker)),a.a.createElement("td",null,a.a.createElement("div",{className:"stock-shares"},e.numShares)),a.a.createElement("td",null,a.a.createElement("div",{className:"stock-shares"},e.companyName||"Not Yet Fetched")),a.a.createElement("td",null,a.a.createElement("div",{className:"stock-shares"},Number.parseFloat(100*e.expectedReturn).toPrecision(4)+"%")),a.a.createElement("td",null,a.a.createElement("div",{className:"remove-stock"},a.a.createElement("button",{onClick:function(){o(e)}},a.a.createElement("i",{className:"fa fa-trash-o"})))))},g=(o(53),function(t){var e=t.stockList,o=t.removeStock,i=Object.keys(e);return a.a.createElement("div",{className:"stockList"},a.a.createElement("table",{id:"stocks"},a.a.createElement("thead",null,a.a.createElement("tr",null,a.a.createElement("th",null," Stock Ticker"),a.a.createElement("th",null," Number of Shares"),a.a.createElement("th",null," Company Name"),a.a.createElement("th",null," Annual Expected Return"))),a.a.createElement("tbody",null,i.map(function(t){return a.a.createElement(w,{key:t,stock:e[t],removeStock:o})}))))}),O=(o(55),function(t){function e(t){var o;return Object(s.a)(this,e),(o=Object(c.a)(this,Object(u.a)(e).call(this,t))).handleTitleChanges=function(t){var e=o.state.portfolio;e.setName(t.target.value),o.setState({portfolio:e},function(){return o.props.savePortfolio(e)})},o.handleEditorChanges=function(t){var e=o.state.portfolio;e.setComments(t.toString("html")),o.setState({portfolio:e,editorValue:t},function(){return o.props.savePortfolio(e)})},o.editPortfolio=function(){o.setState({editViewHidden:!1,viewStocksHidden:!0})},o.viewPortfolio=function(){o.setState({editViewHidden:!0,viewStocksHidden:!1})},o.removeStock=function(t){var e=o.state.portfolio,i=e.stockList,a=Object.keys(i).find(function(e){return i[e]===t});delete i[a],e.stockList=i,o.setState({portfolio:e}),o.state.portfolio.updatePortfolio(),o.props.savePortfolio(o.state.portfolio)},o.state={portfolio:new b,editorValue:v.a.createEmptyValue(),editViewHidden:!1,viewStocksHidden:!0},o}return Object(h.a)(e,t),Object(l.a)(e,[{key:"componentDidUpdate",value:function(t){this.props.currentPortfolio.stockList!==t.currentPortfolio.stockList&&this.setState({portfolio:this.props.currentPortfolio,totalInvestment:this.props.currentPortfolio.totalInvestment,editorValue:v.a.createValueFromString(this.props.currentPortfolio.comments,"html")})}},{key:"handleStockSubmit",value:function(t){t.preventDefault();var e=document.getElementById("stock-ticker").value.toUpperCase(),o=document.getElementById("num-shares").value,i=document.getElementById("expected-growth").value;this.state.portfolio.addStock(e,o,i),this.props.savePortfolio(this.state.portfolio),t.target.reset()}},{key:"fetchStocks",value:function(){var t=Object(m.a)(d.a.mark(function t(e){return d.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.updatePortfolio();case 2:this.props.setCurrentPortfolio(e),this.props.savePortfolio(this.state.portfolio);case 4:case"end":return t.stop()}},t,this)}));return function(e){return t.apply(this,arguments)}}()},{key:"render",value:function(){var t=this;return a.a.createElement("div",{className:"portfolioManager"},a.a.createElement("button",{className:"newPortfolio",onClick:function(){t.props.setCurrentPortfolio(new b),t.editPortfolio()},title:"Add Portfolio"},a.a.createElement("i",{className:"fa fa-plus-circle"})),a.a.createElement("button",{className:"editPortfolio",onClick:this.editPortfolio,title:"Edit Portfolio"},a.a.createElement("i",{className:"fa fa-edit"})),a.a.createElement("button",{className:"viewPortfolio",onClick:this.viewPortfolio,title:"Add Stocks"},a.a.createElement("i",{className:"fa fa-list"})),a.a.createElement("form",{className:"portfolio-attributes"},a.a.createElement("div",{className:this.state.editViewHidden?"hidden":"form-actions"},a.a.createElement("p",null,a.a.createElement("input",{type:"text",name:"title",placeholder:"Title your Portfolio",value:this.state.portfolio.title,onChange:this.handleTitleChanges,required:!0})),a.a.createElement(v.a,{id:"rte",name:"comments",value:this.state.editorValue,onChange:this.handleEditorChanges,placeholder:"Add a note about your portfolio . . ."}))),a.a.createElement("form",{className:this.state.viewStocksHidden?"hidden":"stockForm",onSubmit:this.handleStockSubmit.bind(this)},a.a.createElement("input",{type:"text",id:"stock-ticker",placeholder:"Enter a stock symbol . . .",required:!0}),a.a.createElement("input",{type:"number",id:"num-shares",placeholder:"Enter number of shares . . .",required:!0}),a.a.createElement("input",{type:"number",id:"expected-growth",step:"any",placeholder:"Enter the expected growth % for 1 year . . .",required:!0}),a.a.createElement("input",{type:"submit",value:"Add Stock to List"})),a.a.createElement("div",{className:this.state.viewStocksHidden?"hidden":"portfolioStockList"},a.a.createElement(g,{stockList:this.state.portfolio.stockList,removeStock:this.removeStock})),a.a.createElement("button",{className:this.state.viewStocksHidden?"hidden":"analyze",onClick:function(){t.fetchStocks(t.state.portfolio)}}," Analyze Stock List"))}}]),e}(i.Component)),x=function(t){var e=t.portfolio,o=t.setCurrentPortfolio,i=t.removePortfolio;return a.a.createElement("a",{onClick:function(){o(e)}},a.a.createElement("li",null,a.a.createElement("div",{className:"portfolio"},a.a.createElement("button",{className:"remove-portfolio",onClick:function(){i(e)},title:"Delete Portfolio"},a.a.createElement("i",{className:"fa fa-trash-o"})),a.a.createElement("div",{className:"portfolio-title"},e.title),a.a.createElement("div",{className:"portfolio-comments",dangerouslySetInnerHTML:{__html:e.comments}}),a.a.createElement("div",{className:"portfolio-return"},"Expected Annual Return: "+Number.parseFloat(100*e.expectedAnnualReturn).toPrecision(4)+"%"))))},R=(o(57),function(t){var e=t.portfolios,o=t.setCurrentPortfolio,i=t.savePortfolio,n=t.removePortfolio,r=Object.keys(e);return a.a.createElement("div",{className:"portfolioList"},a.a.createElement("h3",null,"Portfolio List "),a.a.createElement("ul",{id:"portfolios"},r.map(function(t){return a.a.createElement(x,{key:t,portfolio:e[t],setCurrentPortfolio:o,removePortfolio:n})})),a.a.createElement("div",{className:"actionBar"},a.a.createElement("button",{id:"printReport",onClick:function(){console.log("print report")},title:"Run Report"}," Print Report"),a.a.createElement("button",{id:"runReport",onClick:Object(m.a)(d.a.mark(function t(){var o;return d.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:t.t0=d.a.keys(e);case 1:if((t.t1=t.t0()).done){t.next=8;break}return o=t.t1.value,t.next=5,e[o].updatePortfolio();case 5:i(e[o]),t.next=1;break;case 8:case"end":return t.stop()}},t,this)})),title:"Run Report"}," Analyze All Portfolios")))}),N=function(t){return a.a.createElement("div",{className:"Main"},a.a.createElement(R,{portfolios:t.portfolios,setCurrentPortfolio:t.setCurrentPortfolio,savePortfolio:t.savePortfolio,removePortfolio:t.removePortfolio}),a.a.createElement(O,{savePortfolio:t.savePortfolio,portfolios:t.portfolios,setCurrentPortfolio:t.setCurrentPortfolio,currentPortfolio:t.currentPortfolio}))},L=function(t){function e(){var t;return Object(s.a)(this,e),(t=Object(c.a)(this,Object(u.a)(e).call(this))).createPortfolioObjects=function(e){for(var o,i={},a=Object.keys(e),n=0;n<a.length;n++){var r=a[n],s=e[r];i[r]=new b(s.title,s.comments,s),o=i[r];var l=t.createStockObjects(o);o.stockList=l}return t.createStockObjects(o),i},t.createStockObjects=function(t){for(var e={},o=Object.keys(t.stockList),i=0;i<o.length;i++){var a=o[i],n=t.stockList[a];e[a]=new y(n.ticker,n.numShares,n.growth,n)}return e},t.savePortfolio=function(e){var o=t.state.portfolios,i=Object.keys(o).find(function(t){return o[t]===e});delete o[i],Object.keys(o).includes(e.id)||(o[e.id]=e,t.setState({portfolios:o}),t.saveToLocalStorage())},t.saveToLocalStorage=function(){localStorage.setItem("portfolios",JSON.stringify(t.state.portfolios)),localStorage.setItem("currentPortfolio",JSON.stringify(t.state.currentPortfolio))},t.removePortfolio=function(e){var o=t.state.portfolios,i=Object.keys(o).find(function(t){return o[t]===e});delete o[i],t.setState({portfolios:o}),t.saveToLocalStorage()},t.setCurrentPortfolio=function(e){t.setState({currentPortfolio:e})},t.state={portfolios:{},currentPortfolio:new b},t}return Object(h.a)(e,t),Object(l.a)(e,[{key:"componentDidMount",value:function(){var t=localStorage.getItem("portfolios");if(null!==t&&2!==Object.keys(t).length){var e=JSON.parse(localStorage.getItem("portfolios"));this.setState({portfolios:{}});var o=this.createPortfolioObjects(e);this.setState({portfolios:o})}}},{key:"render",value:function(){var t={savePortfolio:this.savePortfolio,setCurrentPortfolio:this.setCurrentPortfolio,removePortfolio:this.removePortfolio};return a.a.createElement("div",{className:"App"},a.a.createElement(N,Object.assign({},t,{portfolios:this.state.portfolios,currentPortfolio:this.state.currentPortfolio})))}}]),e}(i.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));r.a.render(a.a.createElement(L,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(t){t.unregister()})}},[[19,2,1]]]);
//# sourceMappingURL=main.bc287257.chunk.js.map