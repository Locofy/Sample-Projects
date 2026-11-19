import { useState } from 'react'
import { sampleOrder, money } from './fixtures'
import './checkout.css'

// Dark summary card: product image, item, promo code, totals, perks.
export default function OrderSummary({ order = sampleOrder, showImage = true, promoOpen = false }) {
  const [promo, setPromo] = useState(promoOpen)
  const { product: p } = order
  return (
    <div className="ck sum">
      {showImage && <div className="hero"><img src={p.img} alt={p.name} /></div>}
      <div className="item">
        <div><b>{p.name}</b><small>{p.variant} · Qty {p.qty}</small></div>
        <span>{money(p.price)}</span>
      </div>
      {promo
        ? <div className="promo"><input placeholder="Promo code" autoFocus={!promoOpen} /><button type="button">Apply</button></div>
        : <button type="button" className="promo-link" onClick={() => setPromo(true)}>+ Add promo code</button>}
      <div className="lines">
        <div><span>Subtotal</span><span>{money(order.subtotal)}</span></div>
        <div><span>Shipping</span><span>{order.shipping ? money(order.shipping) : 'Free'}</span></div>
        <div><span>Estimated tax</span><span>{money(order.tax)}</span></div>
      </div>
      <div className="total"><span>Total</span><span><small>{order.currency}</small>{money(order.total)}</span></div>
      <ul className="perks">{order.perks.map(x => <li key={x}>{x}</li>)}</ul>
    </div>
  )
}
