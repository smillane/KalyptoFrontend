import { useRouter } from "next/router";

import dbConnect from '../../main/node/database/dBConnect';
import stockRelationships from '../../main/node/relationships';
import { updateAndReplace, updateOnIntervalsAndAdd, findAndReturn, queryExistsCheck } from '../../main/node/queriesAndUpdates';
import StockQuoteModel from '../../main/node/database/models/Stocks/Quote';
import StockStatsBasicModel from '../../main/node/database/models/Stocks/StatsBasic';
import StockLargestTradesModel from '../../main/node/database/models/Stocks/LargestTrades';
import StockInsiderTradingModel from '../../main/node/database/models/Stocks/InsiderTrading';
import StockPreviousDividendsModel from '../../main/node/database/models/Stocks/PreviousDividends';
import StockNextDividendsModel from '../../main/node/database/models/Stocks/NextDividends';

// if user is not logged in with an account, only show a basic quote and chart
export default function Stock({apiData}) {
  const router = useRouter();
  console.log(apiData);
  
  return (
    <div>
      <h1>{apiData.latestPrice}</h1>
      <h1>{router.query.stock}</h1>
    </div>
  )
}

export async function getServerSideProps(context) {
  await dbConnect();

  const stock = context.params.stock;
  const apiData = await queryExistsCheck(stock);
  const updateAndReplaceQueries = new Map([[StockQuoteModel, [true, false]], [StockStatsBasicModel, [false, false]], [StockLargestTradesModel, [false, false]], [StockInsiderTradingModel, [false, true]]]);
  const updateOnIntervalsAndAddQueries = [StockNextDividendsModel];
  const findAndReturnQueries = [StockPreviousDividendsModel];

  if (!apiData) {
    return {
      notFound: true
    }
  }

  // const response = updateAndReplaceQueries.forEach((value, key) => {updateAndReplace(stock, stockRelationships.get(key) , key, value[0], value[1])});
  // const response2 = updateOnIntervalsAndAdd(stock, stockRelationships.get(stockNextDividendsModel), stockNextDividendsModel, stockPreviousDividendsModel);
  // const response3 = findAndReturn(stock, stockRelationships.get(stockPreviousDividendsModel), stockPreviousDividendsModel);

  return { props: {apiData} }
}
  