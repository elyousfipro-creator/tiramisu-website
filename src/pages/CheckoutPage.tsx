import { useState } from 'react';
import { useStore } from '../store';
import { CreditCard, MapPin, Phone, User, FileText, Check } from 'lucide-react';

export function CheckoutPage() {
  const { cart, placeOrder, setCurrentPage, currentUser } = useStore();
  const [name, setName] = useState(currentUser?.name || '');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [orderId, setOrderId] = useState('');
  const [error, setError] = useState('');

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  if (cart.length === 0 && !orderId) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <div className="text-6xl mb-4">🛒</div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Panier vide</h2>
        <p className="text-gray-500 mb-6">Ajoutez des tiramisus avant de commander</p>
        <button onClick={() => setCurrentPage('configurator')}
          className="px-8 py-3 bg-gradient-to-r from-pastel-pink-400 to-pastel-blue-400 text-white rounded-xl font-bold">
          Composer un Tiramisu
        </button>
      </div>
    );
  }

  if (orderId) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <div className="bg-white rounded-3xl p-12 shadow-2xl border border-green-200">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check size={40} className="text-green-500" />
          </div>
          <h2 className="text-3xl font-extrabold text-gray-800 mb-2">Commande confirmée ! 🎉</h2>
          <p className="text-gray-500 mb-4">Merci pour votre commande</p>
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-pastel-blue-100 rounded-xl mb-6">
            <span className="text-pastel-blue-700 font-bold text-lg">N° {orderId}</span>
          </div>
          <p className="text-sm text-gray-400 mb-8">Vous pouvez suivre le statut de votre commande</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button onClick={() => setCurrentPage('tracking')}
              className="px-8 py-3 bg-gradient-to-r from-pastel-pink-400 to-pastel-blue-400 text-white rounded-xl font-bold">
              Suivre ma commande
            </button>
            <button onClick={() => { setOrderId(''); setCurrentPage('home'); }}
              className="px-8 py-3 border-2 border-gray-200 text-gray-600 rounded-xl font-medium">
              Retour à l'accueil
            </button>
          </div>
        </div>
      </div>
    );
  }

  const handleSubmit = () => {
    if (!name.trim() || !phone.trim() || !address.trim()) {
      setError('Veuillez remplir tous les champs obligatoires');
      return;
    }
    const id = placeOrder(name, phone, address, notes);
    if (id) setOrderId(id);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-extrabold text-gray-800 mb-8 flex items-center gap-3">
        <CreditCard className="text-pastel-blue-500" /> Finaliser la commande
      </h1>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Form */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-pastel-beige-200 space-y-4">
            <h3 className="text-lg font-bold text-gray-800">Informations de livraison</h3>
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-600 rounded-xl text-sm">{error}</div>
            )}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                <User size={14} /> Nom complet *
              </label>
              <input type="text" value={name} onChange={e => setName(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pastel-blue-300 focus:border-pastel-blue-300 outline-none transition-all"
                placeholder="Votre nom" />
            </div>
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                <Phone size={14} /> Téléphone *
              </label>
              <input type="tel" value={phone} onChange={e => setPhone(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pastel-blue-300 focus:border-pastel-blue-300 outline-none transition-all"
                placeholder="06 XX XX XX XX" />
            </div>
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                <MapPin size={14} /> Adresse de livraison *
              </label>
              <textarea value={address} onChange={e => setAddress(e.target.value)} rows={3}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pastel-blue-300 focus:border-pastel-blue-300 outline-none transition-all resize-none"
                placeholder="Adresse complète" />
            </div>
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                <FileText size={14} /> Notes (optionnel)
              </label>
              <textarea value={notes} onChange={e => setNotes(e.target.value)} rows={2}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pastel-blue-300 focus:border-pastel-blue-300 outline-none transition-all resize-none"
                placeholder="Instructions spéciales..." />
            </div>
          </div>

          {/* Payment */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-pastel-beige-200 space-y-4">
            <h3 className="text-lg font-bold text-gray-800">Mode de paiement</h3>
            <div className="grid grid-cols-2 gap-3">
              {['💵 Espèces', '💳 CB à la livraison'].map(method => (
                <label key={method} className="flex items-center gap-3 p-4 border-2 border-pastel-pink-200 rounded-xl cursor-pointer hover:bg-pastel-pink-50 transition-colors">
                  <input type="radio" name="payment" defaultChecked={method.includes('Espèces')} className="accent-pastel-pink-500" />
                  <span className="font-medium text-gray-700">{method}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Order summary */}
        <div className="space-y-4">
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-pastel-pink-200 sticky top-24">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Récapitulatif</h3>
            <div className="space-y-3">
              {cart.map((item) => (
                <div key={item.id} className="flex justify-between items-start text-sm border-b pb-3 border-gray-100">
                  <div>
                    <p className="font-medium text-gray-700">{item.size === 'L' ? '🍰' : '🎂'} Tiramisu {item.size}</p>
                    <p className="text-xs text-gray-400 mt-1">
                      {[...item.toppings, ...item.coulis].join(', ')}
                    </p>
                  </div>
                  <span className="font-bold text-pastel-pink-500">{item.price}€</span>
                </div>
              ))}
            </div>
            <div className="border-t pt-4 mt-4 flex justify-between items-center">
              <span className="text-lg font-bold text-gray-800">Total</span>
              <span className="text-2xl font-extrabold text-pastel-pink-500">{total}€</span>
            </div>
            <button onClick={handleSubmit}
              className="w-full mt-6 py-4 bg-gradient-to-r from-pastel-pink-400 to-pastel-blue-400 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all">
              ✅ Confirmer la commande
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
