import { useRouter } from "next/router";

import { stockRelationships } from '../../main/node/relationships'
import { updateAndReplace, updateOnIntervalsAndAdd, findAndReturn, queryExistsCheck } from '../../main/node/queriesAndUpdates'
import { stockQuoteModel, stockStatsBasicModel, stockLargestTradesModel, stockInsiderTradingModel, stockPreviousDividendsModel, stockNextDividendsModel } from '../../main/node/database/models/models'

// if user is not logged in with an account, only show a basic quote and chart
export default function Stock() {

    const router = useRouter()
    const { stock } = router.query

    return (
      <div>
        <h1>{stock}</h1>
        <h3>{response}</h3>
      </div>
    )
}

export async function getServerSideProps(params) {
  const updateAndReplaceQueries = new Map([[stockQuoteModel, [true, false]], [stockStatsBasicModel, [false, false]], [stockLargestTradesModel, [false, false]], [stockInsiderTradingModel, [false, true]]]);
  const updateOnIntervalsAndAddQueries = [stockNextDividendsModel];
  const findAndReturnQueries = [stockPreviousDividendsModel];

  if (!queryExistsCheck(params.id)) {
    return {
      notFound: true
    }
  }

  const response = updateAndReplaceQueries.forEach((value, key) => {updateAndReplace(params.id, stockRelationships.get(key) ,key, value[0], value[1])});
  // const response2 = updateOnIntervalsAndAdd(params.id, stockRelationships.get(stockNextDividendsModel), stockNextDividendsModel, stockPreviousDividendsModel);
  // const response3 = findAndReturn(params.id, stockRelationships.get(stockPreviousDividendsModel), stockPreviousDividendsModel);

  return {
    props: {response},
  }
}
  