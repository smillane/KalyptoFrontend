import { List } from "@mantine/core";
import { useSelector } from "react-redux";

import Layout from "../../main/node/components/layout"

// if user is not logged in with an account, only show a basic quote and chart
export default function EditWatchListPage({ temp }) {
  type list = Record<string, Array<string>>;
  type listFromDBType = Array<Record<string, Array<string>>>;
  const lists: listFromDBType = useSelector((state) => state.watchlists);
  const watchlist: list = lists.filter(it => it.hasOwnProperty(temp.listname))[0];

  if (watchlist && Object.keys(watchlist).length === 0 && Object.getPrototypeOf(watchlist) === Object.prototype) {
    return(
      <Layout>
        <h2>"error"</h2>
      </Layout>
    );
  } else {
    return (
      <Layout>
        <h1>{temp.listname}</h1>
        {Object.entries(watchlist).map(([key, value]) => (
          <List>
            {value.map(it => 
            <List.Item key={it}>{it}</List.Item>
            )}
          </List>
        ))}
      </Layout>
    )
  }
}

export async function getServerSideProps(context) {

  // const res = await fetch(`http://localhost:8080/stocks/${context.params.stock}/quote`)
  // const stockInformation = await res.json()
  const temp = {"listname": `${context.params.watchlist}`};

  return { props: { temp } }
}