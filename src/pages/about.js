import { LineChart } from "recharts";

import Layout from "../main/node/components/layout"
import getChartData from "../main/node/components/charts"

export default function Index({ data }) {
  return (
    <Layout>
      <LineChart
        width={400}
        height={400}
        data={data}
        margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
      >
        <XAxis dataKey="Price" />
        <Tooltip />
        <CartesianGrid stroke="#f5f5f5" />
        <Line type="monotone" stroke="#ff7300" yAxisId={0} />
      </LineChart>
    </Layout>
  );
};

export async function getServerSideProps() {
  const data = getChartData("amd", "years", 1, "d");

  return { props: { data }}
}