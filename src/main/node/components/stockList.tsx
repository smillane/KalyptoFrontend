import React from 'react';
import { useState } from 'react';
import { Accordion, ActionIcon, AccordionControlProps, Box, List } from '@mantine/core';
import { IconDots } from '@tabler/icons';

function AccordionControl(props: AccordionControlProps) {
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
  const UserStockLists = new Array([{"name": "tech", "list": {"amd": 102, "nvda": 170}}, {"name": "oil", "list": {"bp": 40, "shell": 50}}]);

  const [listName, setListName] = useState<string>();
  
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