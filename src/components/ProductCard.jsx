export default function ProductCard({ product, onAdd }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden group hover:shadow-md transition">
      {product.image ? (
        <img src={product.image} alt={product.name} className="w-full h-40 object-cover" />
      ) : (
        <div className="w-full h-40 bg-gradient-to-br from-emerald-50 to-emerald-100" />
      )}
      <div className="p-4">
        <h3 className="font-semibold text-slate-800 text-lg mb-1">{product.name}</h3>
        {product.origin && (
          <p className="text-xs text-slate-500 mb-2">Origin: {product.origin}</p>
        )}
        <p className="text-slate-600 text-sm line-clamp-3 mb-3">{product.description || 'Premium quality rice'}</p>
        <div className="flex items-center justify-between">
          <span className="text-emerald-700 font-bold">${product.price_per_kg.toFixed(2)}/kg</span>
          <button onClick={() => onAdd(product)} className="px-3 py-1.5 text-sm bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg">Add</button>
        </div>
      </div>
    </div>
  )
}
