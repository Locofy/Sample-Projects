import { sampleOrder, money } from './fixtures'
import './checkout.css'

// Shown when the card is declined.
export default function PaymentFailedScreen({
  order = sampleOrder,
  reason = 'Your card was declined by the bank.',
  cardLast4 = '4242',
  retryHref = '/alternative',
  onRetry,
}) {
  return (
    <div className="ck alt alt-success ck-failed">
      <div className="ck-icon bad">!</div>
      <h1>Payment didn't go through</h1>
      <p>{reason} You haven't been charged, and your cart is saved.</p>
      <div className="ck-panel">
        <div><span>Card</span><span>Visa •••• {cardLast4}</span></div>
        <div><span>Amount</span><span>{money(order.total)}</span></div>
        <div><span>Error code</span><span className="mono">card_declined</span></div>
      </div>
      <ul className="ck-tips">
        <li>Check the card number, expiry date and CVC</li>
        <li>Make sure the ZIP code matches your billing address</li>
        <li>Try a different card, or pay with Apple Pay</li>
      </ul>
      <div className="ck-links">
        {onRetry
          ? <button type="button" className="ck-btn" onClick={onRetry}>Try again</button>
          : <a href={retryHref} className="ck-btn">Try again</a>}
        <a href="#" className="back-store">Contact support</a>
      </div>
    </div>
  )
}
