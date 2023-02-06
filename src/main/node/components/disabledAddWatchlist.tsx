import React from 'react';
import {
  Container, Group, Space, Button, TextInput, Collapse, Title, Text,
} from '@mantine/core';
import Link from 'next/link';

export default function DisabledWatchList({ theme }) {
  return (
    <Container sx={theme}>
      <Group position="apart" sx={{ width: 180 }}>
        <Title order={3} align="center" transform="capitalize">Lists</Title>
        <Space w="md" />
      </Group>
      <Collapse in sx={{ width: 200 }}>
        <TextInput
          placeholder="Name your list!"
        />
        <Space h="xs" />
        <Group position="apart">
          <Button variant="outline" color="dark">Cancel</Button>
          <Link href="/login" passHref>
            <Button variant="outline" color="dark">Add</Button>
          </Link>
        </Group>
      </Collapse>
      <Space h="lg" />
      <Text align="center">Create an account</Text>
      <Text align="center">to start a list!</Text>
    </Container>
  );
}
