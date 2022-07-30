import React from 'react';
import { useState } from 'react';
import { Accordion, ActionIcon, AccordionControlProps, Box, List, Button, Input, Dialog, TextInput, Text, Group } from '@mantine/core';
import { IconDots } from '@tabler/icons';

function SetListName(name) {

}

function AccordionControl(props: AccordionControlProps) {
  const [listName, setListName] = useState();

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Accordion.Control {...props} />
      <ActionIcon size="lg">
        <IconDots size={16} />
      </ActionIcon>
    </Box>
  );
}

export default function StockList(props) {
  const emptyList = new Array()
  const UserStockLists = new Array([{"name": "tech", "list": {"amd": 102, "nvda": 170}}, {"name": "oil", "list": {"bp": 40, "shell": 50}}]);

  const [opened, setOpened] = useState(false);
  
  if (emptyList === undefined || emptyList.length === 0) {
    return (
      <Accordion chevronPosition="left" sx={{ maxWidth: 800 }} mx="auto" style={{ flex: 1, alignItems: "stretch" }}>
      <Accordion.Item value="list">
      <AccordionControl>Add</AccordionControl>
      <Accordion.Panel>
        <TextInput placeholder="Name your list!" style = {{ flex: 1 }} rightSection={<Button variant="outline" color="dark">Add</Button>} rightSectionWidth={61} required={true}/>
        {/* <Button onClick={() => addListHandler()}>Add</Button> */}
        <Button variant="outline" color="dark" style = {{ flex: 1 }}>Add</Button>
      </Accordion.Panel>
      </Accordion.Item>
      </Accordion>
  );
  }
  else {
    return (
      <Accordion chevronPosition="left" sx={{ maxWidth: 400 }} mx="auto">
        {UserStockLists.map((it) => it.map((temp) => 
        <Accordion.Item value={temp.name} key={temp.name}>
        <AccordionControl>{temp.name}</AccordionControl>
        <Accordion.Panel>
          <List>
            {Object.entries(temp.list).map(([key, value]) => 
            <List.Item key={key}>{key}: {value}</List.Item>
            )}
          </List>
        </Accordion.Panel>
        </Accordion.Item>
        ))}
      </Accordion>
    );
  }
}

//need to get a uuid from creation of user acc, if not, just show empty list with "create an account to create watch lists"
//if no lists, create an empty list with something such as "create a list to start tracking stocks"
export async function getServerSideProps(userID, context) {

  const res = await fetch(`http://localhost:8080/users/${userID}/list`);
  const lists = await res.json();

  const templists = new Array([{"name": "tech", "list": {"amd": 102, "nvda": 170}}, {"name": "oil", "list": {"bp": 40, "shell": 50}}]);

  if (!lists) {
    return {
      
    }
  }

  return { props: { templists } }
}

export async function addListHandler(userID, lists) {

  fetch(`http://localhost:8080/users/${userID}/list`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(lists),
  });
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