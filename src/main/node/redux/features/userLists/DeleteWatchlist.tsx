import { useDispatch } from 'react-redux';
import { Menu } from '@mantine/core';
import { IconSettings } from '@tabler/icons';

import { deleteListNameHandler } from './Watchlist';
import { removeList } from './watchlistSlice';

export default function DeleteWatchlist(props) {
  const dispatch = useDispatch();
  
  const deleteList = () => {
    deleteListNameHandler(props.userID, props.listname)
    .then(() => {
      dispatch(
        removeList(
          props.listname
        )
      )
    })
  }

  return(
    <Menu.Item icon={<IconSettings size={14} />} onClick={deleteList}>Delete</Menu.Item>
  )
}