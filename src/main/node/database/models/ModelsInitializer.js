import mongoose from 'mongoose';

import stockInsiderTradingSchema from '../Schemas/InsiderTrading';
import stockLargestTradesSchema from '../Schemas/LargestTrades';
import stockNextDividendsSchema from '../Schemas/NextDividends';
import stockPreviousDividendSchema from '../Schemas/PreviousDividends';
import StockQuoteSchema from '../Schemas/Quote';
import stockStatsBasicSchema from '../Schemas/StatsBasic';

export default function modelInitializer() {
    mongoose.model('stockInsiderTradingModel', stockInsiderTradingSchema);
    mongoose.model('stockLargestTradesModel', stockLargestTradesSchema);
    mongoose.model('stockNextDividendsModel', stockNextDividendsSchema);
    mongoose.model('stockPreviousDividendModel', stockPreviousDividendSchema);
    mongoose.model('StockQuoteModel', StockQuoteSchema);
    mongoose.model('stockStatsBasicModel', stockStatsBasicSchema);
}