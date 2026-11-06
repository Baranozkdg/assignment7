import { Outlet } from 'react-router-dom'
import NavBar from './NavBar'

export default function Layout({ theme, toggleTheme }) {
  return (
    <div className={`app-wrapper ${theme}`}>
      <NavBar theme={theme} toggleTheme={toggleTheme} />
      <main className="main-content">
        <Outlet />
      </main>
      <footer className="footer">
        <p>CMP309 Web Programming — 2026</p>
      </footer>
    </div>
  )
}
