import { useCallback, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { product } from '../product'
import { useDemo } from '../demo'
import './alternative.css'

const fmtCard = v => v.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim()
const fmtExp = v => v.replace(/\D/g, '').slice(0, 4).replace(/^(\d{2})(\d)/, '$1 / $2')
const brand = n => (/^4/.test(n) ? 'VISA' : /^5[1-5]/.test(n) ? 'MC' : /^3[47]/.test(n) ? 'AMEX' : '')

const AppleLogo = () => (
  <svg viewBox="0 0 17 20" width="15" height="18" fill="currentColor" aria-hidden="true">
    <path d="M14.1 10.6c0-2.6 2.1-3.8 2.2-3.9-1.2-1.8-3.1-2-3.7-2-1.6-.2-3.1.9-3.9.9-.8 0-2-.9-3.3-.9C3.7 4.8 2.1 5.8 1.2 7.3c-1.8 3.2-.5 7.9 1.3 10.4.9 1.2 1.9 2.6 3.2 2.6 1.3-.1 1.8-.8 3.3-.8 1.6 0 2 .8 3.3.8 1.4 0 2.3-1.3 3.1-2.5 1-1.4 1.4-2.8 1.4-2.9 0 0-2.7-1-2.7-4.3zM11.6 3c.7-.9 1.2-2 1-3.2-1 0-2.3.7-3 1.6-.7.8-1.2 2-1.1 3.1 1.2.1 2.3-.6 3.1-1.5z" />
  </svg>
)

function Field({ label, demo, ...p }) {
  return (
    <label className="fx">
      <input placeholder=" " data-demo={demo} {...p} />
      <span>{label}</span>
    </label>
  )
}

export default function Alternative() {
  const formRef = useRef(null)
  const [card, setCard] = useState('')
  const [exp, setExp] = useState('')
  const [promo, setPromo] = useState(false)
  const [state, setState] = useState('idle')
  const tax = +(product.price * 0.0875).toFixed(2)
  const total = (product.price + tax).toFixed(2)

  const after = useCallback(async form => {
    await new Promise(r => setTimeout(r, 350))
    form.requestSubmit()
  }, [])
  useDemo(formRef, { speed: 8, after })

  const pay = e => { e.preventDefault(); setState('loading'); setTimeout(() => setState('done'), 1800) }

  if (state === 'done') return (
    <div className="alt alt-success">
      <div className="ok"><svg viewBox="0 0 52 52"><circle cx="26" cy="26" r="24" /><path d="M15 27l7 7 15-15" /></svg></div>
      <h1>Thank you!</h1>
      <p>Order #AR-48213 is confirmed. We'll email you tracking details as soon as it ships.</p>
      <div className="alt-success-card">
        <img src={product.img} alt="" />
        <div><b>{product.name}</b><small>Arrives in 3–5 business days</small></div>
        <span>${total}</span>
      </div>
      <Link to="/" className="back-store">Back to store</Link>
    </div>
  )

  return (
    <div className="alt">
      <div className="alt-left">
        <header className="alt-head">
          <Link to="/" className="logo"><i />aero</Link>
          <span className="secure"><svg viewBox="0 0 24 24"><path d="M6 10V8a6 6 0 1112 0v2m-13 0h14v11H5z" /></svg>Secure checkout</span>
        </header>

        <form ref={formRef} onSubmit={pay} className="alt-form">
          <div className="express">
            <button type="button" className="xp apple"><AppleLogo /> Pay</button>
            <button type="button" className="xp gpay"><b>G</b> Pay</button>
          </div>
          <div className="or"><span>Or pay with card</span></div>

          <section>
            <h2><em>1</em>Contact</h2>
            <Field label="Email address" type="email" demo="email" required />
          </section>

          <section>
            <h2><em>2</em>Payment</h2>
            <div className="cardbox">
              <label className="fx">
                <input placeholder=" " inputMode="numeric" data-demo="card" value={card} onChange={e => setCard(fmtCard(e.target.value))} required />
                <span>Card number</span>
                {brand(card) && <b className="brand">{brand(card)}</b>}
              </label>
              <div className="two">
                <label className="fx"><input placeholder=" " inputMode="numeric" data-demo="exp" value={exp} onChange={e => setExp(fmtExp(e.target.value))} required /><span>MM / YY</span></label>
                <Field label="CVC" inputMode="numeric" maxLength={4} demo="cvc" required />
              </div>
              <Field label="Name on card" demo="name" required />
              <div className="two">
                <label className="fx sel"><select defaultValue="US"><option value="US">United States</option><option value="CA">Canada</option><option value="GB">United Kingdom</option></select><span>Country</span></label>
                <Field label="ZIP code" demo="zip" required />
              </div>
            </div>
          </section>

          <button className={`pay ${state}`} type="submit" disabled={state === 'loading'}>
            {state === 'loading' ? <span className="spin" /> : <>Pay ${total}</>}
          </button>
          <p className="fine">By paying you agree to our Terms. Payments are encrypted end-to-end.</p>
        </form>
      </div>

      <aside className="alt-right">
        <div className="sum">
          <div className="hero"><img src={product.img} alt={product.name} /></div>
          <div className="item">
            <div><b>{product.name}</b><small>Midnight Black · Qty 1</small></div>
            <span>${product.price.toFixed(2)}</span>
          </div>
          {promo
            ? <div className="promo"><input placeholder="Promo code" autoFocus /><button type="button">Apply</button></div>
            : <button type="button" className="promo-link" onClick={() => setPromo(true)}>+ Add promo code</button>}
          <div className="lines">
            <div><span>Subtotal</span><span>${product.price.toFixed(2)}</span></div>
            <div><span>Shipping</span><span>Free</span></div>
            <div><span>Estimated tax</span><span>${tax.toFixed(2)}</span></div>
          </div>
          <div className="total"><span>Total</span><span><small>USD</small>${total}</span></div>
          <ul className="perks"><li>30-day free returns</li><li>2-year warranty included</li><li>Carbon-neutral delivery</li></ul>
        </div>
      </aside>
    </div>
  )
}
