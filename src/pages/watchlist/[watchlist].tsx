import { Table } from '@mantine/core';
import { useAuthUser, withAuthUser } from 'next-firebase-auth';
import Link from 'next/link';

import Layout from '../../main/node/components/layout.tsx';
import { useGetUserSingleWatchlistQuery } from '../../main/node/redux/features/userLists/WatchlistSlice.tsx';

// if user is not logged in with an account, only show a basic quote and chart
function EditWatchListPage({ watchlistNameData, positionData }) {
  const user = useAuthUser();

  if (user.id === null) {
    return (
      <Layout>
        <h2>There was an error</h2>
      </Layout>
    );
  }

  const {
    data: Watchlists,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetUserSingleWatchlistQuery(user.id, watchlistNameData, positionData);

  const filteredWatchlist: Record<string, any> = Watchlists?.at(0);

  if (isLoading) {
    return (
      <Layout>
        <h1>loading...</h1>
      </Layout>
    );
  }

  if (isError || error) {
    console.error('watchlist error', error);
    return (
      <Layout>
        <h2>There was an error</h2>
      </Layout>
    );
  }

  if (isSuccess) {
    return (
      <Layout>
        <h1>{filteredWatchlist.watchlistName}</h1>
        {filteredWatchlist.watchlist.map((stock) => (
          <h2 key={stock}>{stock}</h2>
        ))}
      </Layout>
    );
  }
}

export async function getServerSideProps(context) {
  // const res = await fetch(`http://localhost:8080/stocks/${context.params.stock}/quote`)
  // const stockInformation = await res.json()
  const data: string = `${context.params.watchlist}`;
  const splitData: Array<string> = data.split('&');

  return {
    props: { watchlistNameData: splitData.at(0), positionData: splitData.at(1) },
  };
}

export default withAuthUser()(EditWatchListPage);
