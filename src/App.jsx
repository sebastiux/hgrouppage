import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import CategoryPage from './pages/CategoryPage'

function App() {
  const [theme, setTheme] = useState('light')
  const [language, setLanguage] = useState('en')

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <Layout 
            theme={theme} 
            setTheme={setTheme}
            language={language}
            setLanguage={setLanguage}
          />
        } />
        <Route path="/:category" element={
          <CategoryPage />
        } />
      </Routes>
    </Router>
  )
}

export default App