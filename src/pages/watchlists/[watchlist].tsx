import { useSelector } from "react-redux";

import Layout from "../../main/node/components/layout"

// if user is not logged in with an account, only show a basic quote and chart
export default function EditWatchListPage({ temp }) {
  type list = Record<string, Array<string>>;
  type listFromDBType = Array<Record<string, Array<string>>>;
  const lists: listFromDBType = useSelector((state) => state.watchlists);
  console.log(temp.listname);
  console.log(lists);
  const watchlist: list = lists.filter(it => it.hasOwnProperty(temp.listname))[0];
  console.log(watchlist);

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
          <>
            <h3 key={key}>{key}</h3>
            {value.map(it => 
            <h5 key={it}>{it}</h5>
            )}
          </>
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