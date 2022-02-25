import nav from './nav'
import meta from './meta'
import header from './header'

const layout = ({ children }) => {
  return (
    <>
      <meta />
      <nav />
      <div className={styles.container}>
        <main className={styles.main}>
          <header />
          {children}
        </main>
      </div>
    </>
  )
}

export default layout