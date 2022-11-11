import {
  AppShell,
  useMantineTheme,
  Container,
  Space,
} from '@mantine/core';
import { createContext } from 'react';

import Meta from './meta';
import HeaderMenu from './header.tsx';
import FooterLinks from './footer.tsx';
import IsUserSignedIn from '../auth/authState.tsx';
import Banner from './banner';

const AuthStateContext = createContext(null);
function AuthStateContextProvider({ children }) {
  return (
    <AuthStateContext.Provider value={IsUserSignedIn()}>
      {children}
    </AuthStateContext.Provider>
  );
}

function Layout({ children }) {
  const theme = useMantineTheme();

  return (
    <AppShell
      padding={0}
      styles={{
        main: {
          background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0], minHeight: 'auto',
        },
      }}
      footer={(
        <FooterLinks />
      )}
      header={(
        <HeaderMenu />
      )}
    >
      <Meta />
      <Banner />
      <Container size={1800} sx={{ minHeight: '50vh' }}>
        <Space h="xl" />
        {children}
      </Container>
    </AppShell>
  );
}

function LayoutWithAuth({ children }) {
  return (
    <Layout>
      { children }
    </Layout>
  );
}

export default LayoutWithAuth;
