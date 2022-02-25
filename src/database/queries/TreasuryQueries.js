function treasury_list_query(last_updated, quote, symbol){
    return `UPDATE treasury_list SET last_updated = ${last_updated}, quote = ${quote} WHERE symbol = ${symbol}`
}