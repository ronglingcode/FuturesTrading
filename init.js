window.TradingApp = {
    'Settings': {
        'currentDay': new Date('2022-06-17 6:30'), //('2022-01-28 6:30'),
        'drawIndicatorsAsSeries': true,
        'preMarketTrading': false
    },
    'Algo': {},
    'StockCandidates': {
        '/MES': {
            symbol: '/MES', volumeSum: 0, tradingSum: 0, premktHigh: 0, premktLow: 0,
            //bias: 'short',
            //boxup: 119.5, boxdown: 118
        },

    },
    'State': {
        activeSymbol: '',
        activeTabIndex: -1
    }
};

// only pick the best stocks, stocks with biggest news to trade
// be selective
let currentDay = window.TradingApp.Settings.currentDay;
let bestStocksToTradeToday = ['/MES'];
window.TradingApp.Watchlist = [];
bestStocksToTradeToday.forEach(symbol => {
    window.TradingApp.Watchlist.push(window.TradingApp.StockCandidates[symbol]);
});

let currentDayStr = `${currentDay.getFullYear()}-${currentDay.getMonth() + 1}-${currentDay.getDate()}`;

let dtStartTime = new Date(`${currentDayStr} 01:00`);
dtStartTime.setTime(dtStartTime.getTime() + ((-3) * 60 * 60 * 1000)); // new york 1:00:00 AM
window.TradingApp.Settings.dtStartTime = dtStartTime;

window.TradingApp.Settings.marketOpenTime = new Date(`${currentDayStr} 06:30:00`);
// setup reminder for first minute close
let now = new Date();
let rightBeforeFirstMinuteClose = new Date();
rightBeforeFirstMinuteClose.setHours(6);
rightBeforeFirstMinuteClose.setMinutes(30);
rightBeforeFirstMinuteClose.setSeconds(50);
let waitTime = rightBeforeFirstMinuteClose - now;
if (waitTime > 0) {
    setTimeout(() => {
        var msg = new SpeechSynthesisUtterance();
        msg.text = "Check all stocks for first minute close";
        window.speechSynthesis.speak(msg);
    }, waitTime);
}
