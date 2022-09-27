import React, { useContext, useState } from 'react';
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
} from '@mantine/core';
import { IconDots, IconSettings } from '@tabler/icons';
import Link from 'next/link';

import AddWatchlist from './AddWatchlist.tsx';
import DeleteWatchlist from './DeleteWatchlist.tsx';
import { updateListName } from './WatchlistSlice.tsx';
import DisabledWatchList from '../../../components/disabledAddWatchlist.tsx';
import { AuthStateContext } from '../../../components/layout.tsx';

function AccordionControl(props) {
  const [opened, setOpened] = useState(false);
  const [error, setError] = useState<string>('');
  const [listName, setListName] = useState<string>('');

  const onNewListNameChange = (e) => setListName(e.currentTarget.value);

  const theme = useMantineTheme();

  const dispatch = useDispatch();

  const onUpdateListClicked = () => {
    console.log('old name is', props.listname);
    const list = props.lists.find((obj) => Object.keys(obj) == props.listname);
    console.log('found', list);
    if (listName.length !== 0) {
      // eslint-disable-next-line no-use-before-define
      updateListNameHandler(props.userID, listName, props.lists)
        .then(() => {
          dispatch(
            updateListName({ oldName: props.listname, newName: listName }),
          );
          setListName('');
          setOpened(false);
        })
        .catch((err) => {
          console.log(err);
          setOpened(true);
          setError('There was an error, please try again');
        });
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
          onChange={onNewListNameChange}
        />
        <Space h="xs" />
        <Group position="apart">
          <Button variant="outline" color="dark" onClick={() => setOpened(false)}>
            Cancel
          </Button>
          <Button variant="outline" color="dark" onClick={onUpdateListClicked}>
            Update
          </Button>
        </Group>
      </Modal>

      <Box sx={{ display: 'flex', alignItems: 'center' }}>
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
  type listFromDBType = Array<Record<string, Array<string>>>;
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
      <Accordion multiple sx={{ width: 200 }} mx="auto">
        {lists.map((it) => Object.entries(it).map(([key, values]) => (
          <Accordion.Item value={key} key={key}>
            <AccordionControl lists={lists} listname={key}>
              <Text weight={700}>
                {key}
              </Text>
            </AccordionControl>
            <Accordion.Panel>
              <Table highlightOnHover>
                <tbody>
                  {values.map((stock) => (
                    <Link href={`/stocks/${stock}`} key={stock} passHref><tr><td><Text transform="capitalize">{stock}</Text></td></tr></Link>
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
