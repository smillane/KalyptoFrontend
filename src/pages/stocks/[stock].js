import { useRouter } from "next/router"

import dbConnect from '../../main/node/database/dBConnect'
import stockRelationships from '../../main/node/relationships'
import { updateAndReplace, updateOnIntervalsAndAdd, findAndReturn, queryExistsCheck } from '../../main/node/queriesAndUpdates'
import { stockQuoteModel, stockStatsBasicModel, stockLargestTradesModel, stockInsiderTradingModel, stockPreviousDividendsModel, stockNextDividendsModel } from '../../main/node/database/models/Stocks/Quote'

// if user is not logged in with an account, only show a basic quote and chart
export default function Stock({apiData}) {
  const router = useRouter();
  console.log(apiData);
  
  return (
    <div>
      <h1>{apiData}</h1>
    </div>
  )
}

export async function getServerSideProps(context) {
  await dbConnect();

  const stock = context.params.stock;
  const apiData = await queryExistsCheck(stock);
  // const updateAndReplaceQueries = new Map([[stockQuoteModel, [true, false]], [stockStatsBasicModel, [false, false]], [stockLargestTradesModel, [false, false]], [stockInsiderTradingModel, [false, true]]]);
  // const updateOnIntervalsAndAddQueries = [stockNextDividendsModel];
  // const findAndReturnQueries = [stockPreviousDividendsModel];

  if (!apiData) {
    return {
      notFound: true
    }
  }

  //const response = updateAndReplaceQueries.forEach((value, key) => {updateAndReplace(stock, stockRelationships.get(key) ,key, value[0], value[1])});
  // const response2 = updateOnIntervalsAndAdd(stock, stockRelationships.get(stockNextDividendsModel), stockNextDividendsModel, stockPreviousDividendsModel);
  // const response3 = findAndReturn(stock, stockRelationships.get(stockPreviousDividendsModel), stockPreviousDividendsModel);

  return { props: {apiData} }
}
  