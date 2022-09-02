import { List,ThemeIcon } from "@mantine/core";
import { IconPoint } from '@tabler/icons';

import Layout from "../../main/node/components/layout"
import Watchlist from "../../main/node/redux/features/userLists/Watchlist"

// if user is not logged in with an account, only show a basic quote and chart
export default function Stock({ stockInformation, tempList }) {  
  return (
    <Layout>
      <h1>Stock Quote</h1>
      <h1>{stockInformation.symbol}</h1>
        <tbody>
          {Object.entries(stockInformation).map(([key, value]) => (
            <tr key={key}>{key}: {value}</tr>
            ))}
        </tbody>
      <Watchlist tempList={tempList}/>
    </Layout>
  )
}

export async function getServerSideProps(context) {

  // const res = await fetch(`http://localhost:8080/stocks/${context.params.stock}/quote`)
  // const stockInformation = await res.json()

  const stockInformation = {"symbol": `${context.params.stock}`, "Latest Price": 162}
  const tempList = [{"tech": ["amd", "nvda", "net", "crwd"]}, {"oil": ["bp", "shel", "shell", "oxy"]}];

  if (!stockInformation) {
    return {
      notFound: true
    }
  }

  return { props: { stockInformation, tempList } }
}