export default function CartDrawer({ open, items, onClose, onCheckout, onChangeQty, total }) {
  return (
    <div className={`fixed inset-0 z-50 ${open ? 'pointer-events-auto' : 'pointer-events-none'}`}>
      <div className={`absolute inset-0 bg-black/30 transition-opacity ${open ? 'opacity-100' : 'opacity-0'}`} onClick={onClose} />
      <div className={`absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl transition-transform ${open ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-4 border-b flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-800">Your Cart</h2>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded">✕</button>
        </div>
        <div className="p-4 h-[calc(100%-160px)] overflow-y-auto">
          {items.length === 0 ? (
            <p className="text-slate-600">Your cart is empty.</p>
          ) : (
            <div className="space-y-4">
              {items.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between gap-3 border rounded-lg p-3">
                  <div>
                    <p className="font-medium text-slate-800">{item.name}</p>
                    <p className="text-sm text-slate-500">${item.price_per_kg.toFixed(2)}/kg</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => onChangeQty(item, Math.max(0, item.quantity_kg - 1))} className="w-8 h-8 rounded bg-slate-100">-</button>
                    <span className="w-10 text-center">{item.quantity_kg}</span>
                    <button onClick={() => onChangeQty(item, item.quantity_kg + 1)} className="w-8 h-8 rounded bg-slate-100">+</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="p-4 border-t space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-slate-600">Total</span>
            <span className="text-slate-900 font-semibold">${total.toFixed(2)}</span>
          </div>
          <button disabled={items.length===0} onClick={onCheckout} className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white py-2 rounded-lg">Checkout</button>
        </div>
      </div>
    </div>
  )
}
