// Sample data used as default props, so every component renders
// fully filled in on its own (handy for previewing in hexby).
import { product } from '../../product'

const tax = +(product.price * 0.0875).toFixed(2)

export const sampleOrder = {
  id: 'AR-48213',
  product: { ...product, variant: 'Midnight Black', qty: 1 },
  subtotal: product.price,
  shipping: 0,
  tax,
  total: +(product.price + tax).toFixed(2),
  currency: 'USD',
  eta: 'Arrives in 3–5 business days',
  perks: ['30-day free returns', '2-year warranty included', 'Carbon-neutral delivery'],
}

export const sampleCustomer = {
  email: 'alex@aero.co',
  card: '4242424242424242',
  exp: '1228',
  cvc: '314',
  name: 'Alex Morgan',
  country: 'US',
  zip: '94107',
}

export const sampleTracking = [
  { label: 'Order placed', detail: 'Nov 19, 4:12 PM', done: true },
  { label: 'Packed', detail: 'Nov 20, 9:40 AM · San Francisco, CA', done: true },
  { label: 'In transit', detail: 'Nov 21 · Oakland sorting facility', done: true, current: true },
  { label: 'Out for delivery', detail: 'Expected Nov 24' },
  { label: 'Delivered', detail: '' },
]

export const money = n => `$${Number(n).toFixed(2)}`
