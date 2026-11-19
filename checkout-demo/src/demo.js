import { useEffect, useRef } from 'react'

// Recording helper: press "D" (outside a field) or open the page with ?demo
// to type the sample values into each field one after another.
export const demoData = {
  email: 'alex@aero.co',
  card: '4242424242424242',
  exp: '1228',
  cvc: '314',
  name: 'Alex Morgan',
  zip: '94107',
}

const sleep = ms => new Promise(r => setTimeout(r, ms))

function setNative(el, value) {
  const proto = el instanceof HTMLTextAreaElement ? HTMLTextAreaElement : HTMLInputElement
  Object.getOwnPropertyDescriptor(proto.prototype, 'value').set.call(el, value)
  el.dispatchEvent(new Event('input', { bubbles: true }))
}

async function typeInto(el, text, speed) {
  el.focus()
  setNative(el, '')
  for (const ch of text) {
    setNative(el, el.value + ch)
    await sleep(speed + Math.random() * speed)
  }
  await sleep(60)
}

export function useDemo(root, { speed = 45, after } = {}) {
  const running = useRef(false)
  useEffect(() => {
    const run = async () => {
      if (running.current || !root.current) return
      running.current = true
      for (const [key, value] of Object.entries(demoData)) {
        const el = root.current?.querySelector(`[data-demo="${key}"]`)
        if (el) await typeInto(el, value, speed)
      }
      document.activeElement?.blur()
      await after?.(root.current)
      running.current = false
    }
    const onKey = e => {
      if (e.key.toLowerCase() === 'd' && !['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.tagName)) run()
    }
    window.addEventListener('keydown', onKey)
    let t
    if (new URLSearchParams(location.search).has('demo')) t = setTimeout(run, 900)
    return () => { window.removeEventListener('keydown', onKey); clearTimeout(t) }
  }, [root, speed, after])
}
