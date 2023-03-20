import { useEffect } from 'react';
import {
  Button,
  createStyles, Space, Text, Title,
} from '@mantine/core';
import { useListState } from '@mantine/hooks';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { IconGripVertical } from '@tabler/icons';
import { useAuthUser, withAuthUser } from 'next-firebase-auth';

import Layout from '../../main/node/components/layout.tsx';
import { useGetUserSingleWatchlistQuery, useUpdateWatchlistMutation } from '../../main/node/redux/features/userLists/WatchlistSlice.tsx';

const useStyles = createStyles((theme) => ({
  item: {
    display: 'flex',
    alignItems: 'center',
    borderRadius: theme.radius.md,
    border: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
    padding: `${theme.spacing.sm}px ${theme.spacing.xl}px`,
    paddingLeft: theme.spacing.xl - theme.spacing.md, // to offset drag handle
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.white,
    marginBottom: theme.spacing.sm,
  },

  itemDragging: {
    boxShadow: theme.shadows.sm,
  },

  symbol: {
    fontSize: 30,
    fontWeight: 700,
    width: 60,
  },

  dragHandle: {
    ...theme.fn.focusStyles(),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    color: theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.gray[6],
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
  },
}));

async function getStockQuote(stock: string) {
  const stockData = await fetch(`http://localhost:8080/stocks/${stock}/quote`);
  return stockData;
}

function getStockLatestPrice(stock) {
  // const quote = getStockQuote(stock).latestPrice;
  // return (quote || 0.00);
  return 0.00;
}

function EditWatchListPage({ watchlistNameData, positionData }) {
  const { classes, cx } = useStyles();
  const [state, handlers] = useListState<string>([]);
  const user = useAuthUser();
  const {
    data: Watchlist,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetUserSingleWatchlistQuery(
    { userID: user.id, listname: watchlistNameData, position: positionData },
  );
  const [updateWatchlist] = useUpdateWatchlistMutation();

  useEffect(() => {
    if (isSuccess && state.length === 0) {
      handlers.setState(Watchlist.watchlist);
    }
  });

  const UpdateWatchlistUponChange = async () => {
    console.log('current state is ', state);
    await updateWatchlist(
      {
        userID: user.id, listname: watchlistNameData, position: positionData, list: state,
      },
    );
  };

  if (user.id !== null) {
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
          <h1>There was an error</h1>
        </Layout>
      );
    }

    if (isSuccess && state.length !== 0) {
      const items = state.map((stock, index) => (
        <Draggable key={stock} index={index} draggableId={stock}>
          {(provided, snapshot) => (
            <div
              className={cx(classes.item, { [classes.itemDragging]: snapshot.isDragging })}
              ref={provided.innerRef}
              {...provided.draggableProps}
            >
              <div {...provided.dragHandleProps} className={classes.dragHandle}>
                <IconGripVertical size={18} stroke={1.5} />
              </div>
              <Text className={classes.symbol}>{stock}</Text>
              <Text className={classes.symbol} align="right">{getStockLatestPrice(stock)}</Text>
            </div>
          )}
        </Draggable>
      ));

      return (
        <Layout>
          <Title order={1} align="center">{Watchlist.watchlistName}</Title>
          <Space h="xl" />
          <DragDropContext
            onDragEnd={({ destination, source }) => {
              handlers.reorder(
                { from: source.index, to: destination?.index || 0 },
              );
            }}
          >
            <Droppable droppableId="watchlist" direction="vertical">
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  {items}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
          <Space />
          <Button color="dark" size="md" onClick={UpdateWatchlistUponChange}>Done</Button>
        </Layout>
      );
    }
  }

  return (
    <Layout>
      <h1>loading...</h1>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const data: Array<string> = `${context.params.watchlist}`.split('&');

  return {
    props: { watchlistNameData: data.at(0), positionData: data.at(1) },
  };
}

export default withAuthUser()(EditWatchListPage);
