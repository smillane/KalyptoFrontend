import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	Menu,
	Container,
	ActionIcon,
	Accordion,
	Box,
	List,
	Modal,
	TextInput,
	Space,
	Group,
	Button,
	useMantineTheme,
} from '@mantine/core';
import { IconDots, IconSettings } from '@tabler/icons';
import { AddWatchlist } from './AddWatchlist';
import DeleteWatchlist from './DeleteWatchlist';
import EditWatchlistName from './EditWatchlistName';
import { updateListName } from './watchlistSlice';

export default function Watchlist(props) {
	const [opened, setOpened] = useState(false);
	const [error, setError] = useState<string>('');
	const [listName, setListName] = useState<string>('');

	type listFromDBType = Array<Record<string, Array<string>>>;

	const lists: listFromDBType = useSelector((state) => state.watchlists);

	const onNewListNameChange = (e) => setListName(e.currentTarget.value);

	const theme = useMantineTheme();

	const dispatch = useDispatch();

	const AccordionControl = (props) => {
		const oldName = props.listname;

		const onUpdateListClicked = () => {
      console.log("old name is", oldName)
      const list = lists.find(obj => Object.keys(obj)==props.listname)
      console.log("found", list)
			if (listName.length!=0) {
				updateListNameHandler(props.userID, listName, list)
					.then(() => {
						dispatch(updateListName({ oldName: oldName, newName: listName }));
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
			<>
				<Modal
					centered
					opened={opened}
					onClose={() => setOpened(false)}
					title='Edit Watchlist Name'
					overlayColor={theme.colors.gray[2]}
				>
					<TextInput
						placeholder='Name your list!'
						data-autofocus
						error={error}
						value={listName}
						onChange={onNewListNameChange}
					/>
					<Space h='xs' />
					<Group position='apart'>
						<Button variant='outline' color='dark' onClick={() => setOpened(false)}>
							Cancel
						</Button>
						<Button variant='outline' color='dark' onClick={onUpdateListClicked}>
							Update
						</Button>
					</Group>
				</Modal>

				<Box sx={{ display: 'flex', alignItems: 'center' }}>
					<Accordion.Control {...props} />
					<Menu>
						<Menu.Target>
							<ActionIcon size='lg'>
								<IconDots size={16} />
							</ActionIcon>
						</Menu.Target>
						<Menu.Dropdown>
							<Menu.Item icon={<IconSettings size={14} />} onClick={() => setOpened(true)}>
								Edit List Name
							</Menu.Item>
							<Menu.Item icon={<IconSettings size={14} />}>Edit</Menu.Item>
							<EditWatchlistName userID={'userID'} listname={props.listname} />
							<DeleteWatchlist userID={'userID'} listname={props.listname} />
						</Menu.Dropdown>
					</Menu>
				</Box>
			</>
		);
	};

	if (!Array.isArray(lists) || !lists.length) {
		return <AddWatchlist />;
	} else {
		return (
			<Container size={200}>
				<AddWatchlist />
				<Accordion multiple={true} chevronPosition='left' sx={{ width: 200 }} mx='auto'>
					{lists.map((it) =>
						Object.entries(it).map(([key, values]) => (
							<Accordion.Item value={key} key={key}>
								<AccordionControl lists={lists} listname={key}>
									{key}
								</AccordionControl>
								<Accordion.Panel>
									<List>
										{values.map((stock) => (
											<List.Item key={stock}>{stock}</List.Item>
										))}
									</List>
								</Accordion.Panel>
							</Accordion.Item>
						))
					)}
				</Accordion>
			</Container>
		);
	}
}

//need to get a uuid from creation of user acc, if not, just show empty list with "create an account to create watch lists"
//if no lists, create an empty list with something such as "create a list to start tracking stocks"
export async function getServerSideProps(userID, context) {
	// const res = await fetch(`http://localhost:8080/users/${userID}/list`);
	// const lists = await res.json();

	// const tempList: Array<Record<string, Array<string>>> = [{"tech": ["amd", "nvda", "net", "crwd"]}, {"oil": ["bp", "shel", "shell", "oxy"]}];

	// if (!lists) {
	//   return {

	//   }
	// }

	return { props: {} };
}

export async function addListHandler(userID, lists) {
	console.log(userID, lists);
	// fetch(`http://localhost:8080/users/${userID}/list`, {
	//   method: 'POST',
	//   headers: {
	//     'Content-Type': 'application/json',
	//   },
	//   body: JSON.stringify(lists),
	// });
}

export async function updateListHandler(userID, list) {
	fetch(`http://localhost:8080/users/${userID}/list/`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(list),
	});
}

export async function updateListNameHandler(userID, newName, oldList) {
	console.log(userID, newName, oldList);
	// fetch(`http://localhost:8080/users/${userID}/list/${name}`, {
	//   method: 'PUT',
	//   headers: {
	//     'Content-Type': 'application/json',
	//   }
	// });
}

export async function deleteListNameHandler(userID, name) {
	console.log(userID, name);

	// fetch(`http://localhost:8080/users/${userID}/list/${name}`, {
	//   method: 'DELETE',
	//   headers: {
	//     'Content-Type': 'application/json',
	//   }
	// });
}
