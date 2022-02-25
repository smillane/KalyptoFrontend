import { useRouter } from "next/router";
import {updateAndReplace, updateAndAdd, findAndReturn} from '../../main/queriesAndUpdates'

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
  const updateAndReplaceQueries = [stockQuote, stockStatsBasic, stockLargestTrades];
  const findAndReturnQueries = [stockPreviousDividends];
  const updateAndAddQueries = [stockInsiderTrading, stockNextDividends];

  const response = updateAndReplace(params, stockQuote, true);
  const response2 = updateAndAdd(params, stockNextDividends, )

  return {
    props: {response},
  }
}
  