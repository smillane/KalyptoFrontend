import { Menu } from '@mantine/core';
import { IconSettings } from '@tabler/icons';

// eslint-disable-next-line import/no-cycle
import { useDeleteWatchlistMutation } from './WatchlistSlice.tsx';

export default function DeleteWatchlist(props) {
  const [deleteWatchlist] = useDeleteWatchlistMutation();
  const deleteList = async () => {
    try {
      await deleteWatchlist(
        {
          userID: props.userID,
          listname: props.listname,
          position: props.position,
        },
      ).unwrap();
    } catch (err) {
      console.error('failed to delete watchlist', err);
    }
  };

  return (
    <Menu.Item icon={<IconSettings size={14} />} onClick={deleteList}>Delete</Menu.Item>
  );
}
