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
import Banner from './banner.tsx';
import IsUserSignedIn from '../auth/authState.tsx';

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
      styles={{
        main: {
          background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[2],
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
      <Container size={1800}>
        <Space h="xl" />
        {children}
      </Container>
    </AppShell>
  );
}

function LayoutWithAuth({ children }) {
  return (
    <AuthStateContextProvider>
      <Layout>
        { children }
      </Layout>
    </AuthStateContextProvider>
  );
}

export default LayoutWithAuth;
