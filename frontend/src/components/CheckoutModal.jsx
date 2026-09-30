import { money } from '../utils/format'

export default function CheckoutModal({ total, error, busy, onClose, onSubmit }) {
  return <section className="dialog">
    <button className="close" onClick={onClose} aria-label="Back to bag">×</button>
    <div className="eyebrow">ALMOST YOURS</div>
    <h2>Where should we send it?</h2>
    <p>Your goodies are packed with care and ready to go.</p>
    <form className="form" onSubmit={onSubmit}>
      <label>Shipping address<textarea name="address" placeholder="Street, city, postal code" required /></label>
      {error && <p className="error">{error}</p>}
      <div className="subtotal"><span>Total</span><b>{money(total)}</b></div>
      <button className="button dark full" disabled={busy}>{busy ? 'Placing your order…' : 'Place my order ↗'}</button>
    </form>
    <small className="fine">A secure, happy little checkout.</small>
  </section>
}
