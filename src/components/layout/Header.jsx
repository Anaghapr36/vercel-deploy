import { useState, useEffect } from "react"

function Header({ onThemeChange }) {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    // Check for saved theme preference or default to system preference
    const savedTheme = localStorage.getItem("theme")
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
    const shouldBeDark = savedTheme ? savedTheme === "dark" : prefersDark
    
    setIsDark(shouldBeDark)
    if (onThemeChange) onThemeChange(shouldBeDark)
  }, [onThemeChange])

  const toggleTheme = () => {
    const newTheme = !isDark
    setIsDark(newTheme)
    localStorage.setItem("theme", newTheme ? "dark" : "light")
    if (onThemeChange) onThemeChange(newTheme)
  }

  return (
    <header className="app-header">
      <div className="header-content">
        <div>
          <h1>📊 Stock Market Dashboard</h1>
          <p>Track news, manage your portfolio, and analyze market sentiment</p>
        </div>
        <button className="theme-toggle" onClick={toggleTheme} title="Toggle dark/light mode">
          {isDark ? "☀️ Light" : "🌙 Dark"}
        </button>
      </div>
    </header>
  )
}

export default Header
