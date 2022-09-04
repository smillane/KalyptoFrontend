import { Table, Grid, SimpleGrid, Divider, Text, Container } from "@mantine/core";
import { IconPoint } from '@tabler/icons';

import Layout from "../../main/node/components/layout"
import Watchlist from "../../main/node/redux/features/userLists/Watchlist"

// if user is not logged in with an account, only show a basic quote and chart
export default function Stock({ stockSymbol, quote, advancedStats, insiderTrading }) {  
  return (
    <Layout>
      <h1>{stockSymbol.symbol}</h1>
      <Grid grow>
          <Grid.Col span={4}>
            <Container>
            <Text transform="capitalize" size="lg" weight={700}>Quote</Text>
            <Table>
              <tbody>
                {Object.entries(quote).map(
                    ([key, value]) =>
                      <tr key={key}>
                        <td><Text transform="capitalize">{key}</Text></td>
                        <td><Text transform="capitalize">{value}</Text></td>
                      </tr>
                  )}
              </tbody>
            </Table></Container>
          </Grid.Col>
          <Grid.Col span={4}>
            <Container>
            <Text transform="capitalize" size="lg" weight={700}>Advanced Stats</Text>
            <Table>
              <tbody>
                {Object.entries(advancedStats).map(
                    ([key, value]) =>
                      <tr key={key}>
                        <td><Text transform="capitalize">{key}</Text></td>
                        <td><Text transform="capitalize">{value}</Text></td>
                      </tr>
                  )}
              </tbody>
            </Table></Container>
          </Grid.Col>
          <Grid.Col span={4}><Container>
            <Text transform="capitalize" size="lg" weight={700}>Insider Trading</Text>
            
              
                {insiderTrading.map(it => 
                  <><Table key={it}>
                    <tbody> 
                      {Object.entries(it).map(
                      ([key, value]) =>
                        <tr key={key}>
                          <td><Text transform="capitalize">{key}</Text></td>
                          <td><Text transform="capitalize">{value}</Text></td>
                        </tr>
                      )}
                    </tbody>
                  </Table>
                  <Divider my="sm" /></>
                  )}
              
            </Container>
          </Grid.Col>
      </Grid>
      <Watchlist />
    </Layout>
  )
}

export async function getServerSideProps(context) {

  // const res = await fetch(`http://localhost:8080/stocks/${context.params.stock}/quote`)
  // const stockInformation = await res.json()
  const stockInfo = "test"
  const stockSymbol = {"symbol": `${context.params.stock}`}
  const quote = {"avgTotalVolume":68051839,"calculationPrice":"close","change":-2.22,"changePercent":-0.01417,"close":158.06,"closeSource":"acfiolfi","closeTime":1673421927830,"companyName":"Apple Inc","currency":"USD","delayedPrice":161.449,"delayedPriceTime":1667658149711,"extendedChange":-0.17,"extendedChangePercent":-0.00105,"extendedPrice":157.73,"extendedPriceTime":1707334287226,"high":163.5,"highSource":"ddti eu15nlemaeicpr y e","highTime":1664353583588,"iexAskPrice":null,"iexAskSize":null,"iexBidPrice":null,"iexBidSize":null,"iexClose":161.683,"iexCloseTime":1744171158299,"iexLastUpdated":null,"iexMarketPercent":null,"iexOpen":166.68,"iexOpenTime":1720689135893,"iexRealtimePrice":null,"iexRealtimeSize":null,"iexVolume":null,"lastTradeTime":1673675161659,"latestPrice":158.21,"latestSource":"Close","latestTime":"September 2, 2022","latestUpdate":1717848652005,"latestVolume":78728792,"low":158.06,"lowSource":"lnedm pcdutier y1i ae5e","lowTime":1687239843853,"marketCap":2594400687912,"oddLotDelayedPrice":157.33,"oddLotDelayedPriceTime":1710144377762,"open":163.5,"openTime":1709765099263,"openSource":"lfiiocfa","peRatio":26.67,"previousClose":164.27,"previousVolume":75991320,"primaryExchange":"ANSQDA","symbol":`${context.params.stock}`,"volume":77371178,"week52High":183.56,"week52Low":132.34,"ytdChange":-0.1326028502741089,"isUSMarketOpen":false}
  const advancedStats = {"companyName":"Apple Inc","marketcap":2589492523467,"week52high":190.37,"week52low":132.54,"week52highSplitAdjustOnly":190.01,"week52lowSplitAdjustOnly":132.82,"week52change":0.0158022070141329,"sharesOutstanding":16089132395,"float":0,"avg10Volume":76877469,"avg30Volume":68729232,"day200MovingAvg":157.1,"day50MovingAvg":167.5,"employees":148531,"ttmEPS":6.19,"ttmDividendRate":0.8985073960027097,"dividendYield":0.005975068065694612,"nextDividendDate":"","exDividendDate":"2022-08-05","nextEarningsDate":"2022-10-13","peRatio":25.65374342568991,"beta":1.2591629569187481,"maxChangePercent":60.79263780181754,"year5ChangePercent":3.069363110860276,"year2ChangePercent":0.2024766694057477,"year1ChangePercent":0.020108910073601636,"ytdChangePercent":-0.12053640846794468,"month6ChangePercent":-0.06218530383746557,"month3ChangePercent":0.03312673021951394,"month1ChangePercent":-0.0252192939653644,"day30ChangePercent":-0.06311858239415621,"day5ChangePercent":-0.0483139175240299}
  const insiderTrading = [{"conversionOrExercisePrice":null,"directIndirect":"D","effectiveDate":"2022-05-01","filingDate":"2022-05-04","fullName":"LBLEE SJ AMA","is10b51":false,"postShares":35292,"reportedTitle":null,"secAccessionNumber":"30-2031-000260920030","symbol":"AAPL","transactionCode":"G","transactionDate":"2022-04-27","transactionPrice":null,"transactionShares":-1295,"transactionValue":null,"id":"NTCAOERSNNIS_RIIADST","key":"ALPA","subkey":"-33020030060009-0122","date":1651795200000,"updated":1723669009735},{"conversionOrExercisePrice":null,"directIndirect":"D","effectiveDate":"2022-04-29","filingDate":"2022-05-06","fullName":"aaeLtsim.rKed A hn","is10b51":true,"postShares":486084,"reportedTitle":",SP a nrVctdea rSeCyG","secAccessionNumber":"60900023011300-2002-","symbol":"AAPL","transactionCode":"S","transactionDate":"2022-05-01","transactionPrice":163.79,"transactionShares":-9387,"transactionValue":1527216,"id":"NSATCEDNRNIASOII_RTS","key":"LPAA","subkey":"002100930-01223-0600","date":1651622400000,"updated":1718823274912}]

  if (!stockInfo) {
    return {
      notFound: true
    }
  }

  return { props: { stockSymbol, quote, advancedStats, insiderTrading } }
}