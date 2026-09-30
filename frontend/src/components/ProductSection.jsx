import { categories } from '../data/products'
import { imageUrl, money } from '../utils/format'

function ProductCard({ product, saved, onToggleSaved, onAdd }) {
  return <article className="product">
    <div className="product-img">
      <img src={imageUrl(product.image)} alt={product.name} loading="lazy" />
      {product.tag && <span className="tag">{product.tag}</span>}
      <button className={saved ? 'heart saved' : 'heart'} onClick={onToggleSaved} aria-label="Save favorite">♡</button>
      <button className="add" onClick={onAdd}>Add to bag <b>+</b></button>
    </div>
    <div className="product-info">
      <div><small>{product.category}</small><h3>{product.name}</h3></div>
      <span className="rating">★ {product.rating || '4.8'}</span>
    </div>
    <strong className="price">{money(product.price)}</strong>
  </article>
}

export default function ProductSection({ products, category, onCategory, onSearch, sort, onSort, saved, onToggleSaved, onAdd }) {
  return <section className="shop" id="shop">
    <div className="section-title">
      <div><div className="eyebrow">A GOOD PLACE TO START</div><h2>The little things <em>we love.</em></h2></div>
      <a className="underlink" href="#shop">Shop the collection ↗</a>
    </div>
    <div className="controls">
      <div className="filters">{categories.map(item =>
        <button className={category === item ? 'filter active' : 'filter'} onClick={() => onCategory(item)} key={item}>{item}</button>
      )}</div>
      <label className="sort">Sort by <select value={sort} onChange={event => onSort(event.target.value)}>
        <option value="featured">Featured</option><option value="low">Price: low to high</option><option value="high">Price: high to low</option>
      </select></label>
    </div>
    <div className="grid">{products.map(product =>
      <ProductCard key={product._id} product={product} saved={saved.includes(product._id)}
        onToggleSaved={() => onToggleSaved(product._id)} onAdd={() => onAdd(product)} />
    )}</div>
    {!products.length && <p className="empty">No finds here. Try another search.</p>}
    <div className="shop-foot">
      <span>Showing {products.length} lovely finds</span>
      <button className="button outline" onClick={() => { onCategory('All'); onSearch('') }}>See everything ↗</button>
    </div>
  </section>
}
