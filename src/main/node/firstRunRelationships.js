import StockStatsBasicModel from './database/models/Stocks/StatsBasic'
import StockLargestTradesModel from './database/models/Stocks/LargestTrades'
import StockPreviousDividendsModel from './database/models/Stocks/PreviousDividends'
import StockNextDividendsModel from './database/models/Stocks/NextDividends'
import { stockStatsBasic, stockLargestTrades, stockPreviousDividends, stockNextDividends } from '../../pages/api/iex/IEXQueries'

export default function firstRunRelationships() { new Map([[StockStatsBasicModel, stockStatsBasic], [StockLargestTradesModel,stockLargestTrades], [StockPreviousDividendsModel, stockPreviousDividends], [StockNextDividendsModel, stockNextDividends]]) }