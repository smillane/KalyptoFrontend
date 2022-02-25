function stock_quote_update(last_updated, quote, symbol) {
    return `UPDATE stock_list SET last_updated = ${last_updated}, quote = ${quote} WHERE symbol = ${symbol}`
}

function stock_stats_basic_update(last_updated, stats_basic, symbol){
    return `UPDATE stock_list SET last_updated = ${last_updated}, stats_basic = ${stats_basic} WHERE symbol = ${symbol}`
}
    

function stock_insider_trading_update (last_updated, insider_trading, symbol){
    return `UPDATE stock_list SET last_updated = ${last_updated}, insider_trading = ${insider_trading} WHERE symbol = ${symbol}`
}


function stock_previous_dividends_update(last_updated, previous_dividends, symbol){
    return `UPDATE stock_list SET last_updated = ${last_updated}, previous_dividends = ${previous_dividends} WHERE symbol = ${symbol}`
}


function stock_next_dividends_update(last_updated, next_dividends, symbol){
    return `UPDATE stock_list SET last_updated = ${last_updated}, next_dividends = ${next_dividends} WHERE symbol = ${symbol}`
}


function stock_largest_trades_update(last_updated, largest_trades, symbol){
    return `UPDATE stock_list SET last_updated = ${last_updated}, largest_trades = ${largest_trades} WHERE symbol = ${symbol}`
}


