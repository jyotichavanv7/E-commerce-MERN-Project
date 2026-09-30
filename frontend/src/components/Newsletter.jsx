export default function Newsletter({ onSubscribe }) {
  function submit(event) {
    event.preventDefault()
    event.currentTarget.reset()
    onSubscribe('You are on the list — talk soon!')
  }

  return <section className="newsletter">
    <span className="big-star">✳</span>
    <div><div className="eyebrow">A GOOD NOTE, EVERY NOW AND THEN</div><h2>A little joy in your inbox.</h2><p>New finds, small rituals, and 10% off your first order.</p></div>
    <form onSubmit={submit}>
      <input type="email" placeholder="Your email address" aria-label="Email address" required />
      <button>Count me in ↗</button>
    </form>
  </section>
}
