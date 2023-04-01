import { Center, ActionIcon, Modal } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconPlus } from '@tabler/icons';
import { useAddStockToWatchlistMutation } from '../redux/features/userLists/WatchlistSlice';

// default to default/dark if not in a list, if in a list fill it and be green?
// need to get watchlist state without a seperate query
export default function AddItemToListButton() {
  const [opened, { open, close }] = useDisclosure(false);
  const [addStockToWatchlist, { isLoading }] = useAddStockToWatchlistMutation();

  const onSaveItemToListClicked = async () => {
    if (listname.length !== 0 && !isLoading) {
      try {
        await addStockToWatchlist(
          {
            userID,
            listname,
            position,
            stock,
          },
        ).unwrap();
        setListname('');
        setOpened(false);
      } catch (err) {
        console.error('failed to add stock to watchlist', err);
        setError('There was an error, please try again');
      }
    }
  };

  return (
    <>
      <Modal opened={opened} onClose={close} title="Add to Watch List" centered>
        {/* Modal content */}
      </Modal>
      <Center><ActionIcon variant="default" color="dark" onClick={open}><IconPlus size={20} /></ActionIcon></Center>
    </>
  );
}
