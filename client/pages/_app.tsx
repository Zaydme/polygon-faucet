import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ToastContainer } from 'react-toastify'
import ThemeSwitch from '../components/ThemeSwitch'
import Head from 'next/head'
import GithubCorner from '../components/GithubCorner'
import PolygonScan from '../components/PolygonScan'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.png" />
        <meta
          name="description"
          content="Polygon Matic community run faucet, no ads, no BS."
        />
        <meta
          name="keywords"
          content="matic, faucet, polygon network, ad free, free matic, crypto, ethereum, polygon matic"
        />
        <meta name="robots" content="index, follow" />
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="language" content="English" />
        <meta name="revisit-after" content="1 days" />
        <meta name="author" content="Zayd" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://matic.btn.sh/" />
        <meta property="og:title" content="Polygon Matic Community Faucet" />
        <meta
          property="og:description"
          content="Polygon Matic community run faucet, no ads, no BS."
        />
        <meta property="og:image" content="/banner.png" />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://matic.btn.sh/" />
        <meta
          property="twitter:title"
          content="Polygon Matic Community Faucet"
        />
        <meta
          property="twitter:description"
          content="Polygon Matic community run faucet, no ads, no BS."
        />
        <meta property="twitter:image" content="/banner.png" />
      </Head>
      <GithubCorner repository={'https://github.com/zaydme/polygon-faucet'} />
      <ThemeSwitch />
      <ToastContainer hideProgressBar={true} />
      <main
        className={`flex min-h-screen flex-col items-center justify-center bg-white py-2 dark:bg-slate-900 dark:text-white`}
      >
        <Component {...pageProps} />
      </main>

      <footer
        className={`fixed bottom-2 left-0 flex w-full flex-col items-center justify-center space-y-2 text-xs text-gray-500`}
      >
        <div>
          Made with ♡ by
          <a className="ml-1 text-purple-600 dark:text-lime-400">Zayd</a>
        </div>
        <p className="flex">
          <span className="mr-1">Developer donations ♥</span>
          <PolygonScan address={'0xE140C1730333F39d4dad43dA1ed9144E7B991f2C'} />
        </p>
      </footer>
    </>
  )
}

export default MyApp
