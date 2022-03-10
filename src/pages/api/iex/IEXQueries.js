const IEX_BASE_API = 'https://sandbox.iexapis.com/stable/'
const IEX_BASE_API_TIMES_SERIES = 'https://sandbox.iexapis.com/stable/time-series/'


// STOCKS

function stockQuote(symbol) {
    return `${IEX_BASE_API}stock/${symbol}/quote?token=${IEX_PUBLIC_TOKEN}`
}

function stockStatsBasic(symbol) {
    return `${IEX_BASE_API}stock/${symbol}/stats?token=${IEX_PUBLIC_TOKEN}`
}

// ?from={CURRENT DATE}}&limit=(probably 10 or 15?, can adjust based off API usage, 
// don't want too small, but don't want too big incase it hasn't been updated in a while)
function stockInsiderTrading(symbol, lastUpdated) {
    return `${IEX_BASE_API_TIMES_SERIES}insider_transactions/${symbol}?from=${lastUpdated}&limit=15?token=${IEX_PUBLIC_TOKEN}`
}

function stockPreviousDividends(symbol) {
    return `${IEX_BASE_API}stock/${symbol}/dividends/1y?token=${IEX_PUBLIC_TOKEN}`
}

function stockNextDividends(symbol) {
    return `${IEX_BASE_API}stock/${symbol}/dividends/next?token=${IEX_PUBLIC_TOKEN}`
}

function stockLargestTrades(symbol) {
    return `${IEX_BASE_API}stock/${symbol}/largest-trades?token=${IEX_PUBLIC_TOKEN}`
}

// CRYPTO
function upcomingIpos(symbol) {
    return `${IEX_BASE_API}stock/${symbol}/market/upcoming-ipos?token=${IEX_PUBLIC_TOKEN}`
}

function cryptoPrice(symbol) {
    return `${IEX_BASE_API}crypto/${symbol}/price?token=${IEX_PUBLIC_TOKEN}`
}


// TREASURIES
function treasuryPrice(symbol) {
    return `${IEX_BASE_API_TIMES_SERIES}treasury/${symbol}?token=${IEX_PUBLIC_TOKEN}`
}

// COMMODITIES

function energyPrice(symbol) {
    return `${IEX_BASE_API_TIMES_SERIES}energy/${symbol}?token=${IEX_PUBLIC_TOKEN}`
}

/*
treasury symbols

DGS30	30 Year constant maturity rate
DGS20	20 Year constant maturity rate
DGS10	10 Year constant maturity rate
DGS7	7 Year constant maturity rate
DGS5	5 Year constant maturity rate
DGS3	3 Year constant maturity rate
DGS2	2 Year constant maturity rate
DGS1	1 Year constant maturity rate
DGS6MO	6 Month constant maturity rate
DGS3MO	3 Month constant maturity rate
DGS1MO	1 Month constant maturity rate

commodities
DCOILWTICO
DCOILBRENTEU
*/