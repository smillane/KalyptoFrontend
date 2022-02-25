function commodities_query(last_updated, quote, symbol){
    return `UPDATE commodities_list SET last_updated = ${last_updated}, quote = ${quote} WHERE symbol = ${symbol}`
}