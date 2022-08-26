import React from 'react';
import { useState } from 'react';
import { useDispatch  } from 'react-redux';
import { Container, ActionIcon, Group, Space, Text, Button, TextInput, Collapse } from '@mantine/core';
import { IconPlus } from '@tabler/icons';

import { addListHandler } from './Watchlist';
import { addList } from './WatchlistSlice';

export const AddWatchlist = () => {
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
    <Container size={200}>
      <Group position="apart" sx={{ width: 200 }}>
        <Text size="lg">Lists</Text>
        <Space w="md" />
        <ActionIcon color="dark" onClick={() => setOpened(true)}>
          <IconPlus size={16}/>
        </ActionIcon>
      </Group>
      <Space h="sm" />
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
  )
}