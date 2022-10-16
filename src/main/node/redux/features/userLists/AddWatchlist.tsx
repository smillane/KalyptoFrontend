import React, { useState } from 'react';

import { useDispatch } from 'react-redux';
import {
  Container, ActionIcon, Group, Space, Button, TextInput, Collapse, Title, Divider,
} from '@mantine/core';
import { IconPlus } from '@tabler/icons';

// eslint-disable-next-line import/no-cycle
import { addListHandler } from './Watchlist';
import { addList } from './WatchlistSlice';

export default function AddWatchlist(props) {
  const [opened, setOpened] = useState(false);
  const [error, setError] = useState<string>('');
  const [listName, setListName] = useState<string>('');

  const dispatch = useDispatch();

  const onNewListNameChange = (e) => setListName(e.currentTarget.value);

  const onSaveListClicked = () => {
    if (listName) {
      const newWatchlist = {};
      newWatchlist[listName] = [];
      addListHandler('userId', listName)
        .then(() => {
          dispatch(
            addList(
              newWatchlist,
            ),
          );

          setListName('');
          setOpened(false);
        })
        .catch((err) => {
          console.log(err);
          setOpened(true);
          setError('There was an error, please try again');
        });
    }
  };

  return (
    <Container sx={props.theme}>
      {props.space}
      <Group position="apart">
        <Title order={4} align="center" transform="capitalize">Lists</Title>
        <ActionIcon color="dark" onClick={() => setOpened(true)}>
          <IconPlus size={16} />
        </ActionIcon>
      </Group>
      <Collapse in={opened} sx={{ width: 200, marginBottom: '5px' }}>
        <TextInput
          placeholder="Name your list!"
          error={error}
          value={listName}
          onChange={onNewListNameChange}
        />
        <Space h="xs" />
        <Button.Group sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button variant="outline" color="dark" onClick={() => setOpened(false)}>Cancel</Button>
          <Button variant="outline" color="dark" onClick={onSaveListClicked}>Add</Button>
        </Button.Group>
      </Collapse>
    </Container>
  );
}
