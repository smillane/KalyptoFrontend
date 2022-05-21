import { useRouter } from "next/router";

// if user is not logged in with an account, only show a basic quote and chart
export default function Stock({apiData}) {
  const router = useRouter();
  
  return (
    <div>
      <h1>{router.query.stock}</h1>
    </div>
  )
}

export async function getServerSideProps(context) {

  if (TODO()) {
    return {
      notFound: true
    }
  }

  return { props: {} }
}
  