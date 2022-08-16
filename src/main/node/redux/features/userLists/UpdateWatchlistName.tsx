import { useDispatch } from 'react-redux';
import { Menu } from '@mantine/core';
import { IconSettings } from '@tabler/icons';

import { updateListNameHandler } from './Watchlist';
import { updateListName } from './watchlistSlice';

export default function UpdateWatchlistName(props) {
  const dispatch = useDispatch();
  
  const renameList = () => {
    updateListNameHandler(props.userID, props.listname)
    .then(() => {
      dispatch(
        updateListName(
          props.listname
        )
      )
    })
  }

  return(
    <Menu.Item icon={<IconSettings size={14} />} onClick={renameList}>Rename</Menu.Item>
  )
}