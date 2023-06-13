import {
  Center, ActionIcon, Modal, Text, Button, Checkbox,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconPlus } from '@tabler/icons';
import {
  AuthAction, AuthUserContext, useAuthUser, withAuthUser,
} from 'next-firebase-auth';
import { useState } from 'react';

import { useAddStockToWatchlistMutation, useGetUserWatchlistsQuery } from '../redux/features/userLists/WatchlistSlice';

function isStockInWatchlist(stock: string, watchlist): boolean {
  console.log(watchlist, 'check if in list');
  return watchlist.includes(stock);
}

function CheckboxPerList(stock, it) {
  const [checked, setChecked] = useState(isStockInWatchlist(stock, it.watchlist));
  return (
    <Checkbox
      key={it.position}
      color="dark"
      checked={checked}
      onChange={(event) => setChecked(event.currentTarget.checked)}
      label={it.watchlistName}
    />
  );
}

// default to default/dark if not in a list, if in a list fill it and be green?
// need to get watchlist state without a seperate query
function AddItemToListButton(stock: string) {
  const user = useAuthUser();
  const {
    data: Watchlists,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetUserWatchlistsQuery(user.id);
  const [opened, { open, close }] = useDisclosure(false);
  const [addStockToWatchlist, { isAddItemLoading }] = useAddStockToWatchlistMutation();

  const onSaveItemToListClicked = async (watchlist) => {
    if (!isAddItemLoading) {
      try {
        await addStockToWatchlist(
          {
            user: user.id,
            listname: watchlist.listname,
            position: watchlist.position,
            stock,
          },
        ).unwrap();
        close();
      } catch (err) {
        console.error('failed to add stock to watchlist', err);
      }
    }
  };

  if (isSuccess) {
    console.log(Watchlists, 'have been loaded');
    return (
      <>
        <Modal opened={opened} onClose={close} title="Add to Watchlist" centered>
          {
          Watchlists.map((it) => (
            <div key={it.position}>
              <CheckboxPerList stock={stock} watchlist={it} />
            </div>
          ))
}
          <Button color="dark">Save</Button>
        </Modal>
        <Center><ActionIcon variant="default" color="dark" onClick={open}><IconPlus size={20} /></ActionIcon></Center>
      </>
    );
  }
}

export default withAuthUser({
  whenAuthed: AuthAction.RENDER,
  whenAuthedBeforeRedirect: AuthAction.SHOW_LOADER,
  whenUnauthedBeforeInit: AuthAction.SHOW_LOADER,
  whenUnauthedAfterInit: AuthAction.RENDER,
})(AddItemToListButton);
