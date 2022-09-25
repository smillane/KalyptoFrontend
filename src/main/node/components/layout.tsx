import {
  AppShell,
  Header,
  Footer,
  Grid,
  useMantineTheme,
  Container,
  Space,
  Button,
} from '@mantine/core';
import Link from 'next/link';

import Meta from './meta';
import SearchBar from './search.tsx';
import AuthStateButton from '../auth/authStateButton.tsx';

function Layout({ children }) {
  const theme = useMantineTheme();

  return (
    <AppShell
      styles={{
        main: {
          background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[2],
        },
      }}
      footer={(
        <Footer height={60} p="md">
          Application footer
        </Footer>
      )}
      header={(
        <Header height={60} p="xs">
          <Grid align="center">
            <Grid.Col span={1}><Link href="/" passHref><Button variant="subtle" color="dark">Kalypto</Button></Link></Grid.Col>
            <Grid.Col span={2}><SearchBar /></Grid.Col>
            {/* <Grid.Col span={1}><Link href="/about" passHref>
            <Button variant="subtle" color="dark">About</Button></Link></Grid.Col> */}
            <Grid.Col span={1}><Link href="/auth" passHref><Button variant="subtle" color="dark">auth</Button></Link></Grid.Col>
            <AuthStateButton />
          </Grid>
        </Header>
      )}
    >
      <Meta />
      <Container size={1800}>
        <Space h="xl" />
        {children}
      </Container>
    </AppShell>
  );
}

export default Layout;
