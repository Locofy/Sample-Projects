import { money } from './fixtures'
import './checkout.css'

export default function PayButton({ amount = 270.79, loading = false, label = 'Pay', type = 'submit', onClick }) {
  return (
    <button className={`ck pay ${loading ? 'loading' : ''}`} type={type} disabled={loading} onClick={onClick}>
      {loading ? <span className="spin" /> : <>{label} {money(amount)}</>}
    </button>
  )
}
