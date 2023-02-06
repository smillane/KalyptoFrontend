import React, { useState } from 'react';
import {
  Container, ActionIcon, Group, Space, Button, TextInput, Collapse, Title,
} from '@mantine/core';
import { IconPlus } from '@tabler/icons';

import { useAddWatchlistMutation } from './WatchlistSlice.tsx';

export default function AddWatchlist({ userID, position, theme }) {
  const [opened, setOpened] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [listname, setListname] = useState<string>('');
  const [addWatchlist, { isLoading }] = useAddWatchlistMutation();

  const onNewListName = (e) => setListname(e.currentTarget.value);

  const onSaveListClicked = async () => {
    if (listname.length !== 0 && !isLoading) {
      try {
        await addWatchlist(
          {
            userID,
            listname,
            position,
          },
        ).unwrap();
        setListname('');
        setOpened(false);
      } catch (err) {
        console.error('failed to add watchlist', err);
        setError('Please input a name');
      }
    }
  };

  return (
    <Container sx={theme}>
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
          value={listname}
          onChange={onNewListName}
        />
        <Space h="xs" />
        <Button.Group sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button variant="outline" color="dark" onClick={() => { setOpened(false); setListname(''); }}>Cancel</Button>
          <Button variant="outline" color="dark" onClick={onSaveListClicked}>Add</Button>
        </Button.Group>
      </Collapse>
    </Container>
  );
}
