import './checkout.css'

// Text input with a label that shrinks above the value once filled.
export default function FloatingField({ label = 'Email address', demo, value, defaultValue = 'alex@aero.co', onChange, badge, ...rest }) {
  const controlled = value !== undefined
  return (
    <label className="ck fx">
      <input
        placeholder=" "
        data-demo={demo}
        {...(controlled ? { value, onChange } : { defaultValue })}
        {...rest}
      />
      <span>{label}</span>
      {badge && <b className="brand">{badge}</b>}
    </label>
  )
}

export function FloatingSelect({ label = 'Country', options = [['US', 'United States'], ['CA', 'Canada'], ['GB', 'United Kingdom']], defaultValue = 'US' }) {
  return (
    <label className="ck fx sel">
      <select defaultValue={defaultValue}>
        {options.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
      </select>
      <span>{label}</span>
    </label>
  )
}
