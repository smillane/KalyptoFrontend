import Meta from './meta'

import {
  AppShell,
  Header,
  Footer,
  Text,
  useMantineTheme,
} from '@mantine/core';

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
        <Header height={70} p="md">
          <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
            <Text>Application header</Text>
          </div>
        </Header>
      }
    >
      <Meta />
      <main>
        {children}
      </main>
    </AppShell>
  )
}

export default Layout