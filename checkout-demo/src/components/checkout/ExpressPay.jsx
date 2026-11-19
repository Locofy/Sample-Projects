import { AppleLogo } from './icons'
import './checkout.css'

export default function ExpressPay({ showApplePay = true, showGooglePay = true, dividerLabel = 'Or pay with card', onApplePay, onGooglePay }) {
  return (
    <div className="ck">
      <div className="express">
        {showApplePay && <button type="button" className="xp apple" onClick={onApplePay}><AppleLogo /> Pay</button>}
        {showGooglePay && <button type="button" className="xp gpay" onClick={onGooglePay}><b>G</b> Pay</button>}
      </div>
      <div className="or"><span>{dividerLabel}</span></div>
    </div>
  )
}
