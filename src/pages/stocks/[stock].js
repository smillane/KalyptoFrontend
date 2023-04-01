import {
  Table, Box, Grid, Title, Text, Container,
  Button, Stack, Space, Group, SimpleGrid, Divider, Spoiler,
} from '@mantine/core';
import Link from 'next/link';
import { v4 as uuidv4 } from 'uuid';

import Layout from '../../main/node/components/layout.tsx';
import AddItemToListButton from '../../main/node/components/addItemToListButton.tsx';
import {
  transactionColor, typeOfTransaction, reduceZerosToLetters, greenOrRed,
} from '../../main/node/util/formating.tsx';
import Watchlist from '../../main/node/redux/features/userLists/Watchlist.tsx';

// implement scrollbar sideways for containers such as dividends, insider trading,
// institutional ownership etc, based on page width, for mobile
// or restructure how data is displayed, what data is, format, etc
// trailing ..., not finishing full name for people/companies for insider/institutions
// if user is not logged in with an account, only show a basic quote and chart
export default function Stock({
  stockSymbol, company, quote, last4Dividends, financials, fundamentalValuations,
  fundamentals, stats, basicStats, nextDiv, insiderTrading, institutionalOwnership,
  insiderSummary, peerGroup, news,
}) {
  return (
    <Layout>
      <Grid grow>
        <Container size="xl">
          <Group>
            <Title order={1} transform="uppercase">{stockSymbol.symbol}</Title>
            <Title order={1} transform="uppercase">{company.symbol}</Title>
            <Title order={1} weight={100} transform="capitalize">{company.companyName}</Title>
            <AddItemToListButton />
          </Group>
          <Space h="sm" />
          <Group>
            <Title transform="capitalize" order={4}>{quote.latestPrice}</Title>
            <Title transform="capitalize" order={4} color={greenOrRed(quote.change)}>{quote.change}</Title>
            <Title transform="capitalize" order={4} color={greenOrRed(quote.changePercent)}>
              {(quote.changePercent * 100).toFixed(2)}
              %
            </Title>
          </Group>
          <Space h="lg" />
          <Grid>
            <Grid.Col xs={6} sm={4} md={4} lg={4}>
              <Table
                highlightOnHover
                sx={(theme) => ({
                  boxShadow: theme.shadows.sm, borderRadius: theme.radius.sm, margin: '2px', background: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[1],
                })}
              >
                <tbody>
                  <tr>
                    <td><Text transform="capitalize" weight={700}>Todays Volume</Text></td>
                    <td><Text transform="capitalize" align="right" weight={700}>{quote.volume.toLocaleString()}</Text></td>
                  </tr>
                  <tr>
                    <td><Text transform="capitalize" weight={700}>Avg Volume</Text></td>
                    <td><Text transform="capitalize" align="right" weight={700}>{quote.avgTotalVolume.toLocaleString()}</Text></td>
                  </tr>
                  <tr>
                    <td><Text transform="capitalize" weight={700}>Market Cap</Text></td>
                    <td>
                      <Text transform="capitalize" align="right" weight={700}>
                        $
                        {reduceZerosToLetters(quote.marketCap)}
                      </Text>
                    </td>
                  </tr>
                  <tr>
                    <td><Text transform="capitalize" weight={700}>Enterprise Value</Text></td>
                    <td>
                      <Text transform="capitalize" align="right" weight={700}>
                        $
                        {reduceZerosToLetters(fundamentalValuations.enterpriseValue)}
                      </Text>
                    </td>
                  </tr>
                  <tr>
                    <td><Text transform="capitalize" weight={700}>Next Earnings Date</Text></td>
                    <td><Text transform="capitalize" align="right" weight={700}>{basicStats.nextEarningsDate}</Text></td>
                  </tr>
                </tbody>
              </Table>
              <Table
                highlightOnHover
                sx={(theme) => ({
                  boxShadow: theme.shadows.sm, borderRadius: theme.radius.sm, margin: '2px', background: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[1],
                })}
              >
                <tbody>
                  <tr>
                    <td><Text transform="capitalize" weight={700}>Total Assets</Text></td>
                    <td>
                      <Text transform="capitalize" align="right" weight={700}>
                        $
                        {reduceZerosToLetters(financials.totalAssets)}
                      </Text>
                    </td>
                  </tr>
                  <tr>
                    <td><Text transform="capitalize" weight={700}>Total Liabilities</Text></td>
                    <td>
                      <Text transform="capitalize" align="right" weight={700}>
                        $
                        {reduceZerosToLetters(financials.totalLiabilities)}
                      </Text>
                    </td>
                  </tr>
                  <tr>
                    <td><Text transform="capitalize" weight={700}>Shareholder Equity</Text></td>
                    <td>
                      <Text transform="capitalize" align="right" weight={700}>
                        $
                        {reduceZerosToLetters(financials.shareholderEquity)}
                      </Text>
                    </td>
                  </tr>
                  <tr>
                    <td><Text transform="capitalize" weight={700}>Shares Outstanding</Text></td>
                    <td>
                      <Text transform="capitalize" align="right" weight={700}>
                        $
                        {reduceZerosToLetters(basicStats.sharesOutstanding)}
                      </Text>
                    </td>
                  </tr>
                </tbody>
              </Table>
              <Table
                highlightOnHover
                sx={(theme) => ({
                  boxShadow: theme.shadows.sm, borderRadius: theme.radius.sm, margin: '2px', background: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[1],
                })}
              >
                <tbody>
                  <tr>
                    <td><Text transform="capitalize" weight={700}>P/E</Text></td>
                    <td><Text transform="capitalize" align="right" weight={700}>{quote.peRatio.toFixed(2)}</Text></td>
                  </tr>
                  <tr>
                    <td><Text transform="capitalize" weight={700}>Forward P/E</Text></td>
                    <td><Text transform="capitalize" align="right" weight={700}>{stats.forwardPERatio.toFixed(2)}</Text></td>
                  </tr>
                  <tr>
                    <td><Text transform="capitalize" weight={700}>Price/Revenue</Text></td>
                    <td><Text transform="capitalize" align="right" weight={700}>{fundamentalValuations.priceToRevenue.toFixed(2)}</Text></td>
                  </tr>
                  <tr>
                    <td><Text transform="capitalize" weight={700}>EV/Sales</Text></td>
                    <td><Text transform="capitalize" align="right" weight={700}>{fundamentalValuations.evToSales.toFixed(2)}</Text></td>
                  </tr>
                  <tr>
                    <td><Text transform="capitalize" weight={700}>Book/Share</Text></td>
                    <td><Text transform="capitalize" align="right" weight={700}>{fundamentalValuations.bookValuePerShare.toFixed(2)}</Text></td>
                  </tr>
                  <tr>
                    <td><Text transform="capitalize" weight={700}>Cash/Share</Text></td>
                    <td>
                      <Text transform="capitalize" align="right" weight={700}>
                        $
                        {Math.trunc(financials.totalCash / quote.latestPrice).toLocaleString()}
                      </Text>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Grid.Col>
            <Grid.Col xs={6} sm={4} md={4} lg={4}>
              <Table
                highlightOnHover
                sx={(theme) => ({
                  boxShadow: theme.shadows.sm, borderRadius: theme.radius.sm, margin: '2px', background: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[1],
                })}
              >
                <tbody>
                  <tr>
                    <td><Text transform="capitalize" weight={700}>EPS</Text></td>
                    <td><Text transform="capitalize" align="right" weight={700}>{basicStats.ttmEPS}</Text></td>
                  </tr>
                  <tr>
                    <td><Text transform="capitalize" weight={700}>Revenue</Text></td>
                    <td>
                      <Text transform="capitalize" align="right" weight={700} color={greenOrRed(fundamentalValuations.revenueGrowth)}>
                        $
                        {reduceZerosToLetters(financials.revenue)}
                      </Text>
                    </td>
                  </tr>
                  <tr>
                    <td><Text transform="capitalize" weight={700}>EBITDA</Text></td>
                    <td>
                      <Text transform="capitalize" align="right" weight={700} color={greenOrRed(fundamentalValuations.ebitdaGrowth)}>
                        $
                        {reduceZerosToLetters(financials.EBITDA)}
                      </Text>
                    </td>
                  </tr>
                  <tr>
                    <td><Text transform="capitalize" weight={700}>GAAP Net Income</Text></td>
                    <td>
                      <Text transform="capitalize" align="right" weight={700} color={greenOrRed(fundamentalValuations.incomeNetYoyDelta)}>
                        $
                        {reduceZerosToLetters(fundamentals.incomeNet)}
                      </Text>
                    </td>
                  </tr>
                  <tr>
                    <td><Text transform="capitalize" weight={700}>Cash Flow</Text></td>
                    <td>
                      <Text transform="capitalize" align="right" weight={700} color={greenOrRed(fundamentalValuations.freeCashFlowGrowth)}>
                        $
                        {reduceZerosToLetters(financials.cashFlow)}
                      </Text>
                    </td>
                  </tr>
                </tbody>
              </Table>
              <Table
                highlightOnHover
                sx={(theme) => ({
                  boxShadow: theme.shadows.sm, borderRadius: theme.radius.sm, margin: '2px', background: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[1],
                })}
              >
                <tbody>
                  <tr>
                    <td><Text transform="capitalize" weight={700}>Profit margin</Text></td>
                    <td>
                      <Text transform="capitalize" align="right" weight={700}>
                        {(fundamentalValuations.profitGrossToRevenue * 100).toFixed(2)}
                        %
                      </Text>
                    </td>
                  </tr>
                  <tr>
                    <td><Text transform="capitalize" weight={700}>Oper. margin</Text></td>
                    <td>
                      <Text transform="capitalize" align="right" weight={700}>
                        {(fundamentalValuations.operatingIncomeToRevenue * 100).toFixed(2)}
                        %
                      </Text>
                    </td>
                  </tr>
                  <tr>
                    <td><Text transform="capitalize" weight={700}>Gross margin</Text></td>
                    <td>
                      <Text transform="capitalize" align="right" weight={700}>
                        {(fundamentalValuations.profitGrossToRevenue * 100).toFixed(2)}
                        %
                      </Text>
                    </td>
                  </tr>
                  <tr>
                    <td><Text transform="capitalize" weight={700}>EBIT margin</Text></td>
                    <td>
                      <Text transform="capitalize" align="right" weight={700}>
                        {(fundamentalValuations.ebitToRevenue * 100).toFixed(2)}
                        %
                      </Text>
                    </td>
                  </tr>
                  <tr>
                    <td><Text transform="capitalize" weight={700}>EBITDA margin</Text></td>
                    <td>
                      <Text transform="capitalize" align="right" weight={700}>
                        {(fundamentalValuations.ebitdaMargin * 100).toFixed(2)}
                        %
                      </Text>
                    </td>
                  </tr>
                </tbody>
              </Table>
              <Table
                highlightOnHover
                sx={(theme) => ({
                  boxShadow: theme.shadows.sm, borderRadius: theme.radius.sm, margin: '2px', background: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[1],
                })}
              >
                <tbody>
                  <tr>
                    <td><Text transform="capitalize" weight={700}>Debt to Equity</Text></td>
                    <td><Text transform="capitalize" align="right" weight={700}>{fundamentalValuations.debtToEquity}</Text></td>
                  </tr>
                  <tr>
                    <td><Text transform="capitalize" weight={700}>Debt to EBITDA</Text></td>
                    <td><Text transform="capitalize" align="right" weight={700}>{fundamentalValuations.debtToEbitda}</Text></td>
                  </tr>
                </tbody>
              </Table>
              <Table
                highlightOnHover
                sx={(theme) => ({
                  boxShadow: theme.shadows.sm, borderRadius: theme.radius.sm, margin: '2px', background: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[1],
                })}
              >
                <tbody>
                  <tr>
                    <td><Text transform="capitalize" weight={700}>Return on Assets</Text></td>
                    <td>
                      <Text transform="capitalize" align="right" weight={700}>
                        {(fundamentalValuations.returnOnAssets * 100).toFixed(2)}
                        %
                      </Text>
                    </td>
                  </tr>
                  <tr>
                    <td><Text transform="capitalize" weight={700}>Return on Equity</Text></td>
                    <td>
                      <Text transform="capitalize" align="right" weight={700}>
                        {(fundamentalValuations.returnOnEquity * 100).toFixed(2)}
                        %
                      </Text>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Grid.Col>
            <Grid.Col xs={6} sm={4} md={4} lg={4}>
              <Table
                highlightOnHover
                sx={(theme) => ({
                  boxShadow: theme.shadows.sm, borderRadius: theme.radius.sm, margin: '2px', background: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[1],
                })}
              >
                <tbody>
                  <tr>
                    <td><Text transform="capitalize" weight={700}>Dividend</Text></td>
                    <td>
                      <Text transform="capitalize" align="right" weight={700}>
                        $
                        {basicStats.ttmDividendRate ? (basicStats.ttmDividendRate).toFixed(2) : 0}
                      </Text>
                    </td>
                  </tr>
                  <tr>
                    <td><Text transform="capitalize" weight={700}>Dividend Yield</Text></td>
                    <td>
                      <Text transform="capitalize" align="right" weight={700}>
                        {basicStats.dividendYield ? (basicStats.dividendYield * 100).toFixed(2) : 0}
                        %
                      </Text>
                    </td>
                  </tr>
                </tbody>
              </Table>
              <Table
                highlightOnHover
                sx={(theme) => ({
                  boxShadow: theme.shadows.sm, borderRadius: theme.radius.sm, margin: '2px', background: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[1],
                })}
              >
                <tbody>
                  <tr>
                    <td><Text transform="capitalize" weight={700}>52 week high</Text></td>
                    <td><Text transform="capitalize" align="right" weight={700}>{basicStats.week52high}</Text></td>
                  </tr>
                  <tr>
                    <td><Text transform="capitalize" weight={700}>52 week low</Text></td>
                    <td><Text transform="capitalize" align="right" weight={700}>{basicStats.week52low}</Text></td>
                  </tr>
                  <tr>
                    <td><Text transform="capitalize" weight={700}>52 week change</Text></td>
                    <td><Text transform="capitalize" weight={700} color={greenOrRed(basicStats.week52change)} align="right">{(basicStats.week52change).toFixed(2)}</Text></td>
                  </tr>
                  <tr>
                    <td><Text transform="capitalize" weight={700}>YTD Change</Text></td>
                    <td>
                      <Text transform="capitalize" weight={700} color={greenOrRed(quote.ytdChange)} align="right">
                        {(quote.ytdChange * 100).toLocaleString()}
                        {' '}
                        %
                      </Text>
                    </td>
                  </tr>
                </tbody>
              </Table>
              <Table
                highlightOnHover
                sx={(theme) => ({
                  boxShadow: theme.shadows.sm, borderRadius: theme.radius.sm, margin: '2px', background: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[1],
                })}
              >
                <tbody>
                  <tr>
                    <td><Text transform="capitalize" weight={700}>Total Employees</Text></td>
                    <td><Text transform="capitalize" align="right" weight={700}>{basicStats.employees.toLocaleString()}</Text></td>
                  </tr>
                  <tr>
                    <td><Text transform="capitalize" weight={700}>Revenue Per Employee</Text></td>
                    <td>
                      <Text transform="capitalize" align="right" weight={700}>
                        $
                        {(financials.revenue / basicStats.employees).toLocaleString()}
                      </Text>
                    </td>
                  </tr>
                </tbody>
              </Table>
              <Table
                highlightOnHover
                sx={(theme) => ({
                  boxShadow: theme.shadows.sm, borderRadius: theme.radius.sm, margin: '2px', background: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[1],
                })}
              >
                <tbody>
                  <tr>
                    <td><Text transform="capitalize" weight={700}>Put/Call Ratio</Text></td>
                    <td><Text transform="capitalize" align="right" weight={700}>{stats.putCallRatio.toFixed(2)}</Text></td>
                  </tr>
                </tbody>
              </Table>
            </Grid.Col>
          </Grid>
          <SimpleGrid
            breakpoints={[
              { minWidth: 'sm', cols: 1 },
              { minWidth: 1200, cols: 1 },
              { minWidth: 1450, cols: 2 },
            ]}
            sx={{ margin: '2px' }}
          >
            <Container sx={(theme) => ({
              boxShadow: theme.shadows.sm, padding: '10px', borderRadius: theme.radius.sm, margin: '2px', background: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[1],
            })}
            >
              <Title order={3}>News</Title>
              <Space h="md" />
              {news.map((individualNews) => (
                <div key={individualNews.uuid}>
                  <Link
                    href={{
                      pathname: '/news/',
                      query: { key: individualNews.key, subkey: individualNews.subkey },
                    }}
                    passHref
                    key={individualNews.uuid}
                  >
                    <Box
                      sx={(theme) => ({
                        cursor: 'pointer',
                        marginBottom: '1em',
                        '&:hover': {
                          backgroundColor:
              theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[3],
                        },
                      })}
                    >
                      <Divider />
                      <Group noWrap>
                        <Stack>
                          <Text weight={700} lineClamp={1}>{individualNews.headline}</Text>
                        </Stack>
                      </Group>
                    </Box>
                  </Link>
                  <Space h="xs" />
                </div>
              ))}
            </Container>
            <div>
              <Container sx={(theme) => ({
                boxShadow: theme.shadows.sm, padding: '10px', borderRadius: theme.radius.sm, margin: '2px', background: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[1],
              })}
              >
                <Link href={`/stocks/${stockSymbol.symbol}/insider-trading`} passHref>
                  <Button variant="outline" color="dark">
                    <Title order={3}>Insider Trading</Title>
                  </Button>
                </Link>
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
              <Container sx={(theme) => ({
                boxShadow: theme.shadows.sm, padding: '10px', borderRadius: theme.radius.sm, margin: '2px', background: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[1],
              })}
              >
                <Title order={3}>Insider Trading, Prev. 6 Months</Title>
                <Space h="md" />
                <Table highlightOnHover>
                  <thead>
                    <tr>
                      <th><Title transform="capitalize" order={5}>Insider</Title></th>
                      <th><Title align="right" transform="capitalize" order={5}>Net Transacted</Title></th>
                    </tr>
                  </thead>
                  <tbody>
                    {insiderSummary.map((insider) => (
                      <tr key={insider.issuerCik}>
                        <td>
                          <Stack spacing={0}>
                            <Text transform="capitalize" weight={700}>{insider.fullName}</Text>
                            <Text transform="capitalize" weight={500} lineClamp={1}>{insider.reportedTitle}</Text>
                          </Stack>
                        </td>
                        <td>
                          <Text align="right" transform="capitalize" weight={700} color={greenOrRed(insider.netTransacted)}>
                            $
                            {insider.netTransacted.toLocaleString()}
                          </Text>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Container>
              <Container sx={(theme) => ({
                boxShadow: theme.shadows.sm, padding: '10px', borderRadius: theme.radius.sm, margin: '2px', background: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[1],
              })}
              >
                <Title order={3}>Insitutional Ownership</Title>
                <Space h="md" />
                <Table highlightOnHover>
                  <thead>
                    <tr>
                      <th><Title transform="capitalize" order={5}>Filing Date</Title></th>
                      <th><Title transform="capitalize" order={5}>Shareholder</Title></th>
                      <th><Title align="right" transform="capitalize" order={5}>Total Shares</Title></th>
                      <th><Title align="right" transform="capitalize" order={5}>Value</Title></th>
                    </tr>
                  </thead>
                  <tbody>
                    {institutionalOwnership.map((institution) => (
                      <tr key={institution.entityProperName}>
                        <td>
                          <Text transform="capitalize" weight={700}>{institution.reportDate}</Text>
                        </td>
                        <td>
                          <Text transform="capitalize" weight={700} lineClamp={1}>{institution.entityProperName}</Text>
                        </td>
                        <td>
                          <Text align="right" transform="capitalize" weight={700}>{institution.adjustedHolding.toLocaleString()}</Text>
                        </td>
                        <td>
                          <Text align="right" transform="capitalize" weight={700}>
                            $
                            {institution.adjustedMarketValue.toLocaleString()}
                          </Text>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Container>
            </div>
            <Container sx={(theme) => ({
              boxShadow: theme.shadows.sm, padding: '10px', borderRadius: theme.radius.sm, margin: '2px', background: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[1],
            })}
            >
              <Link href={`/stocks/${stockSymbol.symbol}/dividends`} passHref>
                <Button variant="outline" color="dark" sx={(theme) => ({ background: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[1] })}>
                  <Title order={3}>Dividends</Title>
                </Button>
              </Link>
              <Space h="md" />
              <Title order={5}>Next Dividend</Title>
              <Table highlightOnHover>
                <thead>
                  <tr>
                    <th><Title transform="capitalize" order={5}>Payment Date</Title></th>
                    <th><Title transform="capitalize" order={5}>Ex Date</Title></th>
                    <th><Title align="right" transform="capitalize" order={5}>Amount</Title></th>
                    <th><Title align="right" transform="capitalize" order={5}>Payment Type</Title></th>
                    <th><Title align="right" transform="capitalize" order={5}>Frequency</Title></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><Text transform="capitalize" weight={700}>{nextDiv.paymentDate}</Text></td>
                    <td><Text transform="capitalize" weight={700}>{nextDiv.exDate}</Text></td>
                    <td>
                      <Text align="right" transform="capitalize" weight={700}>
                        {nextDiv.amount}
                        {' '}
                        {nextDiv.currency}
                      </Text>
                    </td>
                    <td><Text align="right" transform="capitalize" weight={700}>{nextDiv.flag}</Text></td>
                    <td><Text align="right" transform="capitalize" weight={700}>{nextDiv.frequency}</Text></td>
                  </tr>
                </tbody>
              </Table>
              <Space h="sm" />
              <Title order={5}>Previous Dividends</Title>
              <Table highlightOnHover>
                <thead>
                  <tr>
                    <th><Title transform="capitalize" order={5}>Payment Date</Title></th>
                    <th><Title transform="capitalize" order={5}>Ex Date</Title></th>
                    <th><Title align="right" transform="capitalize" order={5}>Amount</Title></th>
                    <th><Title align="right" transform="capitalize" order={5}>Payment Type</Title></th>
                    <th><Title align="right" transform="capitalize" order={5}>Frequency</Title></th>
                  </tr>
                </thead>
                <tbody>
                  {last4Dividends.map((dividend) => (
                    <tr key={dividend.paymentDate}>
                      <td><Text transform="capitalize" weight={700}>{dividend.paymentDate}</Text></td>
                      <td><Text transform="capitalize" weight={700}>{dividend.exDate}</Text></td>
                      <td>
                        <Text align="right" transform="capitalize" weight={700}>
                          {dividend.amount}
                          {' '}
                          {dividend.currency}
                        </Text>
                      </td>
                      <td><Text align="right" transform="capitalize" weight={700}>{dividend.flag}</Text></td>
                      <td><Text align="right" transform="capitalize" weight={700}>{dividend.frequency}</Text></td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Container>
            <Container sx={(theme) => ({
              boxShadow: theme.shadows.sm, padding: '10px', borderRadius: theme.radius.sm, margin: '2px', background: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[1],
            })}
            >
              <Title order={3}>About</Title>
              <Space h="md" />
              <Spoiler maxHeight={150} showLabel="Show more" hideLabel="Hide">
                <Text size="sm">{company.shortDescription}</Text>
              </Spoiler>
              <Space h="sm" />
              <Text size="sm">
                CEO:
                {' '}
                {company.ceo}
              </Text>
              <Divider my="xs" />
              <Text size="sm">
                Industry:
                {' '}
                {company.industry}
              </Text>
              <Divider my="xs" />
              <Text size="sm">
                Headquarters:
                {' '}
                {company.city}
                ,
                {' '}
                {company.state}
              </Text>
              <Divider my="xs" />
              <Link href={`${company.website}`} passHref><Text variant="link" size="sm">{company.website}</Text></Link>
            </Container>
          </SimpleGrid>
          <Space h="xs" />
          <Container
            size="xl"
            sx={(theme) => ({
              boxShadow: theme.shadows.sm, padding: '10px', borderRadius: theme.radius.sm, margin: '2px', background: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[1],
            })}
          >
            <Title order={4}>People also viewed</Title>
            <Space h="md" />
            <SimpleGrid breakpoints={[
              { minWidth: 350, cols: 2 },
              { minWidth: 500, cols: 3 },
              { minWidth: 'xs', cols: 4 },
              { minWidth: 'sm', cols: 4 },
              { minWidth: 'md', cols: 6 },
              { minWidth: 1200, cols: 6 }]}
            >
              {peerGroup.map((it) => <Link href={`/stocks/${it}`} key={it} passHref><Button variant="outline" color="dark">{it}</Button></Link>)}
            </SimpleGrid>
          </Container>
        </Container>
        <Watchlist />
      </Grid>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  // const res = await Promise.all(fetch(`http://localhost:8080/stocks/${context.params.stock}/quote`))
  // const stockInformation = await res.json()
  // context.res.setHeader(
  //   'Cache-Control',
  //   'public, s-maxage=300, stale-while-revalidate=300'
  // )

  const stockSymbol = { symbol: `${context.params.stock}` };
  const company = [{
    address: '1 Apple Park Way', address2: null, ceo: 'Timothy Cook', city: 'Cupertino', companyName: 'Apple Inc', country: 'US', date: '2022-07-18', employees: 147000, exchange: 'NASDAQ', exchangeCode: null, industry: 'Electronic Computer Manufacturing ', issuetype: 'cs', longDescription: "Apple Inc. is an American multinational technology company headquartered in Cupertino, California, that designs, develops, and sells consumer electronics, computer software, and online services. It is considered one of the Big Five companies in the U.S. information technology industry, along with Amazon, Google, Microsoft, and Facebook. Its hardware products include the iPhone smartphone, the iPad tablet computer, the Mac personal computer, the iPod portable media player, the Apple Watch smartwatch, the Apple TV digital media player, the AirPods wireless earbuds, the AirPods Max headphones, and the HomePod smart speaker line. Apple's software includes iOS, iPadOS, macOS, watchOS, and tvOS operating systems, the iTunes media player, the Safari web browser, the Shazam music identifier, and the iLife and iWork creativity and productivity suites, as well as professional applications like Final Cut Pro X, Logic Pro, and Xcode. Its online services include the iTunes Store, the iOS App Store, Mac App Store, Apple Arcade, Apple Music, Apple TV+, iMessage, and iCloud. Other services include Apple Store, Genius Bar, AppleCare, Apple Pay, Apple Pay Cash, and Apple Card.\nApple was founded by Steve Jobs, Steve Wozniak, and Ronald Wayne in April 1976 to develop and sell Wozniak's Apple I personal computer, though Wayne sold his share back within 12 days. It was incorporated as Apple Computer, Inc., in January 1977, and sales of its computers, including the Apple I and Apple II, grew quickly.", marketcap: null, phone: '14089961010', primarySicCode: '3571', sector: 'Manufacturing', securityName: null, securityType: 'cs', shortDescription: "Apple Inc. is an American multinational technology company headquartered in Cupertino, California, that designs, develops, and sells consumer electronics, computer software, and online services. It is considered one of the Big Five companies in the U.S. information technology industry, along with Amazon, Google, Microsoft, and Facebook. Its hardware products include the iPhone smartphone, the iPad tablet computer, the Mac personal computer, the iPod portable media player, the Apple Watch smartwatch, the Apple TV digital media player, the AirPods wireless earbuds, the AirPods Max headphones, and the HomePod smart speaker line. Apple's software includes iOS, iPadOS, macOS, watchOS, and tvOS operating systems, the iTunes media player, the Safari web browser, the Shazam music identifier, and the iLife and iWork creativity and productivity suites, as well as professional applications like Final Cut Pro X, Logic Pro, and Xcode. Its online services include the iTunes Store, the iOS App Store, Mac App Store, Apple Arcade, Apple Music, Apple TV+, iMessage, and iCloud. Other services include Apple Store, Genius Bar, AppleCare, Apple Pay, Apple Pay Cash, and Apple Card.\nApple was founded by Steve Jobs, Steve Wozniak, and Ronald Wayne in April 1976 to develop and sell Wozniak's Apple I personal computer, though Wayne sold his share back within 12 days. It was incorporated as Apple Computer, Inc., in January 1977, and sales of its computers, including the Apple I and Apple II, grew quickly.", state: 'California', symbol: 'AAPL', website: 'https://www.apple.com/', zip: '95014-0642', id: 'COMPANY', key: 'AAPL', subkey: '', updated: 1658178636273.846,
  }][0];
  const quote = {
    avgTotalVolume: 70812911, calculationPrice: 'close', change: 3.04, changePercent: 0.01904, close: 164.5, closeSource: 'affoicil', closeTime: 1734295966795, companyName: 'Apple Inc', currency: 'USD', delayedPrice: 163.603, delayedPriceTime: 1737519598489, extendedChange: 0.15, extendedChangePercent: 0.00098, extendedPrice: 160.43, extendedPriceTime: 1729405496463, high: 164.5, highSource: 'piunimy ecede1dt laer5 ', highTime: 1699741879641, iexAskPrice: null, iexAskSize: null, iexBidPrice: null, iexBidSize: null, iexClose: 162.47, iexCloseTime: 1691582608499, iexLastUpdated: null, iexMarketPercent: null, iexOpen: 156.81, iexOpenTime: 1725689786117, iexRealtimePrice: null, iexRealtimeSize: null, iexVolume: null, lastTradeTime: 1669671197923, latestPrice: 159.19, latestSource: 'Close', latestTime: 'September 9, 2022', latestUpdate: 1685045584478, latestVolume: 71236798, low: 160.3, lowSource: 'edyree5di ime c antpul1', lowTime: 1733695008100, marketCap: 2569564253181, oddLotDelayedPrice: 161.07, oddLotDelayedPriceTime: 1738846413646, open: 162.57, openTime: 1710357907314, openSource: 'ficilfoa', peRatio: 26.39, previousClose: 155.07, previousVolume: 87690310, primaryExchange: 'DAAQSN', symbol: 'AAPL', volume: 70118569, week52High: 191.07, week52Low: 132.61, ytdChange: -0.0941945158215941, isUSMarketOpen: false,
  };
  const last4Dividends = [{
    amount: 0.23, currency: 'USD', declaredDate: '2022-07-28', description: 'Ordinary Shares', exDate: '2022-08-05', flag: 'Cash', frequency: 'quarterly', paymentDate: '2022-08-11', recordDate: '2022-08-08', refid: 2663365, symbol: 'AAPL', id: 'DIVIDENDS', key: 'AAPL', subkey: '2663365', date: 1659657600000, updated: 1659479407000,
  }, {
    amount: 0.23, currency: 'USD', declaredDate: '2022-04-28', description: 'Ordinary Shares', exDate: '2022-05-06', flag: 'Cash', frequency: 'quarterly', paymentDate: '2022-05-12', recordDate: '2022-05-09', refid: 2502890, symbol: 'AAPL', id: 'DIVIDENDS', key: 'AAPL', subkey: '2502890', date: 1651795200000, updated: 1652531943175.202,
  }, {
    amount: 0.22, currency: 'USD', declaredDate: '2022-01-27', description: 'Ordinary Shares', exDate: '2022-02-04', flag: 'Cash', frequency: 'quarterly', paymentDate: '2022-02-10', recordDate: '2022-02-07', refid: 2430900, symbol: 'AAPL', id: 'DIVIDENDS', key: 'AAPL', subkey: '2430900', date: 1643932800000, updated: 1652531943175.202,
  }, {
    amount: 0.22, currency: 'USD', declaredDate: '2021-10-28', description: 'Ordinary Shares', exDate: '2021-11-05', flag: 'Cash', frequency: 'quarterly', paymentDate: '2021-11-11', recordDate: '2021-11-08', refid: 2345242, symbol: 'AAPL', id: 'DIVIDENDS', key: 'AAPL', subkey: '2345242', date: 1636070400000, updated: 1652531943175.202,
  }];
  const financials = [
    {
      accountsPayable: 0,
      capitalSurplus: null,
      cashChange: 12170000,
      cashFlow: 22422000,
      cashFlowFinancing: -20481000,
      changesInInventories: 0,
      changesInReceivables: 23916000,
      commonStock: 38368648,
      costOfRevenue: 0,
      currency: 'USD',
      currentAssets: 64826000,
      currentCash: 12170000,
      currentDebt: 10000000,
      currentLongTermDebt: 10000000,
      depreciation: 7644000,
      dividendsPaid: null,
      ebit: 14007000,
      EBITDA: 21651000,
      exchangeRateEffect: null,
      filingType: '10-Q',
      fiscalDate: '2022-07-31',
      fiscalQuarter: 3,
      fiscalYear: 2022,
      goodwill: 0,
      grossProfit: 35484000,
      incomeTax: 0,
      intangibleAssets: 0,
      interestIncome: 3186000,
      inventory: 0,
      investingActivityOther: null,
      investments: null,
      longTermDebt: 304315000,
      longTermInvestments: 925498000,
      minorityInterest: 63243000,
      netBorrowings: 273405000,
      netIncome: 6630000,
      netIncomeBasic: 6630000,
      netTangibleAssets: 354132000,
      operatingExpense: 21701000,
      operatingIncome: 13783000,
      operatingRevenue: 35484000,
      otherAssets: 8810000,
      otherCurrentAssets: 28740000,
      otherCurrentLiabilities: 9923000,
      otherIncomeExpenseNet: 0,
      otherLiabilities: 23711000,
      pretaxIncome: 10924000,
      propertyPlantEquipment: 888436000,
      receivables: 23916000,
      reportDate: '2022-09-08',
      researchAndDevelopment: 0,
      retainedEarnings: -177103000,
      revenue: 35484000,
      sellingGeneralAndAdmin: 2485000,
      shareholderEquity: 579132000,
      shortTermDebt: 10000000,
      shortTermInvestments: 28740000,
      symbol: 'UBA',
      totalAssets: 990324000,
      totalCash: 12170000,
      totalDebt: 314315000,
      totalInvestingCashFlows: -5664000,
      totalLiabilities: 411192000,
      totalRevenue: 35484000,
      treasuryStock: 0,
      id: 'FINANCIALS',
      key: 'UBA',
      subkey: 'quarterly',
      date: 1659225600000,
      updated: 1662822641000,
    },
  ][0];
  const fundamentalValuations = [
    {
      accountsPayableTurnover: 0,
      accountsReceivableTurnover: 1.85208316862993,
      altmanZScore: 0.3733094181699172,
      asOfDate: '2022-09-09',
      assetsToEquity: 10.403310348633944,
      assetTurnover: 0.04882670234659531,
      bbgCompositeTicker: 'AX US',
      bookValuePerShare: 27.60203150258353,
      cashConversionCycle: 197.075383104964,
      cik: '0001299709',
      companyName: 'Axos Financial Inc.',
      companyStatusCurrent: 'live',
      currentRatio: 1.0612075293916967,
      dataGenerationDate: '2022-09-09',
      dataType: 'ANNUAL',
      daysInAccountsPayable: 0,
      daysInInventory: 0,
      daysInRevenueDeferred: 0,
      daysRevenueOutstanding: 197.075383104964,
      debtToAssets: 0,
      debtToCapitalization: 0,
      debtToEbitda: 2.01,
      debtToEquity: 4.56,
      dividendPerShare: null,
      dividendYield: null,
      earningsYield: 0.10848110728370446,
      ebitdaGrowth: 0.105157533187618,
      ebitdaMargin: 0.4715550950664281,
      ebitdaReported: 364555000,
      ebitGrowth: 0.11191098406177737,
      ebitReported: 339959000,
      ebitToInterestExpense: null,
      ebitToRevenue: 0.43973995299389074,
      enterpriseValue: 2741903947.86,
      evToEbit: 8.065395967925545,
      evToEbitda: 7.521235335847815,
      evToFcf: 14.524488806216826,
      evToInvestedCapital: 2.446108301500993,
      evToNopat: 11.390617773060375,
      evToOcf: 13.039175715753132,
      evToSales: 3.546676843812695,
      expenseOperating: 414632000,
      fcfYield: 0.08662879481856557,
      figi: 'BBG000QPHD08',
      filingDate: '2022-09-08',
      filingType: '10-K',
      fiscalQuarter: 0,
      fiscalYear: 2022,
      fixedAssetTurnover: 1.1394908711436165,
      freeCashFlow: 188778000,
      freeCashFlowGrowth: -0.4520671648318397,
      freeCashFlowToRevenue: 0.24418600138922844,
      goodwillTotal: 156405000,
      incomeNetPerWabso: 4.04,
      incomeNetPerWabsoSplitAdjusted: 4.04404126858804,
      incomeNetPerWabsoSplitAdjustedYoyDeltaPercent: 0.111399150407989,
      incomeNetPerWadso: 3.97,
      incomeNetPerWadsoSplitAdjusted: 3.97149333765642,
      incomeNetPerWadsoSplitAdjustedYoyDeltaPercent: 0.115235070314584,
      incomeNetPreTax: 339959000,
      interestBurden: 1,
      interestMinority: 0,
      inventoryTurnover: 0,
      investedCapital: 1120925000,
      investedCapitalGrowth: 0.1871539442413357,
      investedCapitalTurnover: 0.6896902112094921,
      leverage: 10.403310348633944,
      marketCapPeriodEnd: 2179159947.86,
      netDebt: 562744000,
      netDebtToEbitda: 1.5436463633745252,
      netIncomeGrowth: 0.11691830844755424,
      netIncomeToRevenue: 0.31136826065754225,
      netWorkingCapital: 964520000,
      netWorkingCapitalGrowth: 0.16454167874046166,
      nibclRevenueDeferredTurnover: 0,
      nopat: 240715999.9999999,
      nopatGrowth: 0.11593967743281408,
      nopatMargin: 0.31136826065754214,
      operatingCashFlowGrowth: -0.4903267714054418,
      operatingCashFlowInterestCoverage: null,
      operatingCfToRevenue: 0.2720016142989635,
      operatingIncome: 339959000,
      operatingIncomeToRevenue: 0.43973995299389074,
      operatingReturnOnAssets: 0.02147105179473852,
      periodEndDate: '2022-06-30',
      ppAndENet: 0,
      preferredEquityToCapital: 0,
      pretaxIncomeMargin: 0.43973995299389074,
      priceAccountingPeriodEnd: 36.61,
      priceDateAccountingPeriodEnd: '2022-06-29',
      priceToRevenue: 2.8187625361826747,
      profitGrossToRevenue: 0.9760700874799992,
      pToBv: 1.3263516490289249,
      pToE: 9.05282551994882,
      quickRatio: 0.02648888908067626,
      researchDevelopmentToRevenue: 0,
      returnOnAssets: 0.0138333266766909,
      returnOnEquity: 3.239260648334761,
      revenueGrowth: 0.06909879909946293,
      roce: 0.20691697307259463,
      roic: 0.21474764145683245,
      scexhid: 7744712,
      secid: 232553,
      sgaToRevenue: 0.09109923670046605,
      stockExchange: 'NYSE',
      symbol: 'AX',
      taxBurden: 0.7080736206424892,
      ticker: 'AX',
      totalCapital: 1642973000,
      totalDebt: 0,
      updateReason: 'UPDATED_DATA',
      wabso: 59523626,
      wabsoSplitAdjusted: 59523626,
      wadso: 60610954,
      wadsoSplitAdjusted: 60610954,
      workingCapitalTurnover: 0.8624590017626453,
      id: 'FUNDAMENTAL_VALUATIONS',
      key: 'AX',
      subkey: 'annual',
      date: 1662595200000,
      updated: 1662822000000,
    },
  ][0];
  const basicStats = {
    companyName: 'Apple Inc.',
    marketcap: 760334287200,
    week52high: 156.65,
    week52low: 93.63,
    week52highSplitAdjustOnly: null,
    week52lowSplitAdjustOnly: null,
    week52change: 58.801903,
    sharesOutstanding: 5213840000,
    float: null,
    avg10Volume: 2774000,
    avg30Volume: 12774000,
    day200MovingAvg: 140.60541,
    day50MovingAvg: 156.49678,
    employees: 120000,
    ttmEPS: 16.5,
    ttmDividendRate: 2.25,
    dividendYield: 0.021,
    nextDividendDate: '2019-03-01',
    exDividendDate: '2019-02-08',
    nextEarningsDate: '2019-01-01',
    peRatio: 14,
    beta: 1.25,
    maxChangePercent: 153.021,
    year5ChangePercent: 0.5902546932200027,
    year2ChangePercent: 0.3777449874142869,
    year1ChangePercent: 0.39751716851558366,
    ytdChangePercent: 0.36659492036160124,
    month6ChangePercent: 0.12208398133748043,
    month3ChangePercent: 0.08466584665846649,
    month1ChangePercent: 0.009668596145283263,
    day30ChangePercent: -0.002762605699968781,
    day5ChangePercent: -0.005762605699968781,
  };
  const stats = {
    beta: 1.267996246422266, totalCash: 48981618381, currentDebt: 133856010226, revenue: 395450341513, grossProfit: 167923759171, totalRevenue: 400212785103, EBITDA: 130755761377, revenuePerShare: 24.99, revenuePerEmployee: 2743134.29, debtToEquity: 5.934928092420203, profitMargin: 0.26536198622976687, enterpriseValue: 2689356946897, enterpriseValueToRevenue: 6.82, priceToSales: 6.66, priceToBook: 44.49, forwardPERatio: 26.72806801835187, pegRatio: 1.4103624014190055, peHigh: 28.653984807623633, peLow: 14.55282251914132, week52highDate: '2021-12-31', week52lowDate: '2022-06-03', putCallRatio: 0.4688321027624213, companyName: 'Apple Inc', marketcap: 2563498285424, week52high: 188.81, week52low: 129.19, week52highSplitAdjustOnly: 191.33, week52highDateSplitAdjustOnly: '2021-12-31', week52lowSplitAdjustOnly: 131.44, week52lowDateSplitAdjustOnly: '2022-06-16', week52change: 0.0652808941399826, sharesOutstanding: 16672404808, float: null, avg10Volume: 79358572, avg30Volume: 71633086, day200MovingAvg: 158.53, day50MovingAvg: 171.05, employees: 147526, ttmEPS: 6.07, ttmDividendRate: 0.9077723002922429, dividendYield: 0.005878987352792016, nextDividendDate: null, exDividendDate: '', nextEarningsDate: '2022-10-21', peRatio: 26.064668035902226, maxChangePercent: 61.0443831275352, year5ChangePercent: 3.284713920088472, year2ChangePercent: 0.3719065153286917, year1ChangePercent: 0.02759725853439683, ytdChangePercent: -0.1131231889408295, month6ChangePercent: -0.03302000717424267, month3ChangePercent: 0.108734790890699, month1ChangePercent: -0.04673357401282659, day30ChangePercent: -0.0730086269997118, day5ChangePercent: 0.010109347928829398,
  };
  const nextDiv = {
    amount: 0.23,
    currency: 'USD',
    declaredDate: '2022-07-19',
    description: 's yraSindrearhO',
    exDate: '2022-07-23',
    flag: 'Cash',
    frequency: 'quarterly',
    paymentDate: '2022-08-09',
    recordDate: '2022-07-24',
    refid: 2760702,
    symbol: 'AAPL',
    id: 'IEDVIDDNS',
    key: 'PAAL',
    subkey: '2750165',
    date: 1659657600000,
    updated: 1697984825164,
  };
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
  const institutionalOwnership = [
    {
      adjustedHolding: 1768286969,
      adjustedMarketValue: 872500,
      entityProperName: 'Metatron Capital SICAV plc',
      id: '0001718013-22-000002',
      reportDate: '2021-12-31',
      reportedHolding: 1768286969,
      symbol: 'ABT',
      key: 'ABT',
      subkey: '0001718013-22-000002',
      date: 1662768000000,
      updated: 1662818270000,
    },
    {
      adjustedHolding: 176828446969,
      adjustedMarketValue: 8725020,
      entityProperName: 'Vanguard Group Inc',
      id: '0001718013-22-000002',
      reportDate: '2019-01-22',
      reportedHolding: 176828556969,
      symbol: 'ABT',
      key: 'ABT',
      subkey: '0001718013-22-000002',
      date: 1662768000000,
      updated: 1662818270000,
    },
    {
      adjustedHolding: 176828336969,
      adjustedMarketValue: 87222500,
      entityProperName: 'Morgan Stanley',
      id: '0001718013-22-000002',
      reportDate: '2022-09-11',
      reportedHolding: 1123768286969,
      symbol: 'ABT',
      key: 'ABT',
      subkey: '0001718013-22-000002',
      date: 1662768000000,
      updated: 1662818270000,
    },
  ];
  const peerGroup = [
    'MSFT',
    'NOK',
    'IBM',
    'BBRY',
    'HPQ',
    'GOOGL',
    'XLK',
    'AMD',
    'ENPH',
    'INTL',
    'BBY',
  ];
  const insiderSummary = [
    {
      date: '2022-09-11',
      fullName: 'Murphy Christopher',
      issuerCik: '0001411058',
      netTransacted: -2000000,
      reportedTitle: 'Director',
      symbol: 'AARS',
      totalBought: 0,
      totalSold: -2000000,
      id: 'INSIDER_SUMMARY',
      key: 'AARS',
      subkey: '0001411058',
      updated: 1662936479000,
    },
    {
      date: '2022-09-11',
      fullName: 'Todd Christopher',
      issuerCik: '00011212058',
      netTransacted: 2000000,
      reportedTitle: 'CFO',
      symbol: 'AARS',
      totalBought: 2000000,
      totalSold: 0,
      id: 'INSIDER_SUMMARY',
      key: 'AARS',
      subkey: '0001411058',
      updated: 1662936479000,
    },
    {
      date: '2022-09-11',
      fullName: 'Rand Burt',
      issuerCik: '000142422058',
      netTransacted: 500000,
      reportedTitle: 'CEO',
      symbol: 'AARS',
      totalBought: 2000000,
      totalSold: 1500000,
      id: 'INSIDER_SUMMARY',
      key: 'AARS',
      subkey: '0001411058',
      updated: 1662936479000,
    },
  ];
  const fundamentals = [
    {
      accountsPayable: 22074000,
      accountsPayableTurnover: 3.66422034973272,
      accountsReceivable: 37698000,
      accountsReceivableTurnover: 2.14557801474879,
      asOfDate: '2022-09-09',
      assetsCurrentCash: 197914000,
      assetsCurrentCashRestricted: 10000,
      assetsCurrentDeferredCompensation: 0,
      assetsCurrentDeferredTax: 0,
      assetsCurrentDiscontinuedOperations: 0,
      assetsCurrentInvestments: 0,
      assetsCurrentLeasesOperating: 0,
      assetsCurrentLoansNet: 0,
      assetsCurrentOther: 7138000,
      assetsCurrentSeparateAccounts: 0,
      assetsCurrentUnadjusted: 282863000,
      assetsFixed: 391557000,
      assetsFixedDeferredCompensation: 0,
      assetsFixedDeferredTax: 14159000,
      assetsFixedDiscontinuedOperations: 0,
      assetsFixedLeasesOperating: 10263000,
      assetsFixedOperatingDiscontinuedOperations: 0,
      assetsFixedOperatingSubsidiaryUnconsolidated: 0,
      assetsFixedOreo: 0,
      assetsFixedOther: 3504000,
      assetsFixedUnconsolidated: 0,
      assetsUnadjusted: 674420000,
      capex: -3387000,
      capexAcquisition: 0,
      capexMaintenance: 0,
      cashConversionCycle: 61.4991840166164,
      cashFlowFinancing: 1221000,
      cashFlowInvesting: -6359000,
      cashFlowOperating: -557000,
      cashFlowShareRepurchase: 0,
      cashLongTerm: 0,
      cashOperating: 0,
      cashPaidForIncomeTaxes: 661000,
      cashPaidForInterest: 0,
      cashRestricted: 0,
      chargeAfterTax: 0,
      chargeAfterTaxDiscontinuedOperations: 0,
      chargesAfterTaxOther: 0,
      cik: '0001280263',
      creditLossProvision: 0,
      dataGenerationDate: '2022-09-09',
      daysInAccountsPayable: 24.56184164977,
      daysInInventory: 44.6227931358489,
      daysInRevenueDeferred: 0.508506008604916,
      daysRevenueOutstanding: 41.9467385391425,
      debtFinancial: 0,
      debtShortTerm: 0,
      depreciationAndAmortizationAccumulated: 20756000,
      depreciationAndAmortizationCashFlow: 4687000,
      dividendsPreferred: 0,
      dividendsPreferredRedeemableMandatorily: 0,
      earningsRetained: 65400000,
      ebitdaReported: -15501000,
      ebitReported: -20188000,
      equityShareholder: 578111000,
      equityShareholderOther: 0,
      equityShareholderOtherDeferredCompensation: 0,
      equityShareholderOtherEquity: 0,
      equityShareholderOtherMezzanine: 0,
      expenses: 101098000,
      expensesAcquisitionMerger: 0,
      expensesCompensation: 0,
      expensesDepreciationAndAmortization: 0,
      expensesDerivative: 0,
      expensesDiscontinuedOperations: 0,
      expensesDiscontinuedOperationsReits: 0,
      expensesEnergy: 0,
      expensesForeignCurrency: 0,
      expensesInterest: 0,
      expensesInterestFinancials: 0,
      expensesInterestMinority: 0,
      expensesLegalRegulatoryInsurance: 0,
      expensesNonOperatingCompanyDefinedOther: 26000,
      expensesNonOperatingOther: 0,
      expensesNonOperatingSubsidiaryUnconsolidated: 0,
      expensesNonRecurringOther: 0,
      expensesOperating: 101072000,
      expensesOperatingOther: 0,
      expensesOperatingSubsidiaryUnconsolidated: 0,
      expensesOreo: 0,
      expensesOreoReits: 0,
      expensesOtherFinancing: 0,
      expensesRestructuring: 0,
      expensesSga: 18914000,
      expensesStockCompensation: 0,
      expensesWriteDown: 0,
      ffo: 0,
      figi: 'BBG001QZCPJ2',
      filingDate: '2022-09-08',
      filingType: '10-Q',
      fiscalQuarter: 2,
      fiscalYear: 2023,
      goodwillAmortizationCashFlow: 0,
      goodwillAmortizationIncomeStatement: 0,
      goodwillAndIntangiblesNetOther: 49563000,
      goodwillNet: 303625000,
      incomeFromOperations: -20188000,
      incomeNet: -23650000,
      incomeNetPerRevenue: -0.292394045793977,
      incomeNetPerWabso: -0.62,
      incomeNetPerWabsoSplitAdjusted: -0.618165853035813,
      incomeNetPerWabsoSplitAdjustedYoyDeltaPercent: -2.14806195545393,
      incomeNetPerWadso: -0.62,
      incomeNetPerWadsoSplitAdjusted: -0.618165853035813,
      incomeNetPerWadsoSplitAdjustedYoyDeltaPercent: -2.14806195545393,
      incomeNetPreTax: -20214000,
      incomeNetYoyDelta: -16494000,
      incomeOperating: 0,
      incomeOperatingDiscontinuedOperations: 0,
      incomeOperatingOther: 0,
      incomeOperatingSubsidiaryUnconsolidated: 0,
      incomeOperatingSubsidiaryUnconsolidatedAfterTax: 0,
      incomeTax: 3436000,
      incomeTaxCurrent: 0,
      incomeTaxDeferred: 0,
      incomeTaxDiscontinuedOperations: 0,
      incomeTaxOther: 3436000,
      incomeTaxRate: -0.169981201147719,
      interestMinority: 0,
      inventory: 40103000,
      inventoryTurnover: 2.01690646585044,
      liabilities: 674420000,
      liabilitiesCurrent: 77543000,
      liabilitiesNonCurrentAndInterestMinorityTotal: 18766000,
      liabilitiesNonCurrentDebt: 0,
      liabilitiesNonCurrentDeferredCompensation: 0,
      liabilitiesNonCurrentDeferredTax: 1551000,
      liabilitiesNonCurrentDiscontinuedOperations: 0,
      liabilitiesNonCurrentLeasesOperating: 7024000,
      liabilitiesNonCurrentLongTerm: 10191000,
      liabilitiesNonCurrentOperatingDiscontinuedOperations: 0,
      liabilitiesNonCurrentOther: 10191000,
      nibclDeferredCompensation: 0,
      nibclDeferredTax: 0,
      nibclDiscontinuedOperations: 0,
      nibclLeasesOperating: 3506000,
      nibclOther: 51506000,
      nibclRestructuring: 0,
      nibclRevenueDeferred: 457000,
      nibclRevenueDeferredTurnover: 176.989059080963,
      nibclSeparateAccounts: 0,
      oci: -2000,
      periodEndDate: '2022-07-31',
      ppAndENet: 10443000,
      pricePerEarnings: -140.010968860465,
      pricePerEarningsPerRevenueYoyDeltaPercent: -71.3336552780611,
      profitGross: 51064000,
      profitGrossPerRevenue: 0.631323871222986,
      reportDate: '2022-09-08',
      researchAndDevelopmentExpense: 52338000,
      reserves: 0,
      reservesInventory: 0,
      reservesLifo: 0,
      reservesLoanLoss: 0,
      revenue: 80884000,
      revenueCostOther: 29820000,
      revenueIncomeInterest: 0,
      revenueOther: 80884000,
      revenueSubsidiaryUnconsolidated: 0,
      salesCost: 29820000,
      sharesIssued: 38406451,
      sharesOutstandingPeDateBs: 0,
      sharesTreasury: 0,
      stockCommon: 512713000,
      stockPreferred: 0,
      stockPreferredEquity: 0,
      stockPreferredMezzanine: 0,
      stockTreasury: 0,
      symbol: 'AMBA',
      totalCashFlow: -5695000,
      wabso: 38258341,
      wabsoSplitAdjusted: 38258341,
      wadso: 38258341,
      wadsoSplitAdjusted: 38258341,
      id: 'FUNDAMENTALS',
      key: 'AMBA',
      subkey: 'quarterly',
      date: 1659225600000,
      updated: 1662908599000,
    },
  ][0];
  const news = [
    {
      datetime: 1663087125000,
      hasPaywall: false,
      headline: 'Apple And Goldman Sachs Have Very Different News Days',
      image: 'https://cloud.iexapis.com/v1/news/image/DRRa6XXqs1MZguYzjvgTN6xSJTo5JkqGxS6A3GW4CtM',
      imageUrl: 'https://cdn.benzinga.com/files/imagecache/1456x800/images/story/2022/09/13/shutterstock_206196790_2.jpg',
      lang: 'en',
      provider: 'CityFalcon',
      qmUrl: 'https://www.benzinga.com/markets/22/09/28852642/apple-and-goldman-sachs-have-very-different-news-days',
      related: 'AAPL,GS,GS-A,GS-C,GS-D,GS-J,GS-K,DJIA',
      source: 'Benzinga',
      summary: '(Tuesday Market Open) Equity index futures were pointing to a higher open before the Consumer Price Index (CPI) was released. And then what a change. Investors who convinced themselves that the CPI numbers were going to be softer and that the Federal Reserve was only going to hike the overnight rate just 50 basis points this month got a rude awakening. Potential Market Movers The CPI rose at a much hotter-than-expected 0.1% in August against the decline of 0.1% analysts forecasted. Year over year (YOY), CPI grew at a pace of 8.3%, similarly hotter than the forecasted 8.1%. Core CPI was projected to be 0.3% month over month and 6.1% YOY but came in at 0.6% and 6.3% respectively. Equity index futures flipped on the news as the Dow futures went from more than 250 points higher to 500 points lower. In Europe, inflation numbers were mixed with the Spanish CPI also coming in hotter than expected at a staggering 10.5% YOY and the German CPI coming in on target with 7.9%. Additionally, the German ZEW Economic Sentiment survey found that the German institutional investors were more negative than expected on the German economy.',
      symbol: 'AAPL',
      url: 'https://cloud.iexapis.com/v1/news/article/DRRa6XXqs1MZguYzjvgTN6xSJTo5JkqGxS6A3GW4CtM',
      uuid: 'DRRa6XXqs1MZguYzjvgTN6xSJTo5JkqGxS6A3GW4CtM',
      id: 'NEWS',
      key: 'AAPL',
      subkey: 'DRRa6XXqs1MZguYzjvgTN6xSJTo5JkqGxS6A3GW4CtM',
      date: 1663087125000,
      updated: 1663090760000,
    },
    {
      datetime: 1663085949000,
      hasPaywall: false,
      headline: 'Apple rolling out edit feature for iMessages in new iOS update',
      image: 'https://cloud.iexapis.com/v1/news/image/2aJuzhfcqoSeeDa7JtcMiV71pFVzSz1FYStZ7Hoqgv1I',
      imageUrl: 'https://media.socastsrm.com/wordpress/wp-content/blogs.dir/3041/files//2022/09/8039874280_2ab902e6eb_b.jpg',
      lang: 'en',
      provider: 'CityFalcon',
      qmUrl: 'https://www.ckbw.ca/2022/09/13/apple-rolling-out-edit-feature-for-imessages-in-new-ios-update/',
      related: 'AAPL',
      source: 'CKBW Radio',
      summary: "You can now edit iMessages if you''ve sent that cringy late night text. If you have an iPhone and have upgraded to iOS 16, you can now edit and even un…",
      symbol: 'AAPL',
      url: 'https://cloud.iexapis.com/v1/news/article/2aJuzhfcqoSeeDa7JtcMiV71pFVzSz1FYStZ7Hoqgv1I',
      uuid: '2aJuzhfcqoSeeDa7JtcMiV71pFVzSz1FYStZ7Hoqgv1I',
      id: 'NEWS',
      key: 'AAPL',
      subkey: '2aJuzhfcqoSeeDa7JtcMiV71pFVzSz1FYStZ7Hoqgv1I',
      date: 1663085949000,
      updated: 1663089580000,
    },
    {
      datetime: 1663085948000,
      hasPaywall: false,
      headline: 'Apple rolling out edit feature for iMessages in new iOS update',
      image: 'https://cloud.iexapis.com/v1/news/image/QaDCBHGt03yczHFztZE4guye5brvePmTc5cJqi778R5',
      imageUrl: 'https://media.socastsrm.com/wordpress/wp-content/blogs.dir/3041/files//2022/09/8039874280_2ab902e6eb_b.jpg',
      lang: 'en',
      provider: 'CityFalcon',
      qmUrl: 'https://www.thewave.ca/2022/09/13/apple-rolling-out-edit-feature-for-imessages-in-new-ios-update/',
      related: 'AAPL',
      source: 'The Wave',
      summary: "You can now edit iMessages if you''ve sent that cringy late night text. If you have an iPhone and have upgraded to iOS 16, you can now edit and even un…",
      symbol: 'AAPL',
      url: 'https://cloud.iexapis.com/v1/news/article/QaDCBHGt03yczHFztZE4guye5brvePmTc5cJqi778R5',
      uuid: 'QaDCBHGt03yczHFztZE4guye5brvePmTc5cJqi778R5',
      id: 'NEWS',
      key: 'AAPL',
      subkey: 'QaDCBHGt03yczHFztZE4guye5brvePmTc5cJqi778R5',
      date: 1663085948000,
      updated: 1663089580000,
    },
    {
      datetime: 1663085700000,
      hasPaywall: false,
      headline: "Apple''s Most-Shorted Status Is a Tell",
      image: 'https://cloud.iexapis.com/v1/news/image/xx8m4t2IFizkW02YGk3ebQgAQVBiP7seHo7Eg6A4cyi',
      imageUrl: 'https://s.thestreet.com/files/tsc/v2008/photos/contrib/uploads/4b15e83d-60eb-11eb-97e3-e32e4aa1fc64.jpg',
      lang: 'en',
      provider: 'CityFalcon',
      qmUrl: 'https://realmoney.thestreet.com/investing/stocks/apple-s-most-shorted-status-is-a-tell-16096685',
      related: 'AAPL,TSLA,TL0-GD,TL0-GS,TL0-GH,TL0-GM,TL0-GF,TL0-GB,TL0-GY,TL0-GI',
      source: 'The Street RealMoney',
      summary: 'The rationale behind a Tesla short is understandable. Apple is a different story entirely.',
      symbol: 'AAPL',
      url: 'https://cloud.iexapis.com/v1/news/article/xx8m4t2IFizkW02YGk3ebQgAQVBiP7seHo7Eg6A4cyi',
      uuid: 'xx8m4t2IFizkW02YGk3ebQgAQVBiP7seHo7Eg6A4cyi',
      id: 'NEWS',
      key: 'AAPL',
      subkey: 'xx8m4t2IFizkW02YGk3ebQgAQVBiP7seHo7Eg6A4cyi',
      date: 1663085700000,
      updated: 1663089300000,
    },
    {
      datetime: 1663085150000,
      hasPaywall: false,
      headline: 'Apple (NASDAQ:AAPL) – Netflix’s Squid Game Creates History At Emmy Awards — ‘Ted Lasso’ Wins Best Comedy Series For Apple TV+',
      image: 'https://cloud.iexapis.com/v1/news/image/2b73UTGJFGF9oTjtWIu8jVtBGsFiijS1UNSCqY29FKHK',
      imageUrl: '',
      lang: 'en',
      provider: 'CityFalcon',
      qmUrl: 'https://techtelegraph.co.uk/apple-nasdaqaapl-netflixs-squid-game-creates-history-at-emmy-awards-ted-lasso-wins-best-comedy-series-for-apple-tv/',
      related: 'AAPL,WBD',
      source: 'Techtelegraph',
      summary: 'Warner Bros. Discovery Inc. (WBD)-owned HBO had a rich haul at the 2022 Primetime Emmy Awards announced late on Monday, while Apple, Inc’s AAPL TV+ also made its presence felt at the event that recognizes the best artistical and technical talent in the television industry. What Happened: HBO’s smash hit “The White Lotus” won the best-limited […] The post Apple (NASDAQ:AAPL) – Netflix’s Squid Game Creates History At Emmy Awards — ‘Ted Lasso’ Wins Best Comedy Series For Apple TV+ appeared first on TECHTELEGRAPH .',
      symbol: 'AAPL',
      url: 'https://cloud.iexapis.com/v1/news/article/2b73UTGJFGF9oTjtWIu8jVtBGsFiijS1UNSCqY29FKHK',
      uuid: '2b73UTGJFGF9oTjtWIu8jVtBGsFiijS1UNSCqY29FKHK',
      id: 'NEWS',
      key: 'AAPL',
      subkey: '2b73UTGJFGF9oTjtWIu8jVtBGsFiijS1UNSCqY29FKHK',
      date: 1663085150000,
      updated: 1663088780000,
    },
    {
      datetime: 1663084800000,
      hasPaywall: false,
      headline: 'Apple’s (AAPL) iPhone 14 Satellite Feature Benefits MDA (TSX:MDA)',
      image: 'https://cloud.iexapis.com/v1/news/image/aisHmHGoDdKIE8tuXQzrvpLLcY3cFfFHHgVGXoJAaCj',
      imageUrl: 'https://www.fool.ca/wp-content/uploads/2019/02/Spacecraft.jpg',
      lang: 'en',
      provider: 'CityFalcon',
      qmUrl: 'https://www.fool.ca/2022/09/13/apples-aapl-iphone-14-satellite-feature-benefits-mda-tsxmda/',
      related: 'AAPL,MDA-CT',
      source: 'The Motley Fool Canada',
      summary: "Apple''s (NASDAQ:AAPL) iPhone 14 satellite emergency features are powered by units manufactured by MDA (TSX:MDA). The post Apple’s (AAPL) iPhone 14 Satellite Feature Benefits MDA (TSX:MDA) appeared first on The Motley Fool Canada .",
      symbol: 'AAPL',
      url: 'https://cloud.iexapis.com/v1/news/article/aisHmHGoDdKIE8tuXQzrvpLLcY3cFfFHHgVGXoJAaCj',
      uuid: 'aisHmHGoDdKIE8tuXQzrvpLLcY3cFfFHHgVGXoJAaCj',
      id: 'NEWS',
      key: 'AAPL',
      subkey: 'aisHmHGoDdKIE8tuXQzrvpLLcY3cFfFHHgVGXoJAaCj',
      date: 1663084800000,
      updated: 1663088400000,
    },
    {
      datetime: 1663084295000,
      hasPaywall: false,
      headline: 'Apple Stock: What Catalysts Should Investors Watch For After Apple Event? (NASDAQ:AAPL)',
      image: 'https://cloud.iexapis.com/v1/news/image/eyRQn5SHR9UmXVp4EQyTJYyoJVhr61KPk7N05842yR3',
      imageUrl: 'https://static.seekingalpha.com/cdn/s3/uploads/getty_images/1363326235/image_1363326235.jpg?io=getty-c-w750',
      lang: 'en',
      provider: 'CityFalcon',
      qmUrl: 'https://seekingalpha.com/article/4540682-apple-stock-what-catalysts-should-investors-watch-for?source=feed_f',
      related: 'AAPL',
      source: 'Seeking Alpha',
      summary: 'Apple unveiled new iPhone and Apple Watch models and came up with an updated version of the AirPods Pro at the recent event. See what this means for AAPL stock.',
      symbol: 'AAPL',
      url: 'https://cloud.iexapis.com/v1/news/article/eyRQn5SHR9UmXVp4EQyTJYyoJVhr61KPk7N05842yR3',
      uuid: 'eyRQn5SHR9UmXVp4EQyTJYyoJVhr61KPk7N05842yR3',
      id: 'NEWS',
      key: 'AAPL',
      subkey: 'eyRQn5SHR9UmXVp4EQyTJYyoJVhr61KPk7N05842yR3',
      date: 1663084295000,
      updated: 1663087920000,
    },
    {
      datetime: 1663084214000,
      hasPaywall: false,
      headline: "iPhone users say Apple''s new iOS 16 update is RUINING their battery life",
      image: 'https://cloud.iexapis.com/v1/news/image/3ND1me1z0K283kTSB3nSLIkuGLgN5i36H8DYicbR0ASF',
      imageUrl: 'https://i.dailymail.co.uk/1s/2022/07/26/10/55422163-0-image-m-15_1658828770288.jpg',
      lang: 'en',
      provider: 'CityFalcon',
      qmUrl: 'https://www.dailymail.co.uk/sciencetech/article-11206463/iPhone-users-say-Apples-new-iOS-16-update-RUINING-battery-life.html?ito=1490&ns_campaign=1490&ns_mchannel=rss',
      related: 'AAPL',
      source: 'Daily Mail Online',
      summary: 'While many iPhone users have eagerly downloaded the update already, several have reported that iOS 16 is affecting their battery life.',
      symbol: 'AAPL',
      url: 'https://cloud.iexapis.com/v1/news/article/3ND1me1z0K283kTSB3nSLIkuGLgN5i36H8DYicbR0ASF',
      uuid: '3ND1me1z0K283kTSB3nSLIkuGLgN5i36H8DYicbR0ASF',
      id: 'NEWS',
      key: 'AAPL',
      subkey: '3ND1me1z0K283kTSB3nSLIkuGLgN5i36H8DYicbR0ASF',
      date: 1663084214000,
      updated: 1663087841000,
    },
    {
      datetime: 1663083960000,
      hasPaywall: false,
      headline: 'Apple’s global phenomenon “Ted Lasso” joins ranks of the most celebrated comedies in history with back-to-back Emmy wins for Outstanding Comedy Series at the 74th Primetime Emmy Awards',
      image: 'https://cloud.iexapis.com/v1/news/image/bL7RbbDrwWUN0LWEkNxqmRZvqQq8H99ZPtq75eE12Md',
      imageUrl: 'http://mms.businesswire.com/media/20220913005794/en/1569743/21/TedLasso_212_01205F.jpg',
      lang: 'en',
      provider: 'CityFalcon',
      qmUrl: 'https://www.businesswire.com/news/home/20220913005794/en/Apple%E2%80%99s-global-phenomenon-%E2%80%9CTed-Lasso%E2%80%9D-joins-ranks-of-the-most-celebrated-comedies-in-history-with-back-to-back-Emmy-wins-for-Outstanding-Comedy-Series-at-the-74th-Primetime-Emmy-Awards/?feedref=JjAwJuNHiystnCoBq_hl-YChnX-dlxR7bnql9VXy9e5cS3CA0Bo2lHArOQl-PHrIrCOi9QzgjCezTS3Nw_X6kJUrpSBm-Hav1w-UkdSlG3k-cHwnfBrk8h_RXgEUlyPTLkaZDLiczsahzEklD3R10Q%3D%3D',
      related: 'AAPL',
      source: 'Business Wire',
      summary: 'CULVER CITY, Calif.--(BUSINESS WIRE)--At the 74th Primetime Emmy Awards, the beloved Apple TV+ hit series “Ted Lasso” joined the ranks of comedy legends with its win for Outstanding Comedy Series for its first and second seasons, becoming only the eighth series in the genre in 74 years of Emmy history to do so. The second season of “Ted Lasso” also became the most Emmy-winning comedy for the second year in a row with four total wins, including Emmy Awards for Outstanding Lead Actor in a Comedy',
      symbol: 'AAPL',
      url: 'https://cloud.iexapis.com/v1/news/article/bL7RbbDrwWUN0LWEkNxqmRZvqQq8H99ZPtq75eE12Md',
      uuid: 'bL7RbbDrwWUN0LWEkNxqmRZvqQq8H99ZPtq75eE12Md',
      id: 'NEWS',
      key: 'AAPL',
      subkey: 'bL7RbbDrwWUN0LWEkNxqmRZvqQq8H99ZPtq75eE12Md',
      date: 1663083960000,
      updated: 1663087580000,
    },
    {
      datetime: 1663083770000,
      hasPaywall: false,
      headline: 'Apple releases iOS and macOS fixes to patch a new zero-day under attack • TechCrunch',
      image: 'https://cloud.iexapis.com/v1/news/image/114NxH1FhT9g8B1exjxh2nxJ75gCGCpDcwTN1SC5tddX',
      imageUrl: 'https://i1.wp.com/techcrunch.com/wp-content/uploads/2022/09/GettyImages-1404252885.jpg?w=696&#038;ssl=1',
      lang: 'en',
      provider: 'CityFalcon',
      qmUrl: 'https://techtelegraph.co.uk/apple-releases-ios-and-macos-fixes-to-patch-a-new-zero-day-under-attack-techcrunch/',
      related: 'AAPL',
      source: 'Techtelegraph',
      summary: 'Apple has released another round of security updates to address vulnerabilities in iOS and macOS, including a new zero-day flaw that is being actively exploited by attackers. The zero-day flaw, tracked as CVE-2022-32917, allows a malicious app to run arbitrary code on an affected device with kernel privileges, Apple said in a security advisory on Monday, […] The post Apple releases iOS and macOS fixes to patch a new zero-day under attack • TechCrunch appeared first on TECHTELEGRAPH .',
      symbol: 'AAPL',
      url: 'https://cloud.iexapis.com/v1/news/article/114NxH1FhT9g8B1exjxh2nxJ75gCGCpDcwTN1SC5tddX',
      uuid: '114NxH1FhT9g8B1exjxh2nxJ75gCGCpDcwTN1SC5tddX',
      id: 'NEWS',
      key: 'AAPL',
      subkey: '114NxH1FhT9g8B1exjxh2nxJ75gCGCpDcwTN1SC5tddX',
      date: 1663083770000,
      updated: 1663087400000,
    },
  ];

  if (!stockSymbol) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      stockSymbol,
      company,
      quote,
      last4Dividends,
      financials,
      fundamentalValuations,
      fundamentals,
      stats,
      basicStats,
      nextDiv,
      insiderTrading,
      institutionalOwnership,
      insiderSummary,
      peerGroup,
      news,
    },
  };
}
