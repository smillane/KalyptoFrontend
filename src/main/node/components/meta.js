import Head from 'next/head';

function Meta({ title, keywords, description }) {
  return (
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="keywords" content={keywords} />
      <meta name="description" content={description} />
      <meta charSet="utf-8" />
      <link rel="icon" href="/favicon.ico" />
      <title>{title}</title>
    </Head>
  );
}

Meta.defaultProps = {
  title: 'Kalypto App',
  keywords: 'stocks, stock market, markets, commodities, treasuries, stonks, wsb, wallstreetbets, gme, gamestop, amc, to the moon',
  description: 'Keep up to date with the markets',
};

export default Meta;
