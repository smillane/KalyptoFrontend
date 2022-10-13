import React, { createContext, useContext, useState } from 'react';
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
} from '@mantine/core';
import { IconDots, IconSettings } from '@tabler/icons';
import Link from 'next/link';

// eslint-disable-next-line import/no-cycle
import AddWatchlist from './AddWatchlist.tsx';
// eslint-disable-next-line import/no-cycle
import DeleteWatchlist from './DeleteWatchlist.tsx';
import { updateListName } from './WatchlistSlice.tsx';
import DisabledWatchList from '../../../components/disabledAddWatchlist.tsx';
import { greenOrRed } from '../../../util/formating';

const AuthStateContext = createContext(null);

function AccordionControl(props) {
  const [opened, setOpened] = useState(false);
  const [error, setError] = useState<string>('');
  const [listName, setListName] = useState<string>('');

  const onNewListNameInput = (e) => setListName(e.currentTarget.value);

  const theme = useMantineTheme();

  const dispatch = useDispatch();

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

export default function Watchlist() {
  const authState: boolean = useContext(AuthStateContext);
  type listFromDBType = Array<Record<string, Record<string, any>>>;
  const lists: listFromDBType = useSelector((state) => state.watchlists);
  if (authState === false) {
    return (
      <DisabledWatchList
        space={<Space h="xl" />}
        theme={(theme) => ({
          boxShadow: theme.shadows.sm, borderRadius: theme.radius.sm, margin: '2px', padding: '20px 20px 40px 20px', background: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[1], height: 'min-content',
        })}
      />
    );
  }
  if (!Array.isArray(lists) || !lists.length) {
    return (
      <AddWatchlist
        space={<Space h="xl" />}
        theme={(theme) => ({
          boxShadow: theme.shadows.sm, borderRadius: theme.radius.sm, margin: '2px', padding: '20px 20px 40px 20px', background: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[1], height: 'min-content',
        })}
      />
    );
  }
  return (
    <Container sx={(theme) => ({
      boxShadow: theme.shadows.sm, borderRadius: theme.radius.sm, margin: '2px', padding: '20px 20px 40px 20px', background: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[1], height: 'min-content',
    })}
    >
      <Space h="xl" />
      <AddWatchlist />
      <Accordion
        variant="filled"
        multiple
        sx={{ width: 200 }}
        mx="auto"
      >
        {lists.map((it) => Object.entries(it).map(([key, values]) => (
          <Accordion.Item value={key} key={key}>
            <AccordionControl
              lists={lists}
              listname={key}
              sx={(theme) => ({
                background: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[1],
              })}
            >
              <Text weight={700}>
                {key}
              </Text>
            </AccordionControl>
            <Accordion.Panel
              sx={(theme) => ({
                background: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[1],
              })}
            >
              <Table highlightOnHover>
                <tbody>
                  {Object.entries(values).map(([stock, quote]) => (
                    <Link href={`/stocks/${stock}`} key={stock} passHref>
                      <Box
                        sx={(theme) => ({
                          height: '70px',
                          width: '180px',
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
                        <Text align="left" transform="uppercase" weight={500}>
                          {stock}
                        </Text>
                        <Stack sx={{ gap: 0 }}>
                          <Text weight={500} align="right">
                            $
                            {quote.latestPrice}
                          </Text>
                          <Text weight={500} align="right" color={greenOrRed(quote.change)}>
                            {(quote.changePercent * 100).toFixed(2)}
                          </Text>
                        </Stack>
                      </Box>
                    </Link>
                  ))}
                </tbody>
              </Table>
            </Accordion.Panel>
          </Accordion.Item>
        )))}
      </Accordion>
    </Container>
  );
}

// need to get a uuid from creation of user acc, if not, just show empty list with "create an account to create watch lists"
// if no lists, create an empty list with something such as "create a list to start tracking stocks"
export async function getServerSideProps(userID, context) {
  // const res = await fetch(`http://localhost:8080/users/${userID}/list`);
  // const lists = await res.json();

  // const tempList: Array<Record<string, Array<string>>> = [{"tech": ["amd", "nvda", "net", "crwd"]}, {"oil": ["bp", "shel", "shell", "oxy"]}];

  // if (!lists) {
  //   return {

  //   }
  // }

  return { props: {} };
}

export async function addListHandler(userID, lists) {
  console.log(userID, lists);
  // fetch(`http://localhost:8080/users/${userID}/list`, {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify(lists),
  // });
}

export async function updateListHandler(userID, list) {
  fetch(`http://localhost:8080/users/${userID}/list/`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(list),
  });
}

export async function updateListNameHandler(userID, newName, oldList) {
  console.log(userID, newName, oldList);
  // fetch(`http://localhost:8080/users/${userID}/list/${name}`, {
  //   method: 'PUT',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   }
  // });
}

export async function deleteListNameHandler(userID, name) {
  console.log(userID, name);

  // fetch(`http://localhost:8080/users/${userID}/list/${name}`, {
  //   method: 'DELETE',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   }
  // });
}
