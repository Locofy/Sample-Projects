import { sampleOrder, sampleTracking, money } from './fixtures'
import CheckoutHeader from './CheckoutHeader'
import './checkout.css'

// Post-purchase delivery tracking.
export default function OrderTrackingScreen({
  order = sampleOrder,
  steps = sampleTracking,
  carrier = 'UPS',
  trackingNumber = '1Z 999 AA1 01 2345 6784',
  eta = 'Monday, Nov 24',
}) {
  const p = order.product
  const doneCount = steps.filter(s => s.done).length
  const pct = Math.round(((doneCount - 1) / (steps.length - 1)) * 100)
  return (
    <div className="ck ck-track">
      <div className="ck-track-in">
        <CheckoutHeader secureLabel={`Order #${order.id}`} />
        <p className="ck-eyebrow">Estimated delivery</p>
        <h1>{eta}</h1>
        <div className="ck-bar"><i style={{ width: `${pct}%` }} /></div>

        <div className="ck-track-grid">
          <ol className="ck-steps">
            {steps.map(s => (
              <li key={s.label} className={`${s.done ? 'done' : ''} ${s.current ? 'current' : ''}`}>
                <i />
                <div><b>{s.label}</b>{s.detail && <small>{s.detail}</small>}</div>
              </li>
            ))}
          </ol>

          <aside className="ck-track-side">
            <div className="ck-track-item">
              <img src={p.img} alt="" />
              <div><b>{p.name}</b><small>{p.variant} · Qty {p.qty}</small></div>
            </div>
            <div className="ck-panel">
              <div><span>Carrier</span><span>{carrier}</span></div>
              <div><span>Tracking</span><span className="mono">{trackingNumber}</span></div>
              <div><span>Paid</span><span>{money(order.total)}</span></div>
            </div>
            <a href="/" className="back-store">Back to store</a>
          </aside>
        </div>
      </div>
    </div>
  )
}
