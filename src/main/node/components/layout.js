import {
  AppShell,
  Header,
  Footer,
  Grid,
  useMantineTheme,
  Container
} from '@mantine/core';
import Link from 'next/link'

import Meta from './meta'

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
            <Grid.Col span={1}><Link href="/about">About</Link></Grid.Col>
          </Grid>
        </Header>
      }
    >
      <Meta />
      <Container>
        <main>
          {children}
        </main>
      </Container>
    </AppShell>
  )
}

export default Layout