import React from 'react';
import { useState } from 'react';
import { useDispatch  } from 'react-redux';
import { Container, ActionIcon, Group, Space, Button, TextInput, Collapse, Title } from '@mantine/core';
import { IconPlus } from '@tabler/icons';

import { addListHandler } from './Watchlist';
import { addList } from './WatchlistSlice'

export default function AddWatchlist(props) {
  const [opened, setOpened] = useState(false);
  const [error, setError] = useState<string>('')
  const [listName, setListName] = useState<string>('');

  const dispatch = useDispatch();
  
  const onNewListNameChange = e => setListName(e.currentTarget.value);

  const onSaveListClicked = () => {
    if (listName) {
      const newWatchlist = {}
      newWatchlist[listName] = []
      addListHandler("userId", listName)
      .then(() => {
        dispatch(
          addList(
            newWatchlist
          )
        )

        setListName('');
        setOpened(false);
      })
      .catch((err) => {
        console.log(err);
        setOpened(true);
        setError("There was an error, please try again");
      })
    }
  }

  return (
    <Container sx={props.theme}>
      {props.space}
      <Group position="apart" sx={{ width: 180 }}>
        <Title order={3} align="center" transform="capitalize">Lists</Title>
        <Space w="md" />
        <ActionIcon color="dark" onClick={() => setOpened(true)}>
          <IconPlus size={16}/>
        </ActionIcon>
      </Group>
      <Collapse in={opened} sx={{ width: 200 }}>
        <TextInput placeholder="Name your list!" error={error} value={listName} 
        onChange={onNewListNameChange} />
        <Space h="xs" />
        <Group position="apart">
          <Button variant="outline" color="dark" onClick={() => setOpened(false)}>Cancel</Button>
          <Button variant="outline" color="dark" onClick={onSaveListClicked}>Add</Button>
        </Group>
      </Collapse>
    </Container>
  );
}