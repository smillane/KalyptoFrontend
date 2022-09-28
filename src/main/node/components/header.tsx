import {
  Header,
  Button,
  createStyles,
  Center,
  Burger,
  Group,
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

  logoAndSearch: {
    width: 260,

    [theme.fn.smallerThan('sm')]: {
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
            <Link
              href={link.link}
              className={classes.link}
              passHref
            >
              <Center>
                <span className={classes.linkLabel}>{link.label}</span>
                <IconChevronDown size={12} stroke={1.5} />
              </Center>
            </Link>
          </Menu.Target>
          <Menu.Dropdown>{menuItems}</Menu.Dropdown>
        </Menu>
      );
    }

    return (
      <Link
        key={link.label}
        href={link.link}
        className={classes.link}
        passHref
      >
        <Button variant="subtle" color="dark">
          {link.label}
        </Button>
      </Link>
    );
  });

  return (
    <Header height={56}>
      <div className={classes.inner}>
        <Group spacing={15} className={classes.links} position="left" noWrap sx={{ paddingLeft: '10%' }}>
          <Link href="/" passHref><Button variant="subtle" color="dark">Kalypto</Button></Link>
          <SearchBar />
        </Group>
        <Group spacing={5} className={classes.links} position="right" noWrap sx={{ paddingRight: '10%' }}>
          {items}
          <LoginLogoutButton />
        </Group>
        <Burger opened={opened} onClick={toggle} className={classes.burger} size="sm" />
      </div>
    </Header>
  );
}
