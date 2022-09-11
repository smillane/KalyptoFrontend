import Layout from "../main/node/components/layout"
import dailyChartData from "../../main/node/components/charts"

export default function Index({ data }) {
  return (
    <Layout>
      <p>"hi"</p>
    </Layout>
  );
};

export async function getServerSideProps() {
  data = dailyChartData("amd")

  return { props: { data }}
}