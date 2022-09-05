import { Table, Space, Text, Container, Group, Title } from "@mantine/core";

import Layout from "../../../main/node/components/layout";

export default function Dividends({ stockSymbol, previousDividends }) {
  return (
    <Layout>
      <Container>
            <Title order={2} align="center" transform="capitalize">Previous Dividends for {stockSymbol.symbol}</Title>
            <Space h="md" />
                  <Table>
                    <thead>
                      <tr>
                        <th><Text transform="capitalize" size="lg" weight={700}>Payment Date</Text></th>
                        <th><Text transform="capitalize" size="lg" weight={700}>Ex Date</Text></th>
                        <th><Text transform="capitalize" size="lg" weight={700}>Amount</Text></th>
                        <th><Text transform="capitalize" size="lg" weight={700}>Payment Type</Text></th>
                        <th><Text transform="capitalize" size="lg" weight={700}>Frequency</Text></th>
                      </tr>
                    </thead>
                    <tbody>
                      {previousDividends.map(dividend => 
                      <tr key={dividend}>
                        <td><Text transform="capitalize">{dividend["paymentDate"]}</Text></td>
                        <td><Text transform="capitalize">{dividend["exDate"]}</Text></td>
                        <td>
                          <Group position="center">
                            <Text weight={600} transform="capitalize">{dividend["amount"]}</Text>
                            <Text transform="capitalize">{dividend["currency"]}</Text>
                          </Group>
                        </td>
                        <td><Text transform="capitalize">{dividend["flag"]}</Text></td>
                        <td><Text transform="capitalize">{dividend["frequency"]}</Text></td>
                      </tr>
                      )}
                    </tbody>
                  </Table>
          </Container>
    </Layout>
  )
}

export async function getServerSideProps(context) {

  // const res = await fetch(`http://localhost:8080/stocks/${context.params.stock}/quote`)
  // const stockInformation = await res.json()
  // set cache to not validate until the age is 24 hours - next day at time of update if after todays update, or 12-todays update time if before todays update, so will update max once a day
  // context.res.setHeader(
  //   'Cache-Control',
  //   'public, s-maxage=10, stale-while-revalidate=59'
  // )

  const stockInfo = "test"
  const stockSymbol = {"symbol": `${context.params.stock}`}
  const previousDividends = [{"amount":0.23,"currency":"USD","declaredDate":"2022-07-19","description":"s yraSindrearhO","exDate":"2022-07-23","flag":"Cash","frequency":"quarterly","paymentDate":"2022-08-09","recordDate":"2022-07-24","refid":2760702,"symbol":"AAPL","id":"IEDVIDDNS","key":"PAAL","subkey":"2750165","date":1659657600000,"updated":1697984825164},{"amount":0.24,"currency":"USD","declaredDate":"2022-04-23","description":" rdsriyhrSaanOe","exDate":"2022-04-25","flag":"Cash","frequency":"quarterly","paymentDate":"2022-04-30","recordDate":"2022-04-28","refid":2503278,"symbol":"AAPL","id":"VDIDIDNSE","key":"LAPA","subkey":"2541510","date":1651795200000,"updated":1711850314815.871},{"amount":0.22,"currency":"USD","declaredDate":"2022-01-19","description":"yeiraOdh snSrra","exDate":"2022-01-20","flag":"Cash","frequency":"quarterly","paymentDate":"2022-02-05","recordDate":"2022-02-05","refid":2435475,"symbol":"AAPL","id":"DDDNISVIE","key":"LAPA","subkey":"2465533","date":1643932800000,"updated":1687682435271.971},{"amount":0.23,"currency":"USD","declaredDate":"2021-10-18","description":"aOreyriShsrnad ","exDate":"2021-11-03","flag":"Cash","frequency":"quarterly","paymentDate":"2021-10-29","recordDate":"2021-11-08","refid":2354519,"symbol":"AAPL","id":"DEVDDINIS","key":"AALP","subkey":"2367189","date":1636070400000,"updated":1692854513488.657}]
  
  if (!stockInfo) {
    return {
      notFound: true
    }
  }

  return { props: { stockSymbol, previousDividends } }
}