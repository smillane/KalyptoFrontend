import { Button } from '@mantine/core';
import Link from 'next/link';

interface markestData {
  markets: {
    value: string;
    data: { label: string; individualData: object }[];
  }[];
}

function filterData(data: markestData, key: string) {
  return (data.markets.find((e) => e.value === key));
}

export default function BannerButtons(props: markestData) {
  if (filterData(props, 'us')) {
    const buttons = filterData(props, 'us').data.map((it) => (
      <Link
        key={it.label}
        href={`/stocks/${it.label}`}
        passHref
      >
        <Button>
          {it.label}
        </Button>
      </Link>
    ));

    return (
      <div key="us">
        {buttons}
      </div>
    );
  }
  if (filterData(props, 'europe')) {
    const buttons = filterData(props, 'europe').data.map((it) => (
      <Link
        key={it.label}
        href={`/stocks/${it.label}`}
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
  if (filterData(props, 'asia')) {
    const buttons = filterData(props, 'asia').data.map((it) => (
      <Link
        key={it.label}
        href={`/stocks/${it.label}`}
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
  if (filterData(props, 'treasuries')) {
    const buttons = filterData(props, 'treasuries').data.map((it) => (
      <Link
        key={it.label}
        href={`/treasury/${it.label}`}
        passHref
      >
        <Button>
          {it.label}
        </Button>
      </Link>
    ));

    return (
      <div key="treasuries">
        {buttons}
      </div>
    );
  }
  if (filterData(props, 'currencies')) {
    const buttons = filterData(props, 'currencies').data.map((it) => (
      <Link
        key={it.label}
        href={`/currency/${it.label}`}
        passHref
      >
        <Button>
          {it.label}
        </Button>
      </Link>
    ));

    return (
      <div key="currencies">
        {buttons}
      </div>
    );
  }
  if (props.markets.find((e) => e.value === 'commodities')) {
    const buttons = props.markets.find((e) => e.value === 'europe').data.map((it) => (
      <Link
        key={it.label}
        href={`/commodities/${it.label}`}
        passHref
      >
        <Button>
          {it.label}
        </Button>
      </Link>
    ));

    return (
      <div key="commodities">
        {buttons}
      </div>
    );
  }
  if (props.markets.find((e) => e.value === 'crypto')) {
    const buttons = props.markets.find((e) => e.value === 'europe').data.map((it) => (
      <Link
        key={it.label}
        href={`/crypto/${it.label}`}
        passHref
      >
        <Button>
          {it.label}
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
