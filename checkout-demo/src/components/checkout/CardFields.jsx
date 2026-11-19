import { useState } from 'react'
import FloatingField, { FloatingSelect } from './FloatingField'
import { sampleCustomer } from './fixtures'
import './checkout.css'

export const fmtCard = v => v.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim()
export const fmtExp = v => v.replace(/\D/g, '').slice(0, 4).replace(/^(\d{2})(\d)/, '$1 / $2')
export const cardBrand = n => (/^4/.test(n) ? 'VISA' : /^5[1-5]/.test(n) ? 'MC' : /^3[47]/.test(n) ? 'AMEX' : '')

// Card number, expiry, CVC, name, country and ZIP.
// Pass `prefill={null}` for an empty form.
export default function CardFields({ prefill = sampleCustomer }) {
  const p = prefill || {}
  const [card, setCard] = useState(fmtCard(p.card || ''))
  const [exp, setExp] = useState(fmtExp(p.exp || ''))
  return (
    <div className="ck cardbox">
      <FloatingField label="Card number" demo="card" inputMode="numeric" required
        value={card} onChange={e => setCard(fmtCard(e.target.value))} badge={cardBrand(card)} />
      <div className="two">
        <FloatingField label="MM / YY" demo="exp" inputMode="numeric" required
          value={exp} onChange={e => setExp(fmtExp(e.target.value))} />
        <FloatingField label="CVC" demo="cvc" inputMode="numeric" maxLength={4} required defaultValue={p.cvc || ''} />
      </div>
      <FloatingField label="Name on card" demo="name" required defaultValue={p.name || ''} />
      <div className="two">
        <FloatingSelect defaultValue={p.country || 'US'} />
        <FloatingField label="ZIP code" demo="zip" required defaultValue={p.zip || ''} />
      </div>
    </div>
  )
}
