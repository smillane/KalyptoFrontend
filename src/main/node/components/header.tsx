import {
  Header,
  Button,
  createStyles,
  Center,
  Burger,
  Group,
  Container,
  Menu,
} from '@mantine/core';
import Link from 'next/link';
import { IconChevronDown } from '@tabler/icons';

import { useDisclosure } from '@mantine/hooks';
import SearchBar from './search.tsx';
import LoginLogoutButton from './loginLogoutButton.tsx';

const useStyles = createStyles((theme) => ({
  inner: {
    height: 56,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  links: {
    [theme.fn.smallerThan('sm')]: {
      display: 'none',
    },
  },

  burger: {
    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
  },

  link: {
    display: 'block',
    lineHeight: 1,
    padding: '8px 12px',
    borderRadius: theme.radius.sm,
    textDecoration: 'none',
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    },
  },

  linkLabel: {
    marginRight: 5,
  },
}));

interface HeaderSearchProps {
  links: { link: string; label: string; links: { link: string; label: string }[] | any}[];
}

const headerLinks: HeaderSearchProps = {
  links:
    [
      {
        link: '/about',
        label: 'About',
        links: null,
      }, {
        link: '/auth',
        label: 'Auth',
        links: null,
      }, {
        link: '/profile',
        label: 'Profile',
        links: null,
      },
    ],
};

export default function HeaderMenu() {
  const [opened, { toggle }] = useDisclosure(false);
  const { classes } = useStyles();

  const items = headerLinks.links.map((link) => {
    const menuItems = link.links?.map((item) => (
      <Menu.Item key={item.link}>{item.label}</Menu.Item>
    ));

    if (menuItems) {
      return (
        <Menu key={link.label} trigger="hover" exitTransitionDuration={0}>
          <Menu.Target>
            <a
              href={link.link}
              className={classes.link}
              onClick={(event) => event.preventDefault()}
            >
              <Center>
                <span className={classes.linkLabel}>{link.label}</span>
                <IconChevronDown size={12} stroke={1.5} />
              </Center>
            </a>
          </Menu.Target>
          <Menu.Dropdown>{menuItems}</Menu.Dropdown>
        </Menu>
      );
    }

    return (
      <a
        key={link.label}
        href={link.link}
        className={classes.link}
        onClick={(event) => event.preventDefault()}
      >
        {link.label}
      </a>
    );
  });

  return (
    <Header height={56} mb={120}>
      <Container>
        <Link href="/" passHref><Button variant="subtle" color="dark">Kalypto</Button></Link>
        <SearchBar />
        <div className={classes.inner}>
          <Group spacing={5} className={classes.links}>
            {items}
          </Group>
          <Burger opened={opened} onClick={toggle} className={classes.burger} size="sm" />
        </div>
        <LoginLogoutButton />
      </Container>
    </Header>
  );
}
