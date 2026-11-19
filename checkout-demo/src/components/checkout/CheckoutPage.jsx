import { useCallback, useRef, useState } from 'react'
import CheckoutHeader from './CheckoutHeader'
import PaymentForm from './PaymentForm'
import OrderSummary from './OrderSummary'
import SuccessScreen from './SuccessScreen'
import { sampleCustomer, sampleOrder } from './fixtures'
import { useDemo } from '../../demo'
import './checkout.css'

// Full polished checkout. `prefill` defaults to sample data so the page
// previews filled in; the /alternative route passes null for an empty form.
export default function CheckoutPage({ order = sampleOrder, prefill = sampleCustomer, initialState = 'idle' }) {
  const formRef = useRef(null)
  const [state, setState] = useState(initialState)

  const after = useCallback(async form => {
    await new Promise(r => setTimeout(r, 350))
    form.requestSubmit()
  }, [])
  useDemo(formRef, { speed: 8, after })

  const pay = e => { e.preventDefault(); setState('loading'); setTimeout(() => setState('done'), 1800) }

  if (state === 'done') return <SuccessScreen order={order} />

  return (
    <div className="ck alt">
      <div className="alt-left">
        <CheckoutHeader />
        <PaymentForm ref={formRef} total={order.total} prefill={prefill} loading={state === 'loading'} onSubmit={pay} />
      </div>
      <aside className="alt-right">
        <OrderSummary order={order} />
      </aside>
    </div>
  )
}
