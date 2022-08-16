import { useSession, signIn, signOut } from "next-auth/react"
import Layout from '../main/node/components/layout'

export default function Index() {
  const { data: session } = useSession()
  if (session) {
    return (
      <Layout>
        Signed in as {session.user.email} <br />
        Access Token: {session.accessToken} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </Layout>
    )
  }
  return (
    <Layout>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </Layout>
  )
};