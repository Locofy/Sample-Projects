import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { product } from '../product'
import { useDemo } from '../demo'
import { Header } from './Layout'

const fields = [
  ['email', 'Email Address *', true],
  ['card', 'Card Number *', true],
  ['exp', 'Expiry (MM/YY) *'],
  ['cvc', 'CVV *'],
  ['name', 'Name on Card *', true],
]

export default function BasicCheckout() {
  const ref = useRef(null)
  const [errors, setErrors] = useState([])
  const [done, setDone] = useState(false)
  useDemo(ref, { speed: 14 })
  const tax = (product.price * 0.0875).toFixed(2)
  const total = (product.price + 12.99 + 4.99 + +tax).toFixed(2)

  const submit = e => {
    e.preventDefault()
    const f = new FormData(e.target)
    const missing = []
    fields.forEach(([k, l]) => { if (!f.get(k)) missing.push(l.replace(' *', '')) })
    if (!f.get('zip')) missing.push('ZIP Code')
    if (!f.get('terms')) missing.push('You must accept the Terms & Conditions')
    setErrors(missing)
    if (!missing.length) setDone(true)
    window.scrollTo(0, 0)
  }

  if (done) return (
    <div className="co">
      <Header />
      <div className="co-wrap">
        <div className="co-card co-confirm">
          <h3>Order Received</h3>
          <p>Thank you for your order. Your order number is <b>100048213</b>.</p>
          <p className="co-note">You will receive an email confirmation shortly. Please allow 24–48 hours for processing. Do not refresh this page.</p>
          <p className="co-note">Total charged: ${total}</p>
          <Link to="/" className="co-btn primary">Continue Shopping</Link>
        </div>
      </div>
    </div>
  )

  return (
    <div className="co">
      <Header />
      <div className="co-banner">🎉 Use code SAVE5 for 5% off orders over $500 · Limited time only!</div>
      <div className="co-wrap">
        <div className="co-steps"><span>Cart</span>›<span className="on">Checkout</span>›<span>Confirmation</span></div>
        <div className="co-grid">
          <form ref={ref} className="co-card" onSubmit={submit} noValidate>
            <h3>Payment Details</h3>
            {errors.length > 0 && (
              <div className="co-error">
                <b>Please correct the following errors:</b>
                <ul>{errors.map(e => <li key={e}>{e} is required</li>)}</ul>
              </div>
            )}
            <div className="co-fields">
              {fields.slice(0, 2).map(([k, l, full]) => <label key={k} className={`co-f ${full ? 'full' : ''}`}>{l}<input name={k} data-demo={k} /></label>)}
              {fields.slice(2, 4).map(([k, l]) => <label key={k} className="co-f">{l}<input name={k} data-demo={k} /></label>)}
              <label className="co-f full">Name on Card *<input name="name" data-demo="name" /></label>
              <label className="co-f">Country *<select name="country"><option>United States</option><option>Canada</option></select></label>
              <label className="co-f">ZIP Code *<input name="zip" data-demo="zip" /></label>
            </div>
            <label className="co-opt" style={{ marginTop: 10 }}><input type="checkbox" defaultChecked /> Send me promotional emails and offers from Aero and partners</label>
            <label className="co-opt"><input type="checkbox" defaultChecked /> Add 2-Year Protection Plan (+$39.99)</label>
            <label className="co-opt"><input type="checkbox" name="terms" /> I agree to the Terms &amp; Conditions *</label>
            <div className="co-btns" style={{ marginTop: 12 }}>
              <Link to="/" className="co-btn">Back</Link>
              <button className="co-btn primary">Place Order</button>
            </div>
          </form>

          <div>
            <div className="co-card">
              <h3>Order Summary (1 item)</h3>
              <img className="co-banner-img" src={product.img} alt="" />
              <div className="co-item">
                <div>{product.name}<div className="co-note">SKU: AWH-2291-BLK · Qty: 1</div></div>
                <span>${product.price}.00</span>
              </div>
              <table><tbody>
                <tr><td>Subtotal</td><td>${product.price}.00</td></tr>
                <tr><td>Shipping</td><td>$12.99</td></tr>
                <tr><td>Estimated Tax</td><td>${tax}</td></tr>
                <tr><td>Handling Fee</td><td>$4.99</td></tr>
                <tr className="co-total"><td>Total</td><td>${total}</td></tr>
              </tbody></table>
              <div className="co-inline"><input placeholder="Promo code" /><button type="button" className="co-btn">Apply</button></div>
            </div>
            <div className="co-badges"><span>🔒 SSL Secure</span><span>Norton Secured</span><span>McAfee Safe</span><span>BBB A+</span></div>
            <p className="co-note">Questions? Call 1-800-555-0199 (Mon–Fri, 9–5 EST)</p>
          </div>
        </div>
      </div>
    </div>
  )
}
