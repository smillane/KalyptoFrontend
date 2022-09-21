import {
  Table, Space, Text, Container, Stack, Title,
} from '@mantine/core';
import Link from 'next/link';
import { v4 as uuidv4 } from 'uuid';

import Layout from '../../../main/node/components/layout';
import { transactionColor, typeOfTransaction } from '../../../main/node/util/formating';

export default function InsiderTrading({ stockSymbol, insiderTrading }) {
  return (
    <Layout>
      <Container sx={(theme) => ({
        boxShadow: theme.shadows.sm, padding: '10px', borderRadius: theme.radius.sm, margin: '2px', background: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[1],
      })}
      >
        <Title order={2} align="center" transform="capitalize">
          Insider Transactions for
          {' '}
          <Link href={`/stocks/${stockSymbol.symbol}`} passHref>{stockSymbol.symbol}</Link>
        </Title>
        <Space h="md" />
        <Table highlightOnHover>
          <thead>
            <tr>
              <th><Title transform="capitalize" order={5}>Insider</Title></th>
              <th><Title transform="capitalize" order={5}>Transaction</Title></th>
              <th><Title align="right" transform="capitalize" order={5}>Price / Share</Title></th>
              <th><Title align="right" transform="capitalize" order={5}>Total Value</Title></th>
              <th><Title align="right" transform="capitalize" order={5}>Shares After</Title></th>
            </tr>
          </thead>
          <tbody>
            {insiderTrading.map((indTrade) => (
              <tr key={uuidv4()}>
                <td>
                  <Stack spacing={0}>
                    <Text transform="capitalize" weight={700}>{indTrade.fullName}</Text>
                    <Text transform="capitalize" weight={500} lineClamp={1}>{indTrade.reportedTitle}</Text>
                  </Stack>
                </td>
                <td>
                  <Stack spacing={0}>
                    <Text transform="capitalize" color={transactionColor(indTrade.transactionCode)} weight={700}>{typeOfTransaction(indTrade.transactionCode)}</Text>
                    <Text transform="capitalize" weight={500}>{indTrade.transactionDate}</Text>
                  </Stack>
                </td>
                <td>
                  <Text align="right" transform="capitalize" weight={700}>
                    $
                    {indTrade.transactionPrice}
                  </Text>
                </td>
                <td>
                  <Text align="right" transform="capitalize" weight={700}>
                    $
                    {indTrade.transactionValue.toLocaleString()}
                  </Text>
                </td>
                <td><Text align="right" transform="capitalize" weight={700}>{indTrade.postShares.toLocaleString()}</Text></td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  // const res = await fetch(`http://localhost:8080/stocks/${context.params.stock}/quote`)
  // const stockInformation = await res.json()
  // set cache to not validate until the age is 24 hours - next day at time of update if after todays update, or 12-todays update time if before todays update, so will update max once a day
  // context.res.setHeader(
  //   'Cache-Control',
  //   'public, s-maxage=10, stale-while-revalidate=59'
  // )

  const stockInfo = 'test';
  const stockSymbol = { symbol: `${context.params.stock}` };
  const insiderTrading = [
    {
      conversionOrExercisePrice: 0,
      directIndirect: 'D',
      effectiveDate: '2047-06-07',
      filingDate: '2017-06-09',
      fullName: 'KRA DOUGLAS I',
      is10b51: false,
      postShares: 3520,
      reportedTitle: 'SVP, Global Customer Success',
      symbol: 'PEGA',
      transactionCode: 'B',
      transactionDate: '2047-06-07',
      transactionPrice: 22,
      transactionShares: 502,
      transactionValue: 111111,
      id: 'INSIDER_TRANSACTIONS',
      key: 'PEGA',
      subkey: '0001209191-17-038918',
      date: 0,
      updated: 1652531939238.962,
    },
    {
      conversionOrExercisePrice: 0,
      directIndirect: 'D',
      effectiveDate: '2047-06-07',
      filingDate: '2017-06-09',
      fullName: 'KRA PETER I',
      is10b51: false,
      postShares: 35420,
      reportedTitle: 'SVP, Global Customer Success',
      symbol: 'PEGA',
      transactionCode: 'B',
      transactionDate: '2047-06-07',
      transactionPrice: 23,
      transactionShares: 502,
      transactionValue: 12412411,
      id: 'INSIDER_TRANSACTIONS',
      key: 'PEGA',
      subkey: '0001209191-17-038918',
      date: 0,
      updated: 1652531939238.962,
    },
    {
      conversionOrExercisePrice: 0,
      directIndirect: 'D',
      effectiveDate: '2047-06-07',
      filingDate: '2017-06-09',
      fullName: 'AS MARG I',
      is10b51: true,
      postShares: 1252,
      reportedTitle: 'SVP, Global Customer Success',
      symbol: 'PEGA',
      transactionCode: 'S',
      transactionDate: '2047-06-07',
      transactionPrice: 44122,
      transactionShares: 11,
      transactionValue: 1111,
      id: 'INSIDER_TRANSACTIONS',
      key: 'PEGA',
      subkey: '0001209191-17-038918',
      date: 0,
      updated: 1652531939238.962,
    },
  ];
  if (!stockInfo) {
    return {
      notFound: true,
    };
  }

  return { props: { stockSymbol, insiderTrading } };
}
