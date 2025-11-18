import { useState } from 'react'

export default function Navbar({ onCartClick }) {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 backdrop-blur bg-white/70 border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <a href="/" className="flex items-center gap-2">
          <img src="/rice-bag.png" alt="Rice" className="w-8 h-8" />
          <span className="font-bold text-slate-800 text-lg">Golden Grain Traders</span>
        </a>
        <nav className="hidden md:flex items-center gap-6 text-slate-700">
          <a href="#products" className="hover:text-emerald-600">Products</a>
          <a href="#about" className="hover:text-emerald-600">About</a>
          <a href="#contact" className="hover:text-emerald-600">Contact</a>
        </nav>
        <div className="flex items-center gap-3">
          <button onClick={onCartClick} className="relative inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg transition">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 9m12-9l2 9M9 21a1 1 0 100-2 1 1 0 000 2zm8 0a1 1 0 100-2 1 1 0 000 2z"/></svg>
            View Cart
          </button>
          <button className="md:hidden p-2 rounded hover:bg-slate-100" onClick={() => setOpen(!open)}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>
        </div>
      </div>
      {open && (
        <div className="md:hidden border-t border-slate-200 bg-white">
          <div className="max-w-6xl mx-auto px-4 py-3 flex flex-col gap-2 text-slate-700">
            <a href="#products" className="py-2">Products</a>
            <a href="#about" className="py-2">About</a>
            <a href="#contact" className="py-2">Contact</a>
          </div>
        </div>
      )}
    </header>
  )
}
