import { Routes, Route } from 'react-router-dom'
import './App.css'

function Home() {
  return (
    <div style={{ padding: '40px', textAlign: 'center' }}>
      <h1>React Shop</h1>
      <p>Home page placeholder</p>
    </div>
  )
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  )
}
