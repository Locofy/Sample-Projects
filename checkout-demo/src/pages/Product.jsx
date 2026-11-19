import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { product } from '../product'
import { Header, Footer } from './Layout'

const features = [
  ['Adaptive ANC', 'Tunes noise cancelling to your surroundings 200 times a second.'],
  ['40-hour battery', '5 minutes of charging gives you 4 hours of playback.'],
  ['Spatial audio', 'Head tracking keeps sound where it belongs.'],
  ['All-day comfort', 'Memory-foam cushions and a 250 g frame.'],
]
const specs = [['Driver', '40 mm dynamic'], ['Bluetooth', '5.4, multipoint'], ['Battery', '40 h (ANC on)'], ['Charging', 'USB-C, fast charge'], ['Weight', '250 g'], ['Codecs', 'AAC, SBC, LDAC']]
const reviews = [
  ['Priya S.', 'The noise cancelling is unreal. My commute is silent now.'],
  ['Marcus L.', 'Comfortable enough to wear through a full workday.'],
  ['Jen T.', 'The battery lasts forever. I charge them about once a week.'],
]
const colors = [['Midnight', '#1f2937'], ['Stone', '#d6d3d1'], ['Navy', '#1e3a8a']]

export default function Product() {
  const nav = useNavigate()
  const [img, setImg] = useState(0)
  const [color, setColor] = useState(0)
  return (
    <div className="store">
      <Header />
      <div className="crumbs">Home / Headphones / <b>{product.name}</b></div>
      <main className="pdp">
        <div>
          <div className="pdp-img"><img src={product.gallery[img]} alt={product.name} /></div>
          <div className="thumbs">
            {product.gallery.map((g, i) => (
              <button key={g} className={i === img ? 'on' : ''} onClick={() => setImg(i)}><img src={g} alt="" /></button>
            ))}
          </div>
        </div>
        <div className="pdp-info">
          <small className="pdp-kicker">New · Over-ear</small>
          <h1>{product.name}</h1>
          <div className="pdp-rating">★★★★★ <span>4.8 · 2,314 reviews</span></div>
          <p className="pdp-price">${product.price}.00 <small>or 4 payments of $62.25</small></p>
          <p className="pdp-desc">{product.desc}</p>
          <p className="pdp-label">Color: <b>{colors[color][0]}</b></p>
          <div className="pdp-colors">
            {colors.map(([n, c], i) => <span key={n} title={n} onClick={() => setColor(i)} className={`sw ${i === color ? 'on' : ''}`} style={{ background: c }} />)}
          </div>
          <button className="pdp-buy" onClick={() => nav('/checkout')}>Buy</button>
          <p className="pdp-stock">● In stock. Ships in 1–2 business days.</p>
          <ul className="pdp-perks"><li>Free shipping</li><li>30-day returns</li><li>2-year warranty</li></ul>
        </div>
      </main>

      <section className="feat">
        <h2>Made for everything you hear</h2>
        <div className="feat-grid">{features.map(([t, d]) => <div key={t}><h3>{t}</h3><p>{d}</p></div>)}</div>
      </section>

      <section className="lifestyle">
        <img src={product.lifestyle} alt="" />
        <div><h2>Your music, wherever you go.</h2><p>The headphones fold flat into a slim case that fits in any bag. They switch between your phone and laptop on their own.</p></div>
      </section>

      <section className="specs">
        <h2>Tech specs</h2>
        <dl>{specs.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}</dl>
      </section>

      <section className="reviews">
        <h2>What customers say</h2>
        <div className="rev-grid">{reviews.map(([n, t]) => <figure key={n}><div className="pdp-rating">★★★★★</div><blockquote>“{t}”</blockquote><figcaption>{n} · Verified buyer</figcaption></figure>)}</div>
      </section>
      <Footer />
    </div>
  )
}
