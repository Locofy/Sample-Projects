import { LockIcon } from './icons'
import './checkout.css'

export default function CheckoutHeader({ brand = 'aero', href = '/', secureLabel = 'Secure checkout' }) {
  return (
    <header className="ck alt-head">
      <a href={href} className="logo"><i />{brand}</a>
      <span className="secure"><LockIcon />{secureLabel}</span>
    </header>
  )
}
