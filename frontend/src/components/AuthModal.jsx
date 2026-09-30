export default function AuthModal({ mode, onModeChange, onClose, onSubmit, error, busy }) {
  const isLogin = mode === 'login'
  return <section className="dialog">
    <button className="close" onClick={onClose} aria-label="Close">×</button>
    <div className="mark">l.</div>
    <div className="eyebrow">{isLogin ? 'WELCOME BACK' : 'COME ON IN'}</div>
    <h2>{isLogin ? 'Good to see you.' : 'Make yourself at home.'}</h2>
    <p>{isLogin ? 'Sign in to see your orders and favorites.' : 'Save your favorites and keep your orders close.'}</p>
    <form className="form" onSubmit={onSubmit}>
      {!isLogin && <label>Your name<input name="name" placeholder="Your name" required /></label>}
      <label>Email address<input name="email" type="email" placeholder="you@example.com" required /></label>
      <label>Password<input name="password" type="password" minLength="6" placeholder="At least 6 characters" required /></label>
      {error && <p className="error">{error}</p>}
      <button className="button dark full" disabled={busy}>{busy ? 'One moment…' : isLogin ? 'Sign in' : 'Create my account'} ↗</button>
    </form>
    <p className="switch">{isLogin ? 'New around here?' : 'Already part of the family?'}
      <button onClick={() => onModeChange(isLogin ? 'register' : 'login')}>{isLogin ? 'Create an account' : 'Sign in'}</button>
    </p>
    <small className="fine">By continuing, you agree to our Terms & Privacy Policy.</small>
  </section>
}
