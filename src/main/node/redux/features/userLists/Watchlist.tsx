import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
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
import { useGetUserWatchlistsQuery, useUpdateWatchlistNameMutation } from './WatchlistSlice.tsx';
import DisabledWatchList from '../../../components/disabledAddWatchlist.tsx';

function AccordionControl(props) {
  const [opened, setOpened] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [newListName, setNewListName] = useState<string>('');
  const theme = useMantineTheme();
  const [updateWatchlistName, { isLoading }] = useUpdateWatchlistNameMutation();
  const onNewListNameInput = (
    e: { currentTarget: { value: React.SetStateAction<string>; }; },
  ) => setNewListName(e.currentTarget.value);

  const onUpdateListName = async () => {
    if (newListName.length !== 0 && !isLoading) {
      try {
        await updateWatchlistName(
          {
            userID: props.userID,
            currentListName: props.currentListName,
            position: props.position,
            newListName,
          },
        ).unwrap();
        setNewListName('');
        setOpened(false);
      } catch (err) {
        console.error('failed to update watchlistname', err);
        setError('Please input a name');
      }
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
          value={newListName}
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
            <Link href={`/watchlists/${props.listname}/${props.position}`} passHref><Menu.Item icon={<IconSettings size={14} />}>Edit</Menu.Item></Link>
            <DeleteWatchlist
              userID={props.userID}
              listname={props.currentListName}
              position={props.position}
            />
          </Menu.Dropdown>
        </Menu>
      </Box>
    </>
  );
}

function Watchlist() {
  const user = useAuthUser();
  const {
    data: Watchlists,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetUserWatchlistsQuery(user.id);
  console.log('watchlist', Watchlists);
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
  if (user.id !== null && Array.isArray(Watchlists) && Watchlists.length !== 0) {
    return (
      <Container sx={(theme) => ({
        boxShadow: theme.shadows.sm, borderRadius: theme.radius.sm, margin: '2px', padding: '0px 0px 15px 0px', background: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[1], height: 'min-content', width: '240px',
      })}
      >
        <Space h="xl" />
        <AddWatchlist
          userID={user.id}
          position={Watchlists.at(-1).position + 1}
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
          {Watchlists.map((it) => (
            <Accordion.Item value={it.watchlistName} key={uuidv4()}>
              <AccordionControl
                userID={user.id}
                currentListName={it.watchlistName}
                position={it.position}
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
                            <Text
                              weight={500}
                              align="right"
                              color={greenOrRed(quote.changePercent)}
                            >
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
