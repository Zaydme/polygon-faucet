import React, { useEffect, useState } from 'react'

const ThemeSwitch = () => {
  const [theme, setTheme] = useState('dark')

  useEffect(() => {
    const localTheme = localStorage.getItem('theme')
    if (localTheme) {
      setTheme(localTheme)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('theme', theme)
    if (theme === 'light') {
      document.body.classList.remove('dark')
    } else {
      document.body.classList.add('dark')
    }
  }, [theme])

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  return (
    <div
      className="flex cursor-pointer items-center justify-center absolute top-4 left-1/2 transform -translate-x-1/2"
      onClick={toggleTheme}
    >
      <span className={`${theme === 'light'? 'text-yellow-400':'text-gray-500'}`}>
        <svg
          className="h-6 w-6 "
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
      </span>

      <div
        className={`mx-3 flex h-7 w-14 items-center rounded-full bg-gray-300 px-1 transition-colors duration-200 ${
          theme === 'light' ? 'bg-cyan-400' : 'bg-gray-700'
        }`}
      >
        <div
          className={`h-5 w-5 transform rounded-full bg-white shadow-md transition-transform duration-200 ${
            theme === 'dark' && 'translate-x-7'
          }`}
        ></div>
      </div>
      <span className={`${theme === 'dark'? 'text-white':'text-gray-400'}`}>
        <svg
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
          />
        </svg>
      </span>
    </div>
  )
}

export default ThemeSwitch
