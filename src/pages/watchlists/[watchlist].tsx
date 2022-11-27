import { Table } from '@mantine/core';
import { useAuthUser, withAuthUser } from 'next-firebase-auth';
import Link from 'next/link';

import Layout from '../../main/node/components/layout.tsx';
import { useGetUserWatchlistsQuery } from '../../main/node/redux/features/userLists/WatchlistSlice';

// if user is not logged in with an account, only show a basic quote and chart
function EditWatchListPage({ data }) {
  type list = Record<string, any>;
  const user = useAuthUser();
  const {
    data: Watchlists,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetUserWatchlistsQuery(user.id);
  const watchlist: list = Watchlists.filter(
    (it) => Object.prototype.hasOwnProperty.call(it, data.watchlistName) && Object.prototype.hasOwnProperty.call(it, data.position),
  );
  if (isError || error) {
    return (
      <Layout>
        <h2>error</h2>
      </Layout>
    );
  }
  return (
    <Layout>
      {Object.entries(watchlist).map(([key, value]) => (
        <>
          <thead>
            <tr>
              <th>
                <h2>{key}</h2>
              </th>
            </tr>
          </thead>
          <Table highlightOnHover>
            <tbody>
              {value.map((it) => <Link href={`/stocks/${it}`} passHref key={it}><tr>{it}</tr></Link>)}
            </tbody>
          </Table>
        </>
      ))}
    </Layout>
  );
}

export default withAuthUser()(EditWatchListPage);
// add ability to remove item from list,
// or add new stock to list (would have to query backend to check if it exists?,
// or should just only have this functionatlity on the stock page itself)

export async function getServerSideProps(context) {
  // const res = await fetch(`http://localhost:8080/stocks/${context.params.stock}/quote`)
  // const stockInformation = await res.json()
  const data = { watchlistName: `${context.params.watchlist}`, position: `${context.params.position}` };

  return { props: { data } };
}
