import { Link } from 'react-router-dom'
import './store.css'

export function Header() {
  return (
    <>
      <div className="promo-bar">Free shipping on orders over $50 · 30-day returns</div>
      <header className="site-head">
        <Link to="/" className="brand-mark"><i />aero</Link>
        <nav><a>Headphones</a><a>Earbuds</a><a>Speakers</a><a>Accessories</a><a>Support</a></nav>
        <div className="head-icons"><a>Search</a><a>Account</a><a>Cart (0)</a></div>
      </header>
    </>
  )
}

export function Footer() {
  const cols = {
    Shop: ['Headphones', 'Earbuds', 'Speakers', 'Gift cards'],
    Support: ['Help center', 'Shipping', 'Returns', 'Warranty'],
    Company: ['About', 'Careers', 'Press', 'Sustainability'],
  }
  return (
    <footer className="site-foot">
      <div className="foot-grid">
        <div>
          <span className="brand-mark"><i />aero</span>
          <p>Sound engineered for everyday life. Designed in San Francisco.</p>
          <form className="news" onSubmit={e => e.preventDefault()}><input placeholder="Your email" /><button>Subscribe</button></form>
        </div>
        {Object.entries(cols).map(([h, l]) => (
          <div key={h}><h4>{h}</h4>{l.map(x => <a key={x}>{x}</a>)}</div>
        ))}
      </div>
      <div className="foot-base"><span>© 2026 Aero Audio, Inc.</span><span>Privacy · Terms · Cookies</span></div>
    </footer>
  )
}
