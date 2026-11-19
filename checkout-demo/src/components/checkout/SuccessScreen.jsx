import { sampleOrder, money } from './fixtures'
import './checkout.css'

export default function SuccessScreen({ order = sampleOrder, title = 'Thank you!', storeHref = '/', trackHref = '/alternative/tracking' }) {
  const p = order.product
  return (
    <div className="ck alt alt-success">
      <div className="ok"><svg viewBox="0 0 52 52"><circle cx="26" cy="26" r="24" /><path d="M15 27l7 7 15-15" /></svg></div>
      <h1>{title}</h1>
      <p>Order #{order.id} is confirmed. We'll email you tracking details as soon as it ships.</p>
      <div className="alt-success-card">
        <img src={p.img} alt="" />
        <div><b>{p.name}</b><small>{order.eta}</small></div>
        <span>{money(order.total)}</span>
      </div>
      <div className="ck-links">
        <a href={trackHref} className="ck-btn">Track order</a>
        <a href={storeHref} className="back-store">Back to store</a>
      </div>
    </div>
  )
}
