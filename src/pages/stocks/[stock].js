import { Table, Grid, Title, Text, Container, Button, Stack, Space, Group, SimpleGrid } from "@mantine/core";
import Link from "next/link";
import { v4 as uuidv4 } from 'uuid';

import Layout from "../../main/node/components/layout"

function millionOrBillion(number) {
  return Math.abs(Number(number)) >= 1.0e+12
    ? (Math.abs(Number(number)) / 1.0e+12).toFixed(2) + " Trillion"
    : Math.abs(Number(number)) / 1.0e+9
      ? (Math.abs(Number(number)) / 1.0e+9).toFixed(2) + " Billion"
      : Math.abs(Number(number)) >= 1.0e+6
        ? (Math.abs(Number(number)) / 1.0e+6).toFixed(2) + " Million"
        : Math.abs(Number(number)) >= 1.0e+3
          ? (Math.abs(Number(number)) / 1.0e+3).toFixed(2) + " Thousand"
          : Math.abs(Number(number));
}

function greenOrRed(number) {
  return number >= 0 ? "green" : "red";
}

function typeOfTransaction(code) {
  return code === "P" ? "Purchase" : "S" ? "Sale" : A ? "Grant" : "D" ? "Sale to issuer" : "F" ? "Payment of exercise" : "I" ? "Discretionary" : "M" ? "Exercise/Conversion" : "C" ? "Conversion" : "E" ? "Expiration of short derivative position" : "H" ? "Expiration/Cancellation of long derivative position" : "O" ? "Exercise OOM" : "X" ? "Exercise ITM/ATM" : "G" ? "Gift" : "L" ? "Small acquisition" : "W" ? "Acquisition/Disposition by wills/laws" : "Z" ? "Deposit/Withdrawl from voting trust" : "J" ? "Other acquisition/disposition" : "K" ? "Transaction of equity swap" : "U" ? "Disposition due to tender of shares in change of control transaction" : code
}

function transactionColor(code) {
  return code === "P" ? "green" : "S" ? "red" : A ? "green" : "D" ? "red" : "F" ? "red" : "I" ? "red" : "M" ? "green" : "C" ? "green" : "E" ? "red" : "H" ? "red" : "O" ? "green" : "X" ? "green" : "G" ? "red" : "L" ? "green" : "W" ? "black" : "Z" ? "black" : "J" ? "black" : "K" ? "black" : "U" ? "red" : "black"
}

