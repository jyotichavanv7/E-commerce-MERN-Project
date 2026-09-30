import { imageUrl, money } from '../utils/format'

export default function CartDrawer({ cart, count, total, onClose, onQuantity, onRemove, onCheckout }) {
  return <aside className="cart-panel">
    <div className="panel-title">
      <div><div className="eyebrow">YOUR LITTLE FINDS</div><h2>Your bag <small>({count})</small></h2></div>
      <button className="close" onClick={onClose} aria-label="Close">×</button>
    </div>
    {cart.length ? <>
      <div className="cart-items">{cart.map(item =>
        <div className="cart-item" key={item._id}>
          <img src={imageUrl(item.image)} alt="" />
          <div><small>{item.category}</small><h3>{item.name}</h3><b>{money(item.price)}</b>
            <div className="qty"><button onClick={() => onQuantity(item._id, -1)} aria-label="Remove one">−</button>{item.quantity}<button onClick={() => onQuantity(item._id, 1)} aria-label="Add one">+</button></div>
          </div>
          <button className="remove" onClick={() => onRemove(item._id)}>Remove</button>
        </div>
      )}</div>
      <div className="cart-bottom">
        <p>{total >= 75 ? 'You unlocked free shipping!' : 'You are ' + money(75 - total) + ' away from free shipping'}</p>
        <div className="subtotal"><span>Subtotal</span><b>{money(total)}</b></div>
        <small>Shipping and taxes calculated at checkout.</small>
        <button className="button dark full" onClick={onCheckout}>Continue to checkout ↗</button>
      </div>
    </> : <div className="empty-cart"><span>♡</span><h3>Your bag feels a little lonely.</h3><p>Find something that feels like you.</p><button className="button dark" onClick={onClose}>Take a look around ↗</button></div>}
  </aside>
}
