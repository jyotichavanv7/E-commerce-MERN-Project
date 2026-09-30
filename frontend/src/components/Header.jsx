import { useState } from 'react'

export default function Header({ user, itemCount, search, onSearch, onAccount, onSignOut, onOpenCart, onCategory }) {
  const [menuOpen, setMenuOpen] = useState(false)

  function chooseCategory(category) {
    onCategory(category)
    setMenuOpen(false)
  }

  return <>
    <div className="announcement">A little something for your everyday <span>✳</span> Free shipping over $75</div>
    <header className="header">
      <button className="mobile-menu icon-button" onClick={() => setMenuOpen(open => !open)} aria-label="Open menu">☰</button>
      <a className="logo" href="#top">little<span>things</span><sup>®</sup></a>
      <nav className={menuOpen ? 'nav open' : 'nav'}>
        <a href="#shop" onClick={() => chooseCategory('All')}>Shop all</a>
        <a href="#shop" onClick={() => chooseCategory('Home')}>Home goods</a>
        <a href="#shop" onClick={() => chooseCategory('Accessories')}>Accessories</a>
        <a href="#story" onClick={() => setMenuOpen(false)}>Our story</a>
      </nav>
      <div className="head-actions">
        <label className="search"><span>⌕</span><input aria-label="Search products" placeholder="Search anything..." value={search} onChange={event => onSearch(event.target.value)} /><kbd>⌘ K</kbd></label>
        {user
          ? <button className="round" title="Sign out" onClick={onSignOut}>{user.name?.[0]?.toUpperCase()}</button>
          : <button className="round" onClick={onAccount} aria-label="Sign in">♙</button>}
        <button className="bag" onClick={onOpenCart}>♧ <span>Bag</span><b>{itemCount}</b></button>
      </div>
    </header>
  </>
}
