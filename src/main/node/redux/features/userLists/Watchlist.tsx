import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Menu,
  Container,
  ActionIcon,
  Accordion,
  Box,
  Modal,
  TextInput,
  Space,
  Group,
  Button,
  useMantineTheme,
  Text,
  Table,
  Stack,
  Divider,
} from '@mantine/core';
import { IconDots, IconSettings } from '@tabler/icons';
import Link from 'next/link';
import { useAuthUser, withAuthUser } from 'next-firebase-auth';
import { v4 as uuidv4 } from 'uuid';

// eslint-disable-next-line import/no-cycle
import AddWatchlist from './AddWatchlist.tsx';
// eslint-disable-next-line import/no-cycle
import DeleteWatchlist from './DeleteWatchlist.tsx';
import { updateListName, fetchWatchlistsQuery, getWatchlists } from './WatchlistSlice.tsx';
import DisabledWatchList from '../../../components/disabledAddWatchlist.tsx';
import { greenOrRed } from '../../../util/formating.tsx';
import { store } from '../../store';

function AccordionControl(props) {
  const [opened, setOpened] = useState(false);
  const [error, setError] = useState<string>('');
  const [listName, setListName] = useState<string>('');
  const theme = useMantineTheme();
  const dispatch = useDispatch();
  const onNewListNameInput = (
    e: { currentTarget: { value: React.SetStateAction<string>; }; },
  ) => setListName(e.currentTarget.value);

  const onUpdateListName = () => {
    if (listName.length !== 0) {
      dispatch(
        updateListName({ oldName: props.listname, newName: listName }),
      );
      setListName('');
      setOpened(false);
    } else {
      setError('Please input a name');
    }
  };

  return (
    <>
      <Modal
        centered
        opened={opened}
        onClose={() => { setOpened(false); setError(''); }}
        title="Edit Watchlist Name"
        overlayColor={theme.colors.gray[2]}
      >
        <TextInput
          placeholder="Name your list!"
          data-autofocus
          error={error}
          value={listName}
          onChange={onNewListNameInput}
        />
        <Space h="xs" />
        <Group position="apart">
          <Button variant="outline" color="dark" onClick={() => setOpened(false)}>
            Cancel
          </Button>
          <Button variant="outline" color="dark" onClick={onUpdateListName}>
            Update
          </Button>
        </Group>
      </Modal>

      <Box
        sx={(theme) => ({
          background: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[1], display: 'flex', alignItems: 'center',
        })}
      >
        <Accordion.Control {...props} />
        <Menu>
          <Menu.Target>
            <ActionIcon size="lg">
              <IconDots size={16} />
            </ActionIcon>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item icon={<IconSettings size={14} />} onClick={() => setOpened(true)}>
              Rename
            </Menu.Item>
            <Link href={`/watchlists/${props.listname}`} passHref><Menu.Item icon={<IconSettings size={14} />}>Edit</Menu.Item></Link>
            <DeleteWatchlist userID="userID" listname={props.listname} />
          </Menu.Dropdown>
        </Menu>
      </Box>
    </>
  );
}

function Watchlist() {
  const user = useAuthUser();
  const state = store.getState();
  const lists: Array<Object> = state.watchlists.data;
  console.log('watchlist', lists);
  if (user.id === null) {
    return (
      <DisabledWatchList
        space={<Space h="xl" />}
        theme={(theme) => ({
          boxShadow: theme.shadows.sm, borderRadius: theme.radius.sm, margin: '2px', padding: '20px 20px 40px 20px', background: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[1], height: 'min-content',
        })}
      />
    );
  }
  if (user.id !== null && Array.isArray(lists) && lists.length !== 0) {
    return (
      <Container sx={(theme) => ({
        boxShadow: theme.shadows.sm, borderRadius: theme.radius.sm, margin: '2px', padding: '0px 0px 15px 0px', background: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[1], height: 'min-content', width: '240px',
      })}
      >
        <Space h="xl" />
        <AddWatchlist
          user={user}
          position={lists.length}
        />
        <Space h="xs" />
        <Divider />
        <Accordion
          variant="filled"
          multiple
          sx={{
            width: 'auto',
          }}
          styles={{ content: { padding: '0px' } }}
        >
          {lists.map((it) => (
            <Accordion.Item value={it.watchlistName} key={uuidv4()}>
              <AccordionControl
                listname={it.watchlistName}
                sx={(theme) => ({
                  background: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[1],
                  '&:hover': {
                    backgroundColor:
                    theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[3],
                  },
                })}
              >
                <Text weight={700}>
                  {it.watchlistName}
                </Text>
              </AccordionControl>
              <Accordion.Panel
                sx={(theme) => ({
                  background: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[1], panel: { padding: '0px' },
                })}
              >
                <Table highlightOnHover>
                  <tbody>
                    {it.watchlist.map((stock) => (
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
                          <Text align="left" transform="uppercase" weight={500} sx={{ paddingLeft: '1em' }}>
                            {stock}
                          </Text>
                          {/* <Stack sx={{ gap: 0, paddingRight: '1em' }}>
                            <Text weight={500} align="right">
                              $
                              {quote.latestPrice}
                            </Text>
                            <Text weight={500} align="right" color={greenOrRed(quote.changePercent)}>
                              {(quote.changePercent * 100).toFixed(2)}
                            </Text>
                          </Stack> */}
                        </Box>
                      </Link>
                    ))}
                  </tbody>
                </Table>
              </Accordion.Panel>
            </Accordion.Item>
          ))}
        </Accordion>
      </Container>
    );
  }

  return (
    <AddWatchlist
      user={user}
      position={0}
      space={<Space h="xl" />}
      theme={(theme) => ({
        boxShadow: theme.shadows.sm, borderRadius: theme.radius.sm, margin: '2px', padding: '20px 20px 40px 20px', background: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[1], height: 'min-content',
      })}
    />
  );
}

export default withAuthUser()(Watchlist);
