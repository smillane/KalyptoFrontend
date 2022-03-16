import { useRouter } from "next/router";
import { updateAndReplace, updateOnIntervalsAndAdd, findAndReturn, queryExistsCheck } from '../../main/queriesAndUpdates'
import { stockQuoteModel, stockStatsBasicModel, stockLargestTradesModel, stockInsiderTradingModel, stockPreviousDividendsModel, stockNextDividendsModel } from '../../main/database/models/tables'

// if user is not logged in with an account, only show a basic quote and chart
export default function Stock() {

    const router = useRouter()
    const { stock } = router.query

    return (
      <div>
        <h1>{stock}</h1>
        <h3>{response}</h3>
        <h3>{response2}</h3>
        <h3>{response3}</h3>
        <h3>{props}</h3>
      </div>
    )
}

export async function getServerSideProps(context) {
  const updateAndReplaceQueries = new Map([[stockQuoteModel, [true, false]], [stockStatsBasicModel, false, false]], [stockLargestTradesModel, [false, false]], [stockInsiderTradingModel, [false, true]]);
  const findAndReturnQueries = [stockPreviousDividendsModel];
  const updateOnIntervalsAndAddQueries = [stockNextDividendsModel];

  if (!queryExistsCheck(context.params.id)) {
    return {
      notFound: true
    }
  }

  // const response = updateAndReplaceQueries.forEach((value, key) => {updateAndReplace(context.params.id, key, value[0], value[1])});
  // const response2 = updateOnIntervalsAndAdd(context.params.id, stockNextDividends);
  // const response3 = findAndReturn(context.params.id, stockPreviousDividends);

  return {
    props: {response, response2, response3},
  }
}
  