import {
  AppShell,
  Header,
  Footer,
  Grid,
  useMantineTheme,
  Container,
  Group
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
          background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
        },
      }}
      footer={  
        <Footer height={60} p="md">
          Application footer
        </Footer>
      }
      header={
        <Header height={60} p="md">
          <Grid align="center">
            <Grid.Col span={1}><Link href="/">Kalypto</Link></Grid.Col>
            <Grid.Col span={1}><Link href="/stocks/amd">amd</Link></Grid.Col>
            <SearchBar />
            <Grid.Col span={1}><Link href="/about">About</Link></Grid.Col>
          </Grid>
        </Header>
      }
    >
      <Meta />
        <Grid grow gutter="xl">
          <Container size="xl">
            {children}
          </Container>
          <Watchlist />
        </Grid>
    </AppShell>
  )
}

export default Layout