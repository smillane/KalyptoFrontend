import {
  createStyles, Text, Container, ActionIcon, Group, Footer, Stack,
} from '@mantine/core';
import { IconBrandTwitter, IconBrandYoutube, IconBrandInstagram } from '@tabler/icons';
import Link from 'next/link';

const useStyles = createStyles((theme) => ({
  footer: {
    position: 'relative',
    paddingTop: theme.spacing.xl * 2,
    paddingBottom: theme.spacing.xl * 2,
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    borderTop: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
  },

  logo: {
    minWidth: 400,

    [theme.fn.smallerThan('sm')]: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
  },

  description: {
    marginTop: 5,
    maxWidth: 200,

    [theme.fn.smallerThan('sm')]: {
      marginTop: theme.spacing.xs,
      textAlign: 'center',
    },
  },

  inner: {
    display: 'flex',
    justifyContent: 'space-between',

    [theme.fn.smallerThan('sm')]: {
      flexDirection: 'column',
      alignItems: 'center',
    },
  },

  groups: {
    display: 'flex',
    flexWrap: 'wrap',

    [theme.fn.smallerThan('sm')]: {
      display: 'none',
    },
  },

  wrapper: {
    width: 160,
  },

  link: {
    display: 'block',
    color: theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.gray[6],
    fontSize: theme.fontSizes.sm,
    paddingTop: 3,
    paddingBottom: 3,

    '&:hover': {
      textDecoration: 'underline',
    },
  },

  title: {
    fontSize: theme.fontSizes.lg,
    fontWeight: 700,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    marginBottom: theme.spacing.xs / 2,
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
  },

  afterFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: theme.spacing.sm,
    paddingTop: theme.spacing.sm,
    borderTop: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]
    }`,

    [theme.fn.smallerThan('sm')]: {
      flexDirection: 'column',
    },
  },

  social: {
    [theme.fn.smallerThan('sm')]: {
      marginTop: theme.spacing.xs,
    },
  },
}));

interface FooterLinksProps {
  data: {
    title: string;
    links: { label: string; link: string }[];
  }[];
}

const footerLinks: FooterLinksProps = {
  data: [{
    title: 'About',
    links: [
      { label: 'About', link: '/about' },
      { label: 'Blog', link: '/blog' },
      { label: 'Terms of Use', link: '/terms' },
      { label: 'Privacy', link: '/privacy' },
      { label: 'DPA', link: '/dpa' },
    ],
  }, {
    title: 'News',
    links: [
      { label: 'Market News', link: '/news' },
      { label: 'Congressional Filings', link: '/congress' },
      { label: 'SEC Filings', link: '/sec' },
    ],
  }, {
    title: 'Support',
    links: [
      { label: 'FAQ', link: '/faq' },
      { label: 'Support', link: '/support' },
      { label: 'Disclaimer', link: '/disclaimer' },
    ],
  },
  ],
};

export default function FooterLinks() {
  const { classes } = useStyles();

  const groups = footerLinks.data.map((group) => {
    const links = group.links.map((link) => (
      <Link
        key={link.label}
        href={link.link}
        passHref
      >
        <Text
          variant="link"
          component="a"
          className={classes.link}
        >
          {link.label}
        </Text>
      </Link>
    ));

    return (
      <div className={classes.wrapper} key={group.title}>
        <Text className={classes.title}>{group.title}</Text>
        {links}
      </div>
    );
  });

  return (
    <Footer height={450} className={classes.footer}>
      <Stack>
        <Container className={classes.inner}>
          <div className={classes.groups}>{groups}</div>
        </Container>
        <Container>
          <Text size="xs" color="dimmed">
            Any information on Kalypto is not a buy or sell signal, nor is it financial advice.
            Options, investing, trading is risky, and losses are more expected than profits.
            Playing any alert/data may result in a complete, or partial, loss in investment.
            Please do own research before investing.
          </Text>
        </Container>
        <Container className={classes.afterFooter}>
          <Group spacing={15} position="left" noWrap sx={{ marginRight: '30px' }}>
            <Text color="dimmed" size="sm">
              © 2022 kalypto.io. All rights reserved.
            </Text>
            <Link href="/terms" passHref>
              <Text
                variant="link"
                component="a"
                color="dimmed"
                size="sm"
              >
                Terms
              </Text>
            </Link>
            <Link href="/terms" passHref>
              <Text
                variant="link"
                component="a"
                color="dimmed"
                size="sm"
              >
                Not financial advice.
              </Text>
            </Link>
          </Group>
          <Group spacing={15} className={classes.social} position="right" noWrap>
            <ActionIcon size="lg">
              <IconBrandTwitter size={18} stroke={1.5} />
            </ActionIcon>
            <ActionIcon size="lg">
              <IconBrandYoutube size={18} stroke={1.5} />
            </ActionIcon>
            <ActionIcon size="lg">
              <IconBrandInstagram size={18} stroke={1.5} />
            </ActionIcon>
          </Group>
        </Container>
      </Stack>
    </Footer>
  );
}
