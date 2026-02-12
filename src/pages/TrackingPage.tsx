import { useState } from 'react';
import { useStore, type OrderStatus } from '../store';
import { Search, Package, Clock, ChefHat, Truck, CheckCircle2 } from 'lucide-react';

const statusConfig: Record<OrderStatus, { label: string; color: string; icon: React.ReactNode; step: number }> = {
  new: { label: 'Nouvelle commande', color: 'text-pastel-blue-500', icon: <Package size={20} />, step: 1 },
  preparing: { label: 'En préparation', color: 'text-yellow-500', icon: <ChefHat size={20} />, step: 2 },
  ready: { label: 'Prête', color: 'text-green-500', icon: <CheckCircle2 size={20} />, step: 3 },
  delivering: { label: 'En livraison', color: 'text-purple-500', icon: <Truck size={20} />, step: 4 },
  delivered: { label: 'Livrée', color: 'text-green-600', icon: <CheckCircle2 size={20} />, step: 5 },
};

const allSteps = [
  { label: 'Commande reçue', icon: <Clock size={16} /> },
  { label: 'En préparation', icon: <ChefHat size={16} /> },
  { label: 'Prête', icon: <Package size={16} /> },
  { label: 'En livraison', icon: <Truck size={16} /> },
  { label: 'Livrée', icon: <CheckCircle2 size={16} /> },
];

export function TrackingPage() {
  const orders = useStore(s => s.orders);
  const [searchId, setSearchId] = useState('');
  const [foundOrder, setFoundOrder] = useState<typeof orders[0] | null>(null);
  const [notFound, setNotFound] = useState(false);

  const handleSearch = () => {
    const order = orders.find(o => o.id.toLowerCase() === searchId.trim().toLowerCase());
    if (order) {
      setFoundOrder(order);
      setNotFound(false);
    } else {
      setFoundOrder(null);
      setNotFound(true);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-extrabold text-gray-800 flex items-center justify-center gap-3">
          <Package className="text-pastel-blue-500" /> Suivi de commande
        </h1>
        <p className="text-gray-500 mt-2">Entrez votre numéro de commande</p>
      </div>

      {/* Search */}
      <div className="flex gap-3 mb-8 max-w-md mx-auto">
        <input type="text" value={searchId} onChange={e => setSearchId(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSearch()}
          className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pastel-blue-300 outline-none"
          placeholder="Ex: CMD-001" />
        <button onClick={handleSearch}
          className="px-6 py-3 bg-gradient-to-r from-pastel-pink-400 to-pastel-blue-400 text-white rounded-xl font-bold flex items-center gap-2">
          <Search size={18} /> Rechercher
        </button>
      </div>

      {notFound && (
        <div className="text-center p-8 bg-white rounded-2xl border border-red-200">
          <div className="text-4xl mb-3">🔍</div>
          <p className="text-gray-600">Commande non trouvée. Vérifiez le numéro.</p>
          <p className="text-sm text-gray-400 mt-2">Essayez: CMD-001, CMD-002 ou CMD-003</p>
        </div>
      )}

      {foundOrder && (
        <div className="bg-white rounded-3xl p-8 shadow-xl border border-pastel-blue-200 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-gray-800">Commande {foundOrder.id}</h2>
              <p className="text-sm text-gray-400">{new Date(foundOrder.createdAt).toLocaleString('fr-FR')}</p>
            </div>
            <div className={`flex items-center gap-2 px-4 py-2 rounded-full bg-gray-50 font-bold ${statusConfig[foundOrder.status].color}`}>
              {statusConfig[foundOrder.status].icon}
              {statusConfig[foundOrder.status].label}
            </div>
          </div>

          {/* Progress */}
          <div className="relative">
            <div className="flex items-center justify-between">
              {allSteps.map((s, i) => {
                const currentStep = statusConfig[foundOrder.status].step;
                const active = i < currentStep;
                const isCurrent = i === currentStep - 1;
                return (
                  <div key={i} className="flex flex-col items-center relative z-10">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                      active ? 'bg-green-500 text-white' :
                      isCurrent ? 'bg-pastel-pink-400 text-white animate-pulse' : 'bg-gray-200 text-gray-400'
                    }`}>
                      {s.icon}
                    </div>
                    <span className={`text-xs mt-2 text-center w-16 ${active || isCurrent ? 'text-gray-700 font-medium' : 'text-gray-400'}`}>
                      {s.label}
                    </span>
                  </div>
                );
              })}
            </div>
            <div className="absolute top-5 left-0 right-0 h-0.5 bg-gray-200 -z-0">
              <div className="h-full bg-green-500 transition-all duration-500"
                style={{ width: `${((statusConfig[foundOrder.status].step - 1) / 4) * 100}%` }} />
            </div>
          </div>

          {/* Items */}
          <div className="space-y-3">
            <h3 className="font-bold text-gray-700">Détails de la commande</h3>
            {foundOrder.items.map((item, i) => (
              <div key={i} className="bg-pastel-beige-50 rounded-xl p-4">
                <div className="flex justify-between">
                  <span className="font-medium">{item.size === 'L' ? '🍰' : '🎂'} Tiramisu {item.size}</span>
                  <span className="font-bold text-pastel-pink-500">{item.price}€</span>
                </div>
                <div className="flex flex-wrap gap-1 mt-2">
                  {item.toppings.map(t => <span key={t} className="text-xs px-2 py-0.5 bg-pastel-pink-200 text-pastel-pink-700 rounded-full">{t}</span>)}
                  {item.coulis.map(c => <span key={c} className="text-xs px-2 py-0.5 bg-pastel-blue-200 text-pastel-blue-700 rounded-full">{c}</span>)}
                </div>
              </div>
            ))}
          </div>

          <div className="border-t pt-4 flex justify-between text-lg">
            <span className="font-bold text-gray-800">Total</span>
            <span className="font-extrabold text-pastel-pink-500">{foundOrder.total}€</span>
          </div>
        </div>
      )}

      {/* Quick links to demo orders */}
      <div className="mt-8 text-center">
        <p className="text-xs text-gray-400 mb-2">Commandes de démo :</p>
        <div className="flex gap-2 justify-center">
          {['CMD-001', 'CMD-002', 'CMD-003'].map(id => (
            <button key={id} onClick={() => { setSearchId(id); setFoundOrder(orders.find(o => o.id === id) || null); setNotFound(false); }}
              className="px-3 py-1 text-xs bg-pastel-blue-100 text-pastel-blue-600 rounded-full hover:bg-pastel-blue-200 transition-colors">
              {id}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
