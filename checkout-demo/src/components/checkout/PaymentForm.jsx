import { forwardRef } from 'react'
import ExpressPay from './ExpressPay'
import FloatingField from './FloatingField'
import CardFields from './CardFields'
import PayButton from './PayButton'
import { sampleCustomer, sampleOrder } from './fixtures'
import './checkout.css'

// The full left-hand form. Pass `prefill={null}` for empty fields.
const PaymentForm = forwardRef(function PaymentForm(
  { total = sampleOrder.total, prefill = sampleCustomer, loading = false, finePrint = 'By paying you agree to our Terms. Payments are encrypted end-to-end.', onSubmit = e => e.preventDefault() },
  ref,
) {
  return (
    <form ref={ref} onSubmit={onSubmit} className="ck alt-form">
      <ExpressPay />
      <section>
        <h2><em>1</em>Contact</h2>
        <FloatingField label="Email address" type="email" demo="email" required defaultValue={prefill?.email || ''} />
      </section>
      <section>
        <h2><em>2</em>Payment</h2>
        <CardFields prefill={prefill} />
      </section>
      <PayButton amount={total} loading={loading} />
      <p className="fine">{finePrint}</p>
    </form>
  )
})

export default PaymentForm
