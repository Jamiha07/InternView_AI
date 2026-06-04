import { useState } from 'react'
import { Nav } from './components.jsx'
import HomePage from './HomePage.jsx'
import SimulatorPage from './SimulatorPage.jsx'
import AboutPage from './AboutPage.jsx'

export default function App() {
  const [page, setPage] = useState('home')

  return (
    <div style={{ background: '#0D0D0D', fontFamily: 'var(--font-main)' }}>
      <Nav page={page} setPage={setPage} />
      {page === 'home'     && <HomePage     setPage={setPage} />}
      {page === 'simulate' && <SimulatorPage />}
      {page === 'about'    && <AboutPage />}
    </div>
  )
}
