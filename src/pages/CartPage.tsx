import { useStore } from '../store';
import { Trash2, ShoppingBag, ArrowRight, Plus, Edit3 } from 'lucide-react';
import { useState } from 'react';

export function CartPage() {
  const { cart, removeFromCart, clearCart, setCurrentPage, toppings, coulisList, prices, updateCartItem } = useStore();
  const [editingId, setEditingId] = useState<string | null>(null);

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  const activeToppings = toppings.filter(t => t.active);
  const activeCoulis = coulisList.filter(c => c.active);

  const editItem = cart.find(i => i.id === editingId);

  const handleToggleEditTopping = (name: string) => {
    if (!editItem) return;
    const newToppings = editItem.toppings.includes(name)
      ? editItem.toppings.filter(t => t !== name)
      : [...editItem.toppings, name];
    const totalExtras = newToppings.length + editItem.coulis.length;
    const price = prices[editItem.size] + Math.max(0, totalExtras - 1);
    updateCartItem(editItem.id, { ...editItem, toppings: newToppings, price });
  };

  const handleToggleEditCoulis = (name: string) => {
    if (!editItem) return;
    const newCoulis = editItem.coulis.includes(name)
      ? editItem.coulis.filter(c => c !== name)
      : [...editItem.coulis, name];
    const totalExtras = editItem.toppings.length + newCoulis.length;
    const price = prices[editItem.size] + Math.max(0, totalExtras - 1);
    updateCartItem(editItem.id, { ...editItem, coulis: newCoulis, price });
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <div className="text-6xl mb-6">🛒</div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Ton panier est vide</h2>
        <p className="text-gray-500 mb-8">Compose ton premier tiramisu !</p>
        <button onClick={() => setCurrentPage('configurator')}
          className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-pastel-pink-400 to-pastel-blue-400 text-white rounded-2xl font-bold shadow-lg hover:shadow-xl transition-all">
          <Plus size={20} /> Composer un Tiramisu
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-extrabold text-gray-800 mb-8 flex items-center gap-3">
        <ShoppingBag className="text-pastel-pink-500" /> Mon Panier
        <span className="text-lg font-normal text-gray-400">({cart.length} article{cart.length > 1 ? 's' : ''})</span>
      </h1>

      <div className="space-y-4">
        {cart.map((item) => (
          <div key={item.id} className="bg-white rounded-2xl p-6 shadow-md border border-pastel-beige-200 hover:shadow-lg transition-all">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4">
                <div className="text-4xl">{item.size === 'L' ? '🍰' : '🎂'}</div>
                <div>
                  <h3 className="font-bold text-gray-800 text-lg">Tiramisu {item.size}</h3>
                  {item.toppings.length > 0 && (
                    <div className="mt-2">
                      <span className="text-xs font-semibold text-gray-500">Toppings : </span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {item.toppings.map(t => (
                          <span key={t} className="text-xs px-2 py-1 bg-pastel-pink-100 text-pastel-pink-600 rounded-full">{t}</span>
                        ))}
                      </div>
                    </div>
                  )}
                  {item.coulis.length > 0 && (
                    <div className="mt-2">
                      <span className="text-xs font-semibold text-gray-500">Coulis : </span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {item.coulis.map(c => (
                          <span key={c} className="text-xs px-2 py-1 bg-pastel-blue-100 text-pastel-blue-600 rounded-full">{c}</span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-extrabold text-pastel-pink-500">{item.price}€</div>
                <div className="flex gap-2 mt-2">
                  <button onClick={() => setEditingId(editingId === item.id ? null : item.id)}
                    className="p-2 rounded-lg hover:bg-pastel-blue-50 text-pastel-blue-500 transition-colors" title="Modifier">
                    <Edit3 size={16} />
                  </button>
                  <button onClick={() => removeFromCart(item.id)}
                    className="p-2 rounded-lg hover:bg-red-50 text-red-400 transition-colors" title="Supprimer">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>

            {/* Edit mode */}
            {editingId === item.id && (
              <div className="mt-4 pt-4 border-t border-pastel-beige-200 space-y-4">
                <div>
                  <h4 className="text-sm font-semibold text-gray-600 mb-2">Modifier les toppings</h4>
                  <div className="flex flex-wrap gap-2">
                    {activeToppings.map(t => (
                      <button key={t.id} onClick={() => handleToggleEditTopping(t.name)}
                        className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
                          item.toppings.includes(t.name)
                            ? 'bg-pastel-pink-100 border-pastel-pink-300 text-pastel-pink-600'
                            : 'border-gray-200 text-gray-500 hover:border-pastel-pink-200'
                        }`}>
                        {t.emoji} {t.name}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-gray-600 mb-2">Modifier les coulis</h4>
                  <div className="flex flex-wrap gap-2">
                    {activeCoulis.map(c => (
                      <button key={c.id} onClick={() => handleToggleEditCoulis(c.name)}
                        className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
                          item.coulis.includes(c.name)
                            ? 'bg-pastel-blue-100 border-pastel-blue-300 text-pastel-blue-600'
                            : 'border-gray-200 text-gray-500 hover:border-pastel-blue-200'
                        }`}>
                        {c.emoji} {c.name}
                      </button>
                    ))}
                  </div>
                </div>
                <button onClick={() => setEditingId(null)} className="text-sm text-pastel-blue-600 font-medium">Terminé ✓</button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Total & Actions */}
      <div className="mt-8 bg-white rounded-2xl p-6 shadow-lg border border-pastel-pink-200">
        <div className="flex items-center justify-between mb-6">
          <span className="text-lg font-bold text-gray-800">Total</span>
          <span className="text-3xl font-extrabold text-pastel-pink-500">{total}€</span>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <button onClick={() => setCurrentPage('configurator')}
            className="flex items-center justify-center gap-2 px-6 py-3 border-2 border-pastel-blue-200 text-pastel-blue-600 rounded-xl font-medium hover:bg-pastel-blue-50 transition-all">
            <Plus size={18} /> Ajouter un tiramisu
          </button>
          <button onClick={clearCart}
            className="flex items-center justify-center gap-2 px-6 py-3 border border-gray-200 text-gray-400 rounded-xl font-medium hover:bg-gray-50 transition-all">
            <Trash2 size={16} /> Vider
          </button>
          <button onClick={() => setCurrentPage('checkout')}
            className="flex-1 flex items-center justify-center gap-2 px-8 py-3 bg-gradient-to-r from-pastel-pink-400 to-pastel-blue-400 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all">
            Commander <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
