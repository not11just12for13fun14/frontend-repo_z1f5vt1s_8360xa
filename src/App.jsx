import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import ProductCard from './components/ProductCard'
import CartDrawer from './components/CartDrawer'

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function App() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const [cartOpen, setCartOpen] = useState(false)
  const [cart, setCart] = useState([])
  const [total, setTotal] = useState(0)

  useEffect(() => {
    fetchProducts()
  }, [])

  useEffect(() => {
    const t = cart.reduce((sum, i) => sum + i.price_per_kg * i.quantity_kg, 0)
    setTotal(t)
  }, [cart])

  const fetchProducts = async () => {
    try {
      setLoading(true)
      const res = await fetch(`${BACKEND_URL}/api/products`)
      if (!res.ok) throw new Error('Failed to load products')
      const data = await res.json()
      setProducts(data)
      setError('')
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  const addToCart = (product) => {
    setCart(prev => {
      const exists = prev.find(p => p.id === product.id)
      if (exists) {
        return prev.map(p => p.id === product.id ? { ...p, quantity_kg: p.quantity_kg + 1 } : p)
      }
      return [...prev, { ...product, product_id: product.id, quantity_kg: 1 }]
    })
    setCartOpen(true)
  }

  const changeQty = (item, qty) => {
    setCart(prev => {
      if (qty <= 0) return prev.filter(p => p.id !== item.id)
      return prev.map(p => p.id === item.id ? { ...p, quantity_kg: qty } : p)
    })
  }

  const checkout = async () => {
    const order = {
      customer_name: 'Walk-in Customer',
      phone: 'N/A',
      address: 'N/A',
      notes: '',
      items: cart.map(i => ({
        product_id: i.product_id,
        name: i.name,
        price_per_kg: i.price_per_kg,
        quantity_kg: i.quantity_kg,
      })),
      total_amount: total,
    }

    try {
      const res = await fetch(`${BACKEND_URL}/api/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(order)
      })
      if (!res.ok) throw new Error('Checkout failed')
      const data = await res.json()
      alert(`Order placed! ID: ${data.id}`)
      setCart([])
      setCartOpen(false)
    } catch (e) {
      alert(e.message)
    }
  }

  return (
    <div className="min-h-screen bg-emerald-50">
      <Navbar onCartClick={() => setCartOpen(true)} />

      {/* Hero */}
      <section className="relative">
        <div className="max-w-6xl mx-auto px-4 pt-16 pb-10 grid md:grid-cols-2 items-center gap-10">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
              Premium Rice for Homes and Businesses
            </h1>
            <p className="mt-4 text-slate-600 text-lg">
              We source the finest grains directly from farmers and deliver fresh, quality rice at fair prices.
            </p>
            <div className="mt-6 flex gap-3">
              <a href="#products" className="px-5 py-3 rounded-lg bg-emerald-600 text-white font-medium hover:bg-emerald-700">Shop Varieties</a>
              <a href="#contact" className="px-5 py-3 rounded-lg bg-white border border-slate-200 text-slate-700 font-medium hover:bg-slate-50">Contact Sales</a>
            </div>
          </div>
          <div className="relative">
            <img src="/hero-rice.jpg" alt="Rice sacks" className="rounded-2xl shadow-lg border border-slate-200" />
            <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow p-4 border">
              <p className="text-sm text-slate-600">Trusted by 200+ local restaurants</p>
            </div>
          </div>
        </div>
      </section>

      {/* Products */}
      <section id="products" className="py-12 border-t border-slate-200 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-end justify-between mb-6">
            <h2 className="text-2xl font-bold text-slate-900">Popular Varieties</h2>
            <button onClick={fetchProducts} className="text-sm px-3 py-1.5 rounded bg-slate-100 hover:bg-slate-200">Refresh</button>
          </div>
          {loading ? (
            <p className="text-slate-600">Loading products...</p>
          ) : error ? (
            <p className="text-red-600">{error}</p>
          ) : products.length === 0 ? (
            <div className="text-slate-600">
              <p>No products yet. Add some via the backend or database viewer.</p>
              <div className="mt-3 text-sm bg-emerald-50 border border-emerald-200 text-emerald-800 p-3 rounded">
                Tip: Use the Test page to verify the backend connection.
              </div>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
              {products.map(p => (
                <ProductCard key={p.id} product={p} onAdd={addToCart} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-12">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-10 items-center">
          <img src="/warehouse.jpg" alt="Warehouse" className="rounded-xl border" />
          <div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Who we are</h3>
            <p className="text-slate-600">We are a family-run merchant with decades of experience in sourcing, grading, and distributing rice. From fragrant basmati to local long-grain, we carry a wide selection suitable for every kitchen.</p>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-12 bg-slate-50 border-t">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Contact Sales</h3>
            <p className="text-slate-600 mb-4">Looking for bulk orders or custom mixes? Send us a message and we’ll get back to you.</p>
            <a href="/test" className="inline-block px-4 py-2 rounded bg-slate-900 text-white">Backend Test</a>
          </div>
          <form onSubmit={(e)=> e.preventDefault()} className="bg-white p-6 rounded-xl border space-y-3">
            <input className="w-full border rounded-lg p-3" placeholder="Your name" />
            <input className="w-full border rounded-lg p-3" placeholder="Phone" />
            <textarea rows="4" className="w-full border rounded-lg p-3" placeholder="Message"></textarea>
            <button className="px-4 py-2 rounded bg-emerald-600 text-white">Send</button>
          </form>
        </div>
      </section>

      <CartDrawer
        open={cartOpen}
        items={cart}
        onClose={() => setCartOpen(false)}
        onCheckout={checkout}
        onChangeQty={changeQty}
        total={total}
      />
    </div>
  )
}
