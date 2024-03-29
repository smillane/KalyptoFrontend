import {
  Button, Group, Stack, Text,
} from '@mantine/core';
import Link from 'next/link';

import { greenOrRed } from '../util/formating';

interface markestData {
  markets: {
    value: string;
    data: { label: string; individualData: any }[];
  }[];
}

function filterData(prop: markestData, key: string) {
  return (prop.markets.find((e) => e.value === key));
}

export default function BannerButtons(props: markestData, key: string) {
  if (key === 'us') {
    const buttons = filterData(props, 'us').data.map((it) => (
      <Link
        key={it.label}
        href={`/stocks/${it.individualData.symbol}`}
        passHref
      >
        <Button
          variant="default"
          radius="md"
          color="dark"
          sx={{
            height: '70px', marginRight: '1em',
          }}
        >
          <Group>
            <Stack>
              <Text weight={700}>{it.label}</Text>
              <Text>{it.individualData.latestPrice}</Text>
            </Stack>
            <Stack>
              <Text color={greenOrRed(it.individualData.changePercent)}>
                {(it.individualData.changePercent * 100).toFixed(2)}
                %
              </Text>
              <Text color={greenOrRed(it.individualData.change)}>
                {it.individualData.change}
              </Text>
            </Stack>
          </Group>
        </Button>
      </Link>
    ));

    return (
      <div key="us">
        {buttons}
      </div>
    );
  }

  if (key === 'europe') {
    const buttons = filterData(props, 'europe').data.map((it) => (
      <Link
        key={it.label}
        href={`/stocks/${it.individualData.symbol}`}
        passHref
      >
        <Button>
          {it.label}
        </Button>
      </Link>
    ));

    return (
      <div key="europe">
        {buttons}
      </div>
    );
  }

  if (key === 'asia') {
    const buttons = filterData(props, 'asia').data.map((it) => (
      <Link
        key={it.label}
        href={`/stocks/${it.individualData.symbol}`}
        passHref
      >
        <Button>
          {it.label}
        </Button>
      </Link>
    ));

    return (
      <div key="asia">
        {buttons}
      </div>
    );
  }

  if (key === 'treasuries') {
    const buttons = filterData(props, 'treasuries').data.map((it) => (
      <Link
        key={it.label}
        href={`/treasuries/${it.individualData.key}`}
        passHref
      >
        <Button
          variant="default"
          radius="md"
          color="dark"
          sx={{
            height: '70px', marginRight: '1em',
          }}
        >
          <Group>
            <Text weight={700}>{it.label}</Text>
            <Text>{it.individualData.value}</Text>
          </Group>
        </Button>
      </Link>
    ));

    return (
      <div key="treasuries">
        {buttons}
      </div>
    );
  }

  if (key === 'currencies') {
    const buttons = filterData(props, 'currencies').data.map((it) => (
      <Link
        key={it.label}
        href={`/currencies/${it.individualData.symbol}`}
        passHref
      >
        <Button
          variant="default"
          radius="md"
          color="dark"
          sx={{
            height: '70px', marginRight: '1em',
          }}
        >
          <Group>
            <Text weight={700}>{it.label}</Text>
            <Text>{it.individualData.rate}</Text>
          </Group>
        </Button>
      </Link>
    ));

    return (
      <div key="currencies">
        {buttons}
      </div>
    );
  }

  if (key === 'commodities') {
    const buttons = filterData(props, 'commodities').data.map((it) => (
      <Link
        key={it.label}
        href={`/commodities/${it.individualData.key}`}
        passHref
      >
        <Button
          variant="default"
          radius="md"
          color="dark"
          sx={{
            height: '70px', marginRight: '1em',
          }}
        >
          <Group>
            <Text weight={700}>{it.label}</Text>
            <Text>{it.individualData.value}</Text>
          </Group>
        </Button>
      </Link>
    ));

    return (
      <div key="commodities">
        {buttons}
      </div>
    );
  }

  if (key === 'crypto') {
    const buttons = filterData(props, 'crypto').data.map((it) => (
      <Link
        key={it.label}
        href={`/crypto/${it.individualData.symbol}`}
        passHref
      >
        <Button
          variant="default"
          radius="md"
          color="dark"
          sx={{
            height: '70px', marginRight: '1em',
          }}
        >
          <Group>
            <Text weight={700}>{it.label}</Text>
            <Text>{it.individualData.latestPrice}</Text>
          </Group>
        </Button>
      </Link>
    ));

    return (
      <div key="crypto">
        {buttons}
      </div>
    );
  }
}
