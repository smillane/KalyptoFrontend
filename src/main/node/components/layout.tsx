import {
  AppShell,
  useMantineTheme,
  Container,
  Space,
} from '@mantine/core';

import Meta from './meta';
import HeaderMenu from './header.tsx';
import FooterLinks from './footer.tsx';
import Banner from './banner';

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

export default Layout;
