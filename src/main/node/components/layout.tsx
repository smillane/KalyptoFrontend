import {
  AppShell,
  Footer,
  useMantineTheme,
  Container,
  Space,
} from '@mantine/core';
import { createContext } from 'react';

import Meta from './meta';
import IsUserSignedIn from '../auth/authState.tsx';
import HeaderMenu from './header';
import FooterLinks from './footer.tsx';

export const AuthStateContext = createContext(null);
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
