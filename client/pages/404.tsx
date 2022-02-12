import Head from 'next/head'
import React from 'react'

const NotFound = () => {
  return (
    <>
      <Head>
        <title>404 | Polygon Matic Community Faucet</title>
        <meta
          name="title"
          content="404 | Polygon Matic Community Faucet"
        />{' '}
      </Head>
      <div className="flex flex-col items-center justify-center">
        The page you are looking for does not exist.
        <a
          href="/"
          className="mt-4 inline-flex w-full cursor-pointer select-none items-center rounded-md border border-solid border-transparent bg-blue-600 px-5 py-3 align-middle text-base font-semibold text-white no-underline focus-within:border-blue-700 focus-within:bg-blue-700 hover:border-blue-700 hover:bg-blue-700 hover:text-white sm:mb-0 sm:w-auto"
        >
          <svg
            className="mr-2 h-4 w-4 rotate-180 transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            ></path>
          </svg>
          Back Home
        </a>
      </div>
    </>
  )
}

export default NotFound
