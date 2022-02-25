function stock_query(symbol){
    return `SELECT * FROM stock_list WHERE symbol = ${symbol}`
}


function ipo_query(){
    return `SELECT * FROM upcoming_ipos`
}