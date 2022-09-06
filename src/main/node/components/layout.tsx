import {
  AppShell,
  Header,
  Footer,
  Grid,
  useMantineTheme,
  Container,
  Space,
  Button
} from '@mantine/core';
import Link from 'next/link'
import Watchlist from '../redux/features/userLists/Watchlist';

import Meta from './meta'
import SearchBar from './search';

const Layout = ({ children }) => {
  const theme = useMantineTheme();

  return (
    <AppShell
      styles={{
        main: {
          background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[2],
        },
      }}
      footer={  
        <Footer height={60} p="md">
          Application footer
        </Footer>
      }
      header={
        <Header height={60} p="xs">
          <Grid align="center">
            <Grid.Col span={1}><Link href="/"><Button variant="subtle" color="dark">Kalypto</Button></Link></Grid.Col>
            <Grid.Col span={2}><SearchBar /></Grid.Col>
            <Grid.Col span={1}><Link href="/about"><Button variant="subtle" color="dark">About</Button></Link></Grid.Col>
          </Grid>
        </Header>
      }
    >
      <Meta />
        <Grid grow>
          <Container size="xl">
            <Space h="xl" />
            {children}
          </Container>
          <Watchlist />
        </Grid>
    </AppShell>
  )
}

export default Layout