import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Modal, Group, Menu, Space, TextInput } from '@mantine/core';
import { IconSettings } from '@tabler/icons';

import { updateListNameHandler } from './Watchlist';
import { updateListName } from './WatchlistSlice';

export default function EditWatchlistName(props) {
  const [opened, setOpened] = useState(false);
  const [error, setError] = useState<string>('')
  const [listName, setListName] = useState<string>('');

  const onNewListNameChange = e => setListName(e.currentTarget.value);
  
  const dispatch = useDispatch();

  const onUpdateListClicked = () => {
    if (listName) {
      updateListNameHandler(props.userID, listName, listName)
      .then(() => {
        dispatch(
          updateListName(
            listName
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

  return(
    <>
      <Modal
        centered 
        opened={opened}
        onClose={() => setOpened(false)}
        title="Edit Watchlist Name">
        <TextInput placeholder="Name your list!" error={error} value={listName} onChange={onNewListNameChange} data-autofocus />
        <Space h="xs" />
        <Group position="apart">
          <Button variant="outline" color="dark" onClick={() => setOpened(false)}>Cancel</Button>
          <Button variant="outline" color="dark" onClick={onUpdateListClicked}>Update</Button>
        </Group>
      </Modal>

      <Menu.Item icon={<IconSettings size={14}/>} onClick={() => setOpened(true)}>
        edit listname component
      </Menu.Item>
    </>
  )
}