// if user is not logged in with an account, only show a basic quote and chart
export default function Stock({ stockSymbol, quote, advancedStats, previousDividends, nextDiv, insiderTrading, institutionalOwnership, peerGroup }) {
  return (
    <Layout>
      <Container>
        <Group>
          <Title order={1} transform="uppercase">{stockSymbol.symbol}</Title>
          <Title order={1} weight={100} transform="capitalize">{advancedStats["companyName"]}</Title>
        </Group>
        <Space h="sm" />
        <Group>
          <Title transform="capitalize" order={4}>{quote["latestPrice"]}</Title>
          <Title transform="capitalize" order={4} color={greenOrRed(quote["change"])}>{quote["change"]}</Title>
          <Title transform="capitalize" order={4} color={greenOrRed(quote["changePercent"])}>{(quote["changePercent"] * 100).toFixed(2)}%</Title>
        </Group>
        <Space h="lg" />
        <Grid>
          <Grid.Col xs={6} sm={4} md={4} lg={4}>
            <Table highlightOnHover sx={theme => ({
              boxShadow: theme.shadows.sm, borderRadius: theme.radius.sm, margin: "2px", background: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[1]
            })}>
              <tbody>
                <tr>
                  <td><Text transform="capitalize" weight={700}>Todays Volume</Text></td>
                  <td><Text transform="capitalize" align="right" weight={700}>{quote["volume"].toLocaleString()}</Text></td>
                </tr>
                <tr>
                  <td><Text transform="capitalize" weight={700}>Avg Volume</Text></td>
                  <td><Text transform="capitalize" align="right" weight={700}>{quote["avgTotalVolume"].toLocaleString()}</Text></td>
                </tr>
                <tr>
                  <td><Text transform="capitalize" weight={700}>Market Cap</Text></td>
                  <td><Text transform="capitalize" align="right" weight={700}>{millionOrBillion(quote["marketCap"])}</Text></td>
                </tr>
              </tbody>
            </Table>
            <Space h={2} />
            <Table highlightOnHover sx={theme => ({
              boxShadow: theme.shadows.sm, borderRadius: theme.radius.sm, margin: "2px", background: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[1]
            })}>
              <tbody>
                <tr>
                  <td><Text transform="capitalize" weight={700}>Next Earnings Date</Text></td>
                  <td><Text transform="capitalize" align="right" weight={700}>{advancedStats["nextEarningsDate"]}</Text></td>
                </tr>
                <tr>
                  <td><Text transform="capitalize" weight={700}>Dividend Yield</Text></td>
                  <td><Text transform="capitalize" align="right" weight={700}>{(advancedStats["dividendYield"] * 100).toFixed(2)} %</Text></td>
                </tr>
                <tr>
                  <td><Text transform="capitalize" weight={700}>PE Ratio</Text></td>
                  <td><Text transform="capitalize" align="right" weight={700}>{advancedStats["peRatio"].toFixed(2)}</Text></td>
                </tr>
                <tr>
                  <td><Text transform="capitalize" weight={700}>EPS</Text></td>
                  <td><Text transform="capitalize" align="right" weight={700}>{advancedStats["ttmEPS"]}</Text></td>
                </tr>
              </tbody>
            </Table>
          </Grid.Col>
          <Grid.Col xs={6} sm={4} md={4} lg={4}>
            <Table highlightOnHover sx={theme => ({
              boxShadow: theme.shadows.sm, borderRadius: theme.radius.sm, margin: "2px", background: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[1]
            })}>
              <tbody>
                <tr>
                  <td><Text transform="capitalize" weight={700}>52 week high</Text></td>
                  <td><Text transform="capitalize" align="right" weight={700}>{advancedStats["week52high"]}</Text></td>
                </tr>
                <tr>
                  <td><Text transform="capitalize" weight={700}>52 week low</Text></td>
                  <td><Text transform="capitalize" align="right" weight={700}>{advancedStats["week52low"]}</Text></td>
                </tr>
                <tr>
                  <td><Text transform="capitalize" weight={700}>52 week change</Text></td>
                  <td><Text transform="capitalize" weight={700} color={greenOrRed(advancedStats["week52change"])} align="right">{(advancedStats["week52change"] * 100).toLocaleString()} %</Text></td>
                </tr>
                <tr>
                  <td><Text transform="capitalize" weight={700}>YTD Change</Text></td>
                  <td><Text transform="capitalize" weight={700} color={greenOrRed(advancedStats["ytdChangePercent"])} align="right">{(advancedStats["ytdChangePercent"] * 100).toLocaleString()} %</Text></td>
                </tr>
              </tbody>
            </Table>
            <Space h={2} />
            <Table highlightOnHover sx={theme => ({
              boxShadow: theme.shadows.sm, borderRadius: theme.radius.sm, margin: "2px", background: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[1]
            })}>
              <tbody>
                <tr>
                  <td><Text transform="capitalize" weight={700}>52 week high</Text></td>
                  <td><Text transform="capitalize" align="right" weight={700}>{advancedStats["week52high"]}</Text></td>
                </tr>
                <tr>
                  <td><Text transform="capitalize" weight={700}>52 week low</Text></td>
                  <td><Text transform="capitalize" align="right" weight={700}>{advancedStats["week52low"]}</Text></td>
                </tr>
                <tr>
                  <td><Text transform="capitalize" weight={700}>52 week change</Text></td>
                  <td><Text transform="capitalize" weight={700} color={greenOrRed(advancedStats["week52change"])} align="right">{(advancedStats["week52change"] * 100).toLocaleString()} %</Text></td>
                </tr>
                <tr>
                  <td><Text transform="capitalize" weight={700}>YTD Change</Text></td>
                  <td><Text transform="capitalize" weight={700} color={greenOrRed(advancedStats["ytdChangePercent"])} align="right">{(advancedStats["ytdChangePercent"] * 100).toLocaleString()} %</Text></td>
                </tr>
              </tbody>
            </Table>
          </Grid.Col>
        </Grid>
        <Grid columns={1} gutter="xl" sx={{ margin: "2px" }}>
          <Grid.Col sx={theme => ({
            boxShadow: theme.shadows.sm, borderRadius: theme.radius.sm, margin: "2px", background: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[1]
          })}>
            <>
              <Link href={`/stocks/${stockSymbol.symbol}/dividends`} passHref>
                <Button variant="subtle" color="dark">
                  <Title order={3}>Dividends</Title>
                </Button>
              </Link>
              <Space h="md" />
              <Title order={5}>Next Dividend</Title>
              <Table highlightOnHover>
                <thead>
                  <tr>
                    <th><Title transform="capitalize" order={6}>Payment Date</Title></th>
                    <th><Title transform="capitalize" order={6}>Ex Date</Title></th>
                    <th><Title align="right" transform="capitalize" order={6}>Amount</Title></th>
                    <th><Title align="right" transform="capitalize" order={6}>Payment Type</Title></th>
                    <th><Title align="right" transform="capitalize" order={6}>Frequency</Title></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><Text transform="capitalize" weight={700}>{nextDiv["paymentDate"]}</Text></td>
                    <td><Text transform="capitalize" weight={700}>{nextDiv["exDate"]}</Text></td>
                    <td><Text align="right" transform="capitalize" weight={700}>{nextDiv["amount"]} {nextDiv["currency"]}</Text></td>
                    <td><Text align="right" transform="capitalize" weight={700}>{nextDiv["flag"]}</Text></td>
                    <td><Text align="right" transform="capitalize" weight={700}>{nextDiv["frequency"]}</Text></td>
                  </tr>
                </tbody>
              </Table>
              <Space h="sm" />
              <Title order={5}>Previous Dividends</Title>
              <Table highlightOnHover>
                <thead>
                  <tr>
                    <th><Title transform="capitalize" order={6}>Payment Date</Title></th>
                    <th><Title transform="capitalize" order={6}>Ex Date</Title></th>
                    <th><Title align="right" transform="capitalize" order={6}>Amount</Title></th>
                    <th><Title align="right" transform="capitalize" order={6}>Payment Type</Title></th>
                    <th><Title align="right" transform="capitalize" order={6}>Frequency</Title></th>
                  </tr>
                </thead>
                <tbody>
                  {previousDividends.map(dividend =>
                    <tr key={dividend["paymentDate"]}>
                      <td><Text transform="capitalize" weight={700}>{dividend["paymentDate"]}</Text></td>
                      <td><Text transform="capitalize" weight={700}>{dividend["exDate"]}</Text></td>
                      <td><Text align="right" transform="capitalize" weight={700}>{dividend["amount"]} {dividend["currency"]}</Text></td>
                      <td><Text align="right" transform="capitalize" weight={700}>{dividend["flag"]}</Text></td>
                      <td><Text align="right" transform="capitalize" weight={700}>{dividend["frequency"]}</Text></td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </>
          </Grid.Col>
          <Grid.Col sx={theme => ({
            boxShadow: theme.shadows.sm, borderRadius: theme.radius.sm, margin: "2px", background: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[1]
          })}>
            <>
              <Link href={`/stocks/${stockSymbol.symbol}/insider-trading`} passHref>
                <Button variant="subtle" color="dark">
                  <Title order={3}>Insider Trading</Title>
                </Button>
              </Link>
              <Space h="md" />
              <Table highlightOnHover>
                <thead>
                  <tr>
                    <th><Text transform="capitalize" size="lg" weight={700}>Insider</Text></th>
                    <th><Text transform="capitalize" size="lg" weight={700}>Transaction</Text></th>
                    <th><Text align="right" transform="capitalize" size="lg" weight={700}>Price Per Share</Text></th>
                    <th><Text align="right" transform="capitalize" size="lg" weight={700}>Total Value</Text></th>
                    <th><Text align="right" transform="capitalize" size="lg" weight={700}>Shares After</Text></th>
                  </tr>
                </thead>
                <tbody>
                  {insiderTrading.map(indTrade =>
                    <tr key={uuidv4()}>
                      <td>
                        <Stack spacing="xs">
                          <Text transform="capitalize" weight={700}>{indTrade["fullName"]}</Text>
                          <Text transform="capitalize" weight={500}>{indTrade["reportedTitle"]}</Text>
                        </Stack>
                      </td>
                      <td>
                        <Stack spacing="xs">
                          <Text transform="capitalize" color={transactionColor(indTrade["transactionCode"])} weight={700}>{typeOfTransaction(indTrade["transactionCode"])}</Text>
                          <Text transform="capitalize" weight={500}>{indTrade["transactionDate"]}</Text>
                        </Stack>
                      </td>
                      <td><Text align="right" transform="capitalize" weight={700}>${indTrade["transactionPrice"]}</Text></td>
                      <td><Text align="right" transform="capitalize" weight={700}>${indTrade["transactionValue"].toLocaleString()}</Text></td>
                      <td><Text align="right" transform="capitalize" weight={700}>{indTrade["postShares"].toLocaleString()}</Text></td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </>
          </Grid.Col>
          <Grid.Col sx={theme => ({
            boxShadow: theme.shadows.sm, borderRadius: theme.radius.sm, margin: "2px", background: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[1]
          })}>
            <>
              <Title order={3}>Insitutional Ownership</Title>
              <Space h="md" />
              <Table highlightOnHover>
                <thead>
                  <tr>
                    <th><Text transform="capitalize" size="lg" weight={700}>Filing Date</Text></th>
                    <th><Text transform="capitalize" size="lg" weight={700}>Shareholder</Text></th>
                    <th><Text align="right" transform="capitalize" size="lg" weight={700}>Total Shares</Text></th>
                    <th><Text align="right" transform="capitalize" size="lg" weight={700}>Value</Text></th>
                  </tr>
                </thead>
                <tbody>
                  {institutionalOwnership.map(institution =>
                    <tr key={institution["entityProperName"]}>
                      <td>
                        <Text transform="capitalize" weight={700}>{institution["filingDate"]}</Text>
                      </td>
                      <td>
                        <Text transform="capitalize" weight={700}>{institution["entityProperName"]}</Text>
                      </td>
                      <td>
                        <Text align="right" transform="capitalize" weight={700}>{(institution["adjHolding"]).toLocaleString()}</Text>
                      </td>
                      <td>
                        <Text align="right" transform="capitalize" weight={700}>${(institution["adjMv"]).toLocaleString()}</Text>
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </>
          </Grid.Col>
          <Grid.Col sx={theme => ({
            boxShadow: theme.shadows.sm, borderRadius: theme.radius.sm, margin: "2px", background: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[1]
          })}>
            <Title order={4}>People also viewed</Title>
            <Space h="md" />
            <SimpleGrid breakpoints={[
              { minWidth: 0, cols: 3 },
              { minWidth: 'xs', cols: 4 },
              { minWidth: 'sm', cols: 4 },
              { minWidth: 'md', cols: 6 },
              { minWidth: 1200, cols: 8 }]}
            >
              {peerGroup.map(it =>
                <Link href={`/stocks/${it}`} key={it}><Button variant="outline" color="dark">{it}</Button></Link>
              )}
            </SimpleGrid>
          </Grid.Col>
        </Grid>
      </Container>
    </Layout>
  )
}

export async function getServerSideProps(context) {

  // const res = await Promise.all(fetch(`http://localhost:8080/stocks/${context.params.stock}/quote`))
  // const stockInformation = await res.json()
  // context.res.setHeader(
  //   'Cache-Control',
  //   'public, s-maxage=300, stale-while-revalidate=300'
  // )

  const stockInfo = "test"
  const stockSymbol = { "symbol": `${context.params.stock}`, "Latest Price": 162 }
  const quote = { "avgTotalVolume": 68051839, "calculationPrice": "close", "change": -2.22, "changePercent": 0.01417, "close": 158.06, "closeSource": "acfiolfi", "closeTime": 1673421927830, "companyName": "Apple Inc", "currency": "USD", "delayedPrice": 161.449, "delayedPriceTime": 1667658149711, "extendedChange": -0.17, "extendedChangePercent": -0.00105, "extendedPrice": 157.73, "extendedPriceTime": 1707334287226, "high": 163.5, "highSource": "ddti eu15nlemaeicpr y e", "highTime": 1664353583588, "iexAskPrice": null, "iexAskSize": null, "iexBidPrice": null, "iexBidSize": null, "iexClose": 161.683, "iexCloseTime": 1744171158299, "iexLastUpdated": null, "iexMarketPercent": null, "iexOpen": 166.68, "iexOpenTime": 1720689135893, "iexRealtimePrice": null, "iexRealtimeSize": null, "iexVolume": null, "lastTradeTime": 1673675161659, "latestPrice": 158.21, "latestSource": "Close", "latestTime": "September 2, 2022", "latestUpdate": 1717848652005, "latestVolume": 78728792, "low": 158.06, "lowSource": "lnedm pcdutier y1i ae5e", "lowTime": 1687239843853, "marketCap": 2594400687912, "oddLotDelayedPrice": 157.33, "oddLotDelayedPriceTime": 1710144377762, "open": 163.5, "openTime": 1709765099263, "openSource": "lfiiocfa", "peRatio": 26.67, "previousClose": 164.27, "previousVolume": 75991320, "primaryExchange": "ANSQDA", "symbol": `${context.params.stock}`, "volume": 77371178, "week52High": 183.56, "week52Low": 132.34, "ytdChange": -0.1326028502741089, "isUSMarketOpen": false }
  const advancedStats = { "companyName": "Apple Inc", "marketcap": 2589492523467, "week52high": 190.37, "week52low": 132.54, "week52highSplitAdjustOnly": 190.01, "week52lowSplitAdjustOnly": 132.82, "week52change": 0.0158022070141329, "sharesOutstanding": 16089132395, "float": 0, "avg10Volume": 76877469, "avg30Volume": 68729232, "day200MovingAvg": 157.1, "day50MovingAvg": 167.5, "employees": 148531, "ttmEPS": 6.19, "ttmDividendRate": 0.8985073960027097, "dividendYield": 0.005975068065694612, "nextDividendDate": "", "exDividendDate": "2022-08-05", "nextEarningsDate": "2022-10-13", "peRatio": 25.65374342568991, "beta": 1.2591629569187481, "maxChangePercent": 60.79263780181754, "year5ChangePercent": 3.069363110860276, "year2ChangePercent": 0.2024766694057477, "year1ChangePercent": 0.020108910073601636, "ytdChangePercent": -0.12053640846794468, "month6ChangePercent": -0.06218530383746557, "month3ChangePercent": 0.03312673021951394, "month1ChangePercent": -0.0252192939653644, "day30ChangePercent": -0.06311858239415621, "day5ChangePercent": -0.0483139175240299 }
  const previousDividends = [{ "amount": 0.23, "currency": "USD", "declaredDate": "2022-07-19", "description": "s yraSindrearhO", "exDate": "2022-07-23", "flag": "Cash", "frequency": "quarterly", "paymentDate": "2022-08-09", "recordDate": "2022-07-24", "refid": 2760702, "symbol": "AAPL", "id": "IEDVIDDNS", "key": "PAAL", "subkey": "2750165", "date": 1659657600000, "updated": 1697984825164 }, { "amount": 0.24, "currency": "USD", "declaredDate": "2022-04-23", "description": " rdsriyhrSaanOe", "exDate": "2022-04-25", "flag": "Cash", "frequency": "quarterly", "paymentDate": "2022-04-30", "recordDate": "2022-04-28", "refid": 2503278, "symbol": "AAPL", "id": "VDIDIDNSE", "key": "LAPA", "subkey": "2541510", "date": 1651795200000, "updated": 1711850314815.871 }, { "amount": 0.22, "currency": "USD", "declaredDate": "2022-01-19", "description": "yeiraOdh snSrra", "exDate": "2022-01-20", "flag": "Cash", "frequency": "quarterly", "paymentDate": "2022-02-05", "recordDate": "2022-02-05", "refid": 2435475, "symbol": "AAPL", "id": "DDDNISVIE", "key": "LAPA", "subkey": "2465533", "date": 1643932800000, "updated": 1687682435271.971 }, { "amount": 0.23, "currency": "USD", "declaredDate": "2021-10-18", "description": "aOreyriShsrnad ", "exDate": "2021-11-03", "flag": "Cash", "frequency": "quarterly", "paymentDate": "2021-10-29", "recordDate": "2021-11-08", "refid": 2354519, "symbol": "AAPL", "id": "DEVDDINIS", "key": "AALP", "subkey": "2367189", "date": 1636070400000, "updated": 1692854513488.657 }]
  const insiderTrading = [{ "conversionOrExercisePrice": null, "directIndirect": "D", "effectiveDate": "2022-05-01", "filingDate": "2022-05-04", "fullName": "LBLEE SJ AMA", "is10b51": false, "postShares": 35292, "reportedTitle": "President", "secAccessionNumber": "30-2031-000260920030", "symbol": "AAPL", "transactionCode": "G", "transactionDate": "2022-04-27", "transactionPrice": null, "transactionShares": -1295, "transactionValue": 125125222, "id": "NTCAOERSNNIS_RIIADST", "key": "ALPA", "subkey": "-33020030060009-0122", "date": 1651795200000, "updated": 1723669009735 }, { "conversionOrExercisePrice": null, "directIndirect": "D", "effectiveDate": "2022-04-29", "filingDate": "2022-05-06", "fullName": "aaeLtsim.rKed A hn", "is10b51": true, "postShares": 486084, "reportedTitle": "CEO and Director", "secAccessionNumber": "60900023011300-2002-", "symbol": "AAPL", "transactionCode": "S", "transactionDate": "2022-05-01", "transactionPrice": 163.79, "transactionShares": -9387, "transactionValue": 1527216, "id": "NSATCEDNRNIASOII_RTS", "key": "LPAA", "subkey": "002100930-01223-0600", "date": 1651622400000, "updated": 1718823274912 }]
  const institutionalOwnership = [
    {
      "symbol": "AAPL",
      "id": "0001104659-20-095098",
      "adjHolding": 1315961000,
      "adjMv": 120015645,
      "entityProperName": "VANGUARD GROUP INC",
      "reportDate": 1593475200000,
      "filingDate": "2020-06-30",
      "reportedHolding": 328990250,
      "date": 1606608000000,
      "updated": 1606622415000
    },
    {
      "symbol": "AAPL",
      "id": "00011044429-20-095098",
      "adjHolding": 13151251261000,
      "adjMv": 1162015645,
      "entityProperName": "Silver Lake",
      "reportDate": 15261475200000,
      "filingDate": "2019-06-30",
      "reportedHolding": 2448990250,
      "date": 1606608000011,
      "updated": 1606622415011
    }
  ]
  const peerGroup = [
    "MSFT",
    "NOK",
    "IBM",
    "BBRY",
    "HPQ",
    "GOOGL",
    "XLK",
    "AMD",
    "ENPH",
    "INTL",
    "BBY",
    "GS",
    "JPM",
    "XLF",
    "GOOG",
    "META",
    "NVDA",
    "PLTR",
    "SPY",
    "QQQ"
  ]
  const nextDiv = {
    "amount": 0.23,
    "currency": "USD",
    "declaredDate": "2022-07-19",
    "description": "s yraSindrearhO",
    "exDate": "2022-07-23",
    "flag": "Cash",
    "frequency": "quarterly",
    "paymentDate": "2022-08-09",
    "recordDate": "2022-07-24",
    "refid": 2760702,
    "symbol": "AAPL",
    "id": "IEDVIDDNS",
    "key": "PAAL",
    "subkey": "2750165",
    "date": 1659657600000,
    "updated": 1697984825164
  }

  if (!stockInfo) {
    return {
      notFound: true
    }
  }

  return { props: { stockSymbol, quote, advancedStats, previousDividends, nextDiv, insiderTrading, institutionalOwnership, peerGroup } }
}