import { useRouter } from "next/router";
import { updateAndReplace, updateOnIntervalsAndAdd, findAndReturn } from '../../main/queriesAndUpdates'

// if user is not logged in with an account, only show a basic quote and chart
export default function Stock() {

    const router = useRouter()
    const { stock } = router.query

    return (
      <div>
        <h1>{stock}</h1>
        <h3>{response}</h3>
        <h3>{props}</h3>
      </div>
    )
}

export async function getServerSideProps(context) {
  // const updateAndReplaceQueries = [stockQuote, stockStatsBasic, stockLargestTrades];
  const updateAndReplaceQueries = new Map([[stockQuote, [true, false]], [stockStatsBasic, false, false]], [stockLargestTrades, [false, false]], [stockInsiderTrading, [false, true]]);
  const findAndReturnQueries = [stockPreviousDividends];
  const updateOnIntervalsAndAddQueries = [stockNextDividends];

  // const response = updateAndReplace(params, stockQuote, true);
  if (!dbQueryExistsCheck(params)) {
    return {
      notFound: true
    }
  }

  const response = updateAndReplaceQueries.forEach((value, key) => {updateAndReplace(params, key, value[0], value[1])});
  const response3 = findAndReturn(params, stockPreviousDividends);
  const response2 = updateOnIntervalsAndAdd(params, stockNextDividends);

  return {
    props: {response},
  }
}
  