import StockQuoteModel from './database/models/Stocks/Quote'
import StockStatsBasicModel from './database/models/Stocks/StatsBasic'
import StockLargestTradesModel from './database/models/Stocks/LargestTrades'
import StockInsiderTradingModel from './database/models/Stocks/InsiderTrading'
import StockPreviousDividendsModel from './database/models/Stocks/PreviousDividends'
import StockNextDividendsModel from './database/models/Stocks/NextDividends'
import { stockQuote, stockStatsBasic, stockLargestTrades, stockInsiderTrading, stockPreviousDividends, stockNextDividends } from '../../pages/api/iex/IEXQueries'

export const stockRelationships = new Map([[StockQuoteModel, stockQuote], [StockStatsBasicModel, stockStatsBasic], [StockLargestTradesModel,stockLargestTrades], [StockInsiderTradingModel, stockInsiderTrading], [StockPreviousDividendsModel, stockPreviousDividends], [StockNextDividendsModel, stockNextDividends]]);