import { Routes, Route } from 'react-router-dom'
import Product from './pages/Product.jsx'
import BasicCheckout from './pages/BasicCheckout.jsx'
import Alternative from './pages/Alternative.jsx'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Product />} />
      <Route path="/checkout" element={<BasicCheckout />} />
      <Route path="/alternative" element={<Alternative />} />
    </Routes>
  )
}
