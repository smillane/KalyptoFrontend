import React from 'react';
import { useState } from 'react';
import { Menu, Container, ActionIcon, Group, Space, Accordion, Text, AccordionControlProps, Box, List, Button, TextInput, Collapse } from '@mantine/core';
import { IconDots, IconPlus, IconSettings } from '@tabler/icons';

function AccordionControl(props) {

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Accordion.Control {...props} />
      <Menu>
      <Menu.Target>
        <ActionIcon size="lg">
          <IconDots size={16} />
        </ActionIcon>
      </Menu.Target>
        <Menu.Dropdown>
          <Menu.Item icon={<IconSettings size={14} />} onClick={() => updateListNameHandler("userId", name)}>Rename</Menu.Item>
          <Menu.Item icon={<IconSettings size={14} />}>Edit</Menu.Item>
          <Menu.Item icon={<IconSettings size={14} />} onClick={
            (i) => deleteListNameHandler("userId", i)
            .then(() => {
              const newList = props.listfromdb.filter(i => !i.hasOwnProperty(props.listname))
              console.log(newList)
              console.log(props.listname)
              props.setupdatedlist(newList)})}>Delete</Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </Box>
  );
}

export default function StockList(props) {
  type listFromDBType = Array<Record<string, Array<string>>>
  const UserStockLists: Array<Record<string, Array<string>>> = [{"tech": ["amd", "nvda", "net", "crwd"]}, {"oil": ["bp", "shel", "shell", "oxy"]}];

  const [listFromDB, setUpdatedList] = useState<listFromDBType>(props.tempList);
  const [opened, setOpened] = useState(false);
  const [error, setError] = useState<string>('')
  const [value, setValue] = useState<string>('');
  
  if (!Array.isArray(listFromDB) || !listFromDB.length) {
    return (
      <Container size={200}>
        <Group position="apart" sx={{ width: 200 }}>
          <Text size="lg">Lists</Text>
          <Space w="md" />
          <ActionIcon color="dark" onClick={() => setOpened(true)}>
            <IconPlus size={16}/>
          </ActionIcon>
        </Group>
        <Space h="sm" />
        <Collapse in={opened} sx={{ width: 200 }}>
          <TextInput placeholder="Name your list!" error={error} value={value} 
          onChange={(event) => setValue(event.currentTarget.value)} />
          <Space h="xs" />
          <Group position="apart">
            <Button variant="outline" color="dark" onClick={() => setOpened(false)}>Cancel</Button>
            <Button variant="outline" color="dark" 
                    onClick={() => addListHandler("userId", value)
                    .then(() => {
                      const newList = {};
                      newList[value] = [];
                      setUpdatedList(listFromDB.concat([newList]));
                      setValue('');
                      setOpened(false);})
                    .catch((err) => {
                      console.log(err);
                      setOpened(true);
                      setError("There was an error, please try again");})}>Add</Button>
          </Group>
        </Collapse>
      </Container>
  );
  }
  else {
    return (
      <Container size={200}>
        <Group position="apart" sx={{ width: 200 }}>
          <Text size="lg">Lists</Text>
          <Space w="md" />
          <ActionIcon color="dark" onClick={() => setOpened(true)}>
            <IconPlus size={16}/>
          </ActionIcon>
        </Group>
        <Space h="sm" />
        <Collapse in={opened} sx={{ width: 200 }}>
          <TextInput placeholder="Name your list!" error={error} value={value} 
          onChange={(event) => setValue(event.currentTarget.value)} />
          <Space h="xs" />
          <Group position="apart">
            <Button variant="outline" color="dark" onClick={() => setOpened(false)}>Cancel</Button>
            <Button variant="outline" color="dark" 
                    onClick={() => addListHandler("userId", value)
                    .then(() => {
                      const newList = {};
                      newList[value] = [];
                      setUpdatedList(listFromDB.concat([newList]));
                      setValue('');
                      setOpened(false);})
                    .catch((err) => {
                      console.log(err);
                      setOpened(true);
                      setError("There was an error, please try again");})}>Add</Button>
          </Group>
        </Collapse>
      <Accordion multiple={true} chevronPosition="left" sx={{ width: 200 }} mx="auto">
        {listFromDB.map((it) => Object.entries(it).map(([key, values]) => 
        <Accordion.Item value={key} key={key}>
        <AccordionControl listfromdb={listFromDB} listname={key} setupdatedlist={setUpdatedList}>{key}</AccordionControl>
        <Accordion.Panel>
          <List>
            {values.map((stock) => 
            <List.Item key={stock}>{stock}</List.Item>
            )}
          </List>
        </Accordion.Panel>
        </Accordion.Item>
        ))}
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

  return { props: { } }
}

export async function addListHandler(userID, lists) {
  console.log(userID, lists)
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

export async function updateListNameHandler(userID, name) {

  fetch(`http://localhost:8080/users/${userID}/list/${name}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    }
  });
}

export async function deleteListNameHandler(userID, name) {
  console.log(userID, name)

  // fetch(`http://localhost:8080/users/${userID}/list/${name}`, {
  //   method: 'DELETE',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   }
  // });
}