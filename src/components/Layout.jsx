import { Outlet } from 'react-router-dom'
import NavBar from './NavBar'

export default function Layout() {
  return (
    <div className="app-wrapper">
      <NavBar />
      <main className="main-content">
        <Outlet />
      </main>
      <footer className="footer">
        <p>CMP309 Web Programming — 2026</p>
      </footer>
    </div>
  )
}
