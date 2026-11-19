import { Routes, Route } from 'react-router-dom'
import Product from './pages/Product.jsx'
import BasicCheckout from './pages/BasicCheckout.jsx'
import Alternative from './pages/Alternative.jsx'
import PaymentFailedScreen from './components/checkout/PaymentFailedScreen.jsx'
import OrderTrackingScreen from './components/checkout/OrderTrackingScreen.jsx'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Product />} />
      <Route path="/checkout" element={<BasicCheckout />} />
      <Route path="/alternative" element={<Alternative />} />
      <Route path="/alternative/failed" element={<PaymentFailedScreen />} />
      <Route path="/alternative/tracking" element={<OrderTrackingScreen />} />
    </Routes>
  )
}
