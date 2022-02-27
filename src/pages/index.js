import { useUser } from '@auth0/nextjs-auth0';
import Link from 'next/link'

export default function Index() {
  const { user, error, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  if (user) {
    return (
      <div className="container">
        <main>
          <header />
          <h1>test</h1>
          <div>
            Welcome {user.name}! <Link href="/api/auth/logout">Logout</Link>
          </div>
          <layout />
        </main>
  
        <footer>
          <a>
            footer
          </a>
        </footer>
      </div>
    );
  }
  
  return (
    <div className="container">
      <main>
        <header />
        <h1>test</h1>
        <div>
          <Link href="/api/auth/login">Login</Link>
        </div>
        <layout />
      </main>

      <footer>
        <a>
          footer
        </a>
      </footer>
    </div>
    );
};