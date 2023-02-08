import {
  createStyles, Box, Text, Title,
} from '@mantine/core';
import { useListState } from '@mantine/hooks';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { IconGripVertical } from '@tabler/icons';
import { useAuthUser, withAuthUser } from 'next-firebase-auth';
import Link from 'next/link';

import Layout from '../../main/node/components/layout.tsx';
import { useGetUserSingleWatchlistQuery } from '../../main/node/redux/features/userLists/WatchlistSlice.tsx';

async function getStockQuote(stock: string) {
  const stockData = await fetch(`http://localhost:8080/stocks/${stock}/quote`);
  return stockData;
}

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

// if user is not logged in with an account, only show a basic quote and chart
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

    if (Watchlist.watchlist == null) {
      <Title order={1}>{Watchlist.watchlistName}</Title>;
    }

    if (isSuccess) {
      console.log(state);
      const items = (() => {
        if (state.length === 0) {
          return Watchlist.watchlist.map((stock, index) => (
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
                  <Text className={classes.symbol}>{getStockQuote(stock).latestPrice}</Text>
                  {/* <div>
                      <Text>{item.name}</Text>
                      <Text color="dimmed" size="sm">
                        Position: {item.position} • Mass: {item.mass}
                      </Text>
                    </div> */}
                </div>
              )}
            </Draggable>
          ));
        }
        return state.map((stock, index) => (
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
                <Text className={classes.symbol}>{getStockQuote(stock).latestPrice}</Text>
                {/* <div>
                    <Text>{item.name}</Text>
                    <Text color="dimmed" size="sm">
                      Position: {item.position} • Mass: {item.mass}
                    </Text>
                  </div> */}
              </div>
            )}
          </Draggable>
        ));
      })();

      return (
        <Layout>
          <Title order={1}>{Watchlist.watchlistName}</Title>
          <DragDropContext
            onDragEnd={({ destination, source }) => handlers.reorder(
              { from: source.index, to: destination?.index || 0 },
            )}
          >
            <Droppable droppableId="dnd-list" direction="vertical">
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  {items}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
          {/* {Watchlist.watchlist.map((stock) => (
                <Link href={`/stocks/${stock}`} key={stock} passHref>
                  <Box
                    sx={(theme) => ({
                      height: '70px',
                      width: '100%',
                      padding: '0px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      '&:hover': {
                        backgroundColor:
                                  theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[3],
                      },
                    })}
                  >
                    <Text align="left" transform="uppercase" weight={700}>{stock}</Text>
                    <h2>{getStockQuote(stock).latestPrice}</h2>
                  </Box>
                </Link>
              ))} */}
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
