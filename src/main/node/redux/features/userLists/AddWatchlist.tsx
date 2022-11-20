import React, { useState } from 'react';

import { useDispatch } from 'react-redux';
import {
  Container, ActionIcon, Group, Space, Button, TextInput, Collapse, Title, Divider,
} from '@mantine/core';
import { IconPlus } from '@tabler/icons';

import { addWatchlistQuery } from './WatchlistSlice.tsx';

export default function AddWatchlist(props) {
  const [opened, setOpened] = useState(false);
  const [error, setError] = useState<string>('');
  const [listName, setListName] = useState<string>('');
  const [addRequestStatus, setAddRequestStatus] = useState('idle');

  const dispatch = useDispatch();

  const onNewListNameChange = (e) => setListName(e.currentTarget.value);

  const onSaveListClicked = async () => {
    if (addRequestStatus === 'idle') {
      try {
        setAddRequestStatus('pending');
        await dispatch(
          addWatchlistQuery({
            userID: props.user.id, listName, position: props.position,
          }),
        ).unwrap();
        setListName('');
        setOpened(false);
      } catch (err) {
        console.error(err);
        setOpened(true);
        setError('There was an error, please try again');
      } finally {
        setAddRequestStatus('idle');
      }
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
          <Button variant="outline" color="dark" onClick={() => { setOpened(false); setListName(''); }}>Cancel</Button>
          <Button variant="outline" color="dark" onClick={onSaveListClicked}>Add</Button>
        </Button.Group>
      </Collapse>
    </Container>
  );
}
