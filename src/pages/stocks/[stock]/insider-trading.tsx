import { Table, Divider, Text, Container } from "@mantine/core";

import Layout from "../../../main/node/components/layout";

export default function InsiderTrading({ stockSymbol, insiderTrading }) {
  console.log(insiderTrading)
  return (
    <Layout>
      <Container>
            <Text transform="capitalize" size="lg" weight={700}>Insider Trading for {stockSymbol.symbol}</Text>
              {insiderTrading.map(it => 
                <>
                  <Table key={it}>
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
                  <Divider my="sm" />
                </>
              )}
          </Container>
    </Layout>
  )
}

export async function getServerSideProps(context) {

  // const res = await fetch(`http://localhost:8080/stocks/${context.params.stock}/quote`)
  // const stockInformation = await res.json()
  const stockInfo = "test"
  const stockSymbol = {"symbol": `${context.params.stock}`}
  const insiderTrading = [{"conversionOrExercisePrice":null,"directIndirect":"D","effectiveDate":"2022-05-01","filingDate":"2022-05-04","fullName":"LBLEE SJ AMA","is10b51":false,"postShares":35292,"reportedTitle":null,"secAccessionNumber":"30-2031-000260920030","symbol":"AAPL","transactionCode":"G","transactionDate":"2022-04-27","transactionPrice":null,"transactionShares":-1295,"transactionValue":null,"id":"NTCAOERSNNIS_RIIADST","key":"ALPA","subkey":"-33020030060009-0122","date":1651795200000,"updated":1723669009735},{"conversionOrExercisePrice":null,"directIndirect":"D","effectiveDate":"2022-04-29","filingDate":"2022-05-06","fullName":"aaeLtsim.rKed A hn","is10b51":true,"postShares":486084,"reportedTitle":",SP a nrVctdea rSeCyG","secAccessionNumber":"60900023011300-2002-","symbol":"AAPL","transactionCode":"S","transactionDate":"2022-05-01","transactionPrice":163.79,"transactionShares":-9387,"transactionValue":1527216,"id":"NSATCEDNRNIASOII_RTS","key":"LPAA","subkey":"002100930-01223-0600","date":1651622400000,"updated":1718823274912}]

  if (!stockInfo) {
    return {
      notFound: true
    }
  }

  return { props: { stockSymbol, insiderTrading } }
}