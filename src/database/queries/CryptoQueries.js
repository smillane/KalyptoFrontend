function crypto_list_query(last_updated, quote, symbol){
    return `UPDATE crypto_list SET last_updated = ${last_updated}, quote = ${quote} WHERE symbol = ${symbol}`
}