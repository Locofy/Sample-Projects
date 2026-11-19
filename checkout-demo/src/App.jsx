import { Routes, Route } from 'react-router-dom'
import Product from './pages/Product.jsx'
import BasicCheckout from './pages/BasicCheckout.jsx'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Product />} />
      <Route path="/checkout" element={<BasicCheckout />} />
    </Routes>
  )
}
