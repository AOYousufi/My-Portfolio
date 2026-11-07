import { createContext, useContext, useState, useEffect } from 'react'

const ThemeContext = createContext(null)

function readSavedTheme() {
  try {
    return localStorage.getItem('ay-theme') === 'light' ? 'light' : 'dark'
  } catch {
    // Browsers may deny storage access in privacy-restricted contexts.
    return 'dark'
  }
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(readSavedTheme)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    try {
      localStorage.setItem('ay-theme', theme)
    } catch {
      // Keep the selected theme usable even when it cannot be persisted.
    }
  }, [theme])

  const toggleTheme = () => setTheme(t => (t === 'dark' ? 'light' : 'dark'))

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  return useContext(ThemeContext)
}
