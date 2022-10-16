import { Title, Text, Button } from '@mantine/core';
import Image from 'next/image';
import Link from 'next/link';

import LayoutWithAuth from '../../main/node/components/layout.tsx';

interface newsDataStructure {
  news:
  {
    datetime: number,
    hasPaywall: boolean,
    headline: string,
    image: string,
    imageUrl: string,
    lang: string,
    provider: string,
    qmUrl: string,
    related: string,
    source: string,
    summary: string,
    symbol: string,
    url: string,
    uuid: string,
    id: string,
    key: string,
    subkey: string,
    date: number,
    updated: number
  },
}

export default function News({ news }: newsDataStructure) {
  return (
    <LayoutWithAuth>
      <Title order={3}>{news.headline}</Title>
      <Text>
        Published on
        {' '}
        {news.datetime}
      </Text>
      <Text>{news.summary}</Text>
      <Image
        src={`https://res.cloudinary.com/demo/image/fetch/${it.imageUrl}`}
        alt="news article picture"
        width={250}
        height={250}
      />
      <Link href={news.url} passHref><Button>Continue reading this article</Button></Link>
    </LayoutWithAuth>
  );
}

export async function getServerSideProps({ query }) {
  const res = await fetch(`https://cloud.iexapis.com/v1/data/CORE/NEWS/${query.key}/${query.subKey}?token=${process.env.IEX_TOKEN}`);
  const news = await res.json();
  return { props: { news } };
}
