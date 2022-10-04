import { Button } from '@mantine/core';
import Link from 'next/link';

interface markestData {
  markets: {
    value: string;
    data: { label: string; individualData: object }[];
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
  if (key === 'currencies') {
    const buttons = filterData(props, 'currencies').data.map((it) => (
      <Link
        key={it.label}
        href={`/currencies/${it.individualData.symbol}`}
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
  if (key === 'commodities') {
    const buttons = filterData(props, 'commodities').data.map((it) => (
      <Link
        key={it.label}
        href={`/commodities/${it.individualData.key}`}
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
  if (key === 'crypto') {
    const buttons = filterData(props, 'crypto').data.map((it) => (
      <Link
        key={it.label}
        href={`/crypto/${it.individualData.symbol}`}
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
