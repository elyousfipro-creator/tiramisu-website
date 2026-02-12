import { useState } from 'react';
import { useStore, type OrderStatus } from '../store';
import { Truck, MapPin, Phone, Clock, CheckCircle2, Package, History, Navigation, ExternalLink } from 'lucide-react';

const statusLabels: Record<OrderStatus, { label: string; color: string }> = {
  new: { label: 'Nouvelle', color: 'bg-pastel-blue-100 text-pastel-blue-700' },
  preparing: { label: 'En préparation', color: 'bg-yellow-100 text-yellow-700' },
  ready: { label: 'Prête', color: 'bg-green-100 text-green-700' },
  delivering: { label: 'En livraison', color: 'bg-purple-100 text-purple-700' },
  delivered: { label: 'Livrée', color: 'bg-gray-100 text-gray-600' },
};

function getGoogleMapsUrl(address: string) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
}

export function DeliveryDashboard() {
  const { orders, updateOrderStatus, assignDriver, currentUser } = useStore();
  const [tab, setTab] = useState<'available' | 'mydeliveries' | 'history'>('available');

  // Only show orders that kitchen has validated (status = 'ready')
  const readyOrders = orders.filter(o => o.status === 'ready');
  const myDeliveries = orders.filter(o => o.status === 'delivering' && o.assignedDriver === currentUser?.name);
  const deliveryHistory = orders.filter(o => o.status === 'delivered' && o.assignedDriver === currentUser?.name);

  const acceptDelivery = (orderId: string) => {
    if (currentUser) {
      assignDriver(orderId, currentUser.name);
      updateOrderStatus(orderId, 'delivering');
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-gray-800 flex items-center gap-3">
          <Truck className="text-pastel-blue-500" /> Dashboard Livreur
        </h1>
        <p className="text-gray-500">Crème & Cookies — Bienvenue, {currentUser?.name} 🚗</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-green-50 rounded-2xl p-4 text-center border border-green-200">
          <div className="text-3xl font-extrabold text-green-600">{readyOrders.length}</div>
          <div className="text-sm text-green-500 font-medium">Prêtes à livrer</div>
        </div>
        <div className="bg-purple-50 rounded-2xl p-4 text-center border border-purple-200">
          <div className="text-3xl font-extrabold text-purple-600">{myDeliveries.length}</div>
          <div className="text-sm text-purple-500 font-medium">En cours</div>
        </div>
        <div className="bg-pastel-beige-100 rounded-2xl p-4 text-center border border-pastel-beige-300">
          <div className="text-3xl font-extrabold text-pastel-beige-600">{deliveryHistory.length}</div>
          <div className="text-sm text-pastel-beige-500 font-medium">Livrées</div>
        </div>
      </div>

      {/* Info banner - only ready orders visible */}
      <div className="mb-6 bg-pastel-blue-50 border border-pastel-blue-200 rounded-2xl p-4 flex items-center gap-3">
        <span className="text-2xl">ℹ️</span>
        <p className="text-sm text-pastel-blue-700">
          Seules les commandes <span className="font-bold">validées par la cuisine</span> (statut « Prête ») apparaissent ici.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 flex-wrap">
        <button onClick={() => setTab('available')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium transition-all ${
            tab === 'available' ? 'bg-green-500 text-white shadow-md' : 'bg-white text-gray-600 hover:bg-green-50'
          }`}>
          <Package size={18} /> Disponibles ({readyOrders.length})
        </button>
        <button onClick={() => setTab('mydeliveries')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium transition-all ${
            tab === 'mydeliveries' ? 'bg-purple-500 text-white shadow-md' : 'bg-white text-gray-600 hover:bg-purple-50'
          }`}>
          <Navigation size={18} /> Mes livraisons ({myDeliveries.length})
        </button>
        <button onClick={() => setTab('history')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium transition-all ${
            tab === 'history' ? 'bg-gray-700 text-white shadow-md' : 'bg-white text-gray-600 hover:bg-gray-50'
          }`}>
          <History size={18} /> Historique ({deliveryHistory.length})
        </button>
      </div>

      {/* Available orders - only READY (validated by kitchen) */}
      {tab === 'available' && (
        <div className="space-y-4">
          {readyOrders.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 text-center shadow-md border border-pastel-beige-200">
              <div className="text-5xl mb-4">☕</div>
              <h3 className="text-xl font-bold text-gray-800">Aucune commande prête</h3>
              <p className="text-gray-500">La cuisine n'a pas encore validé de commande. Prenez un café en attendant !</p>
            </div>
          ) : readyOrders.map(order => (
            <div key={order.id} className="bg-white rounded-2xl p-6 shadow-lg border-l-4 border-l-green-500 hover:shadow-xl transition-all">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
                <div>
                  <div className="flex items-center gap-3">
                    <h4 className="font-extrabold text-gray-800 text-xl">{order.id}</h4>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${statusLabels[order.status].color}`}>
                      ✅ {statusLabels[order.status].label}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                    <Clock size={14} /> {new Date(order.createdAt).toLocaleTimeString('fr-FR')}
                  </p>
                </div>
                <div className="text-2xl font-extrabold text-pastel-pink-500">{order.total}€</div>
              </div>

              {/* Client info with clickable Google Maps address */}
              <div className="bg-pastel-beige-50 rounded-xl p-4 space-y-3 mb-4 border border-pastel-beige-200">
                <div className="flex items-center gap-2 text-gray-700">
                  <span className="text-lg">👤</span>
                  <span className="font-medium">{order.clientName}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600 text-sm">
                  <Phone size={14} className="text-pastel-blue-500" />
                  <a href={`tel:${order.clientPhone}`} className="text-pastel-blue-600 hover:underline font-medium">
                    {order.clientPhone}
                  </a>
                </div>
                <a
                  href={getGoogleMapsUrl(order.clientAddress)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-2 text-sm bg-pastel-blue-50 hover:bg-pastel-blue-100 p-3 rounded-xl border border-pastel-blue-200 transition-colors group cursor-pointer"
                >
                  <MapPin size={16} className="text-red-500 mt-0.5 flex-shrink-0" />
                  <span className="text-pastel-blue-700 group-hover:underline font-medium flex-1">{order.clientAddress}</span>
                  <ExternalLink size={14} className="text-pastel-blue-400 mt-0.5 flex-shrink-0" />
                </a>
                {order.notes && (
                  <p className="text-sm text-pastel-pink-600 bg-pastel-pink-50 px-3 py-2 rounded-lg">📝 {order.notes}</p>
                )}
              </div>

              {/* Order details */}
              <div className="space-y-2 mb-4">
                {order.items.map((item, i) => (
                  <div key={i} className="bg-pastel-pink-50 rounded-lg p-3 text-sm border border-pastel-pink-100">
                    <span className="font-medium">{item.size === 'L' ? '🍰' : '🎂'} Tiramisu {item.size}</span>
                    <span className="text-pastel-pink-500 font-bold ml-2">({item.price}€)</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {item.toppings.map(t => <span key={t} className="text-xs px-2 py-0.5 bg-pastel-pink-200 text-pastel-pink-700 rounded-full">{t}</span>)}
                      {item.coulis.map(c => <span key={c} className="text-xs px-2 py-0.5 bg-pastel-blue-200 text-pastel-blue-700 rounded-full">{c}</span>)}
                    </div>
                  </div>
                ))}
              </div>

              <button onClick={() => acceptDelivery(order.id)}
                className="w-full flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-bold shadow-md hover:shadow-lg transition-all">
                <Truck size={18} /> Accepter cette livraison
              </button>
            </div>
          ))}
        </div>
      )}

      {/* My deliveries */}
      {tab === 'mydeliveries' && (
        <div className="space-y-4">
          {myDeliveries.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 text-center shadow-md border border-pastel-beige-200">
              <div className="text-5xl mb-4">🚗</div>
              <h3 className="text-xl font-bold text-gray-800">Aucune livraison en cours</h3>
              <p className="text-gray-500">Acceptez une commande prête dans l'onglet « Disponibles »</p>
            </div>
          ) : myDeliveries.map(order => (
            <div key={order.id} className="bg-white rounded-2xl p-6 shadow-lg border-l-4 border-l-purple-500">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h4 className="font-extrabold text-gray-800 text-xl">{order.id}</h4>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${statusLabels[order.status].color}`}>
                    {statusLabels[order.status].label}
                  </span>
                </div>
                <span className="text-2xl font-extrabold text-pastel-pink-500">{order.total}€</span>
              </div>

              <div className="bg-purple-50 rounded-xl p-4 space-y-3 mb-4 border border-purple-100">
                <div className="font-bold text-gray-800 flex items-center gap-2">
                  <span className="text-lg">👤</span> {order.clientName}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Phone size={14} className="text-pastel-blue-500" />
                  <a href={`tel:${order.clientPhone}`} className="text-pastel-blue-600 hover:underline font-medium">
                    {order.clientPhone}
                  </a>
                </div>
                <a
                  href={getGoogleMapsUrl(order.clientAddress)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-2 text-sm bg-pastel-blue-50 hover:bg-pastel-blue-100 p-3 rounded-xl border border-pastel-blue-200 transition-colors group cursor-pointer"
                >
                  <MapPin size={16} className="text-red-500 mt-0.5 flex-shrink-0" />
                  <span className="text-pastel-blue-700 group-hover:underline font-medium flex-1">{order.clientAddress}</span>
                  <ExternalLink size={14} className="text-pastel-blue-400 mt-0.5 flex-shrink-0" />
                </a>
                {order.notes && (
                  <p className="text-sm text-pastel-pink-600 bg-pastel-pink-50 px-3 py-2 rounded-lg">📝 {order.notes}</p>
                )}
              </div>

              <div className="space-y-2 mb-4">
                {order.items.map((item, i) => (
                  <div key={i} className="bg-pastel-beige-50 rounded-lg p-3 text-sm flex justify-between border border-pastel-beige-200">
                    <div>
                      <span className="font-medium">{item.size === 'L' ? '🍰' : '🎂'} Tiramisu {item.size}</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {item.toppings.map(x => (
                          <span key={x} className="text-xs px-2 py-0.5 bg-pastel-pink-200 text-pastel-pink-700 rounded-full">{x}</span>
                        ))}
                        {item.coulis.map(x => (
                          <span key={x} className="text-xs px-2 py-0.5 bg-pastel-blue-200 text-pastel-blue-700 rounded-full">{x}</span>
                        ))}
                      </div>
                    </div>
                    <span className="font-bold text-pastel-pink-500">{item.price}€</span>
                  </div>
                ))}
              </div>

              {/* Google Maps button */}
              <a
                href={getGoogleMapsUrl(order.clientAddress)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 mb-3 bg-pastel-blue-400 text-white rounded-xl font-bold shadow-md hover:bg-pastel-blue-500 transition-all"
              >
                <Navigation size={18} /> Ouvrir dans Google Maps
              </a>

              <button onClick={() => updateOrderStatus(order.id, 'delivered')}
                className="w-full flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-bold shadow-md hover:shadow-lg transition-all">
                <CheckCircle2 size={18} /> Marquer comme livrée
              </button>
            </div>
          ))}
        </div>
      )}

      {/* History */}
      {tab === 'history' && (
        <div className="space-y-3">
          {deliveryHistory.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 text-center shadow-md border border-pastel-beige-200">
              <div className="text-4xl mb-3">📋</div>
              <p className="text-gray-500">Aucune livraison effectuée</p>
            </div>
          ) : deliveryHistory.map(order => (
            <div key={order.id} className="bg-white rounded-2xl p-5 shadow-md border border-pastel-beige-200 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle2 size={18} className="text-green-500" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-800">{order.id}</h4>
                  <p className="text-xs text-gray-500">{order.clientName}</p>
                  <a
                    href={getGoogleMapsUrl(order.clientAddress)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-pastel-blue-500 hover:underline flex items-center gap-1"
                  >
                    <MapPin size={10} /> {order.clientAddress}
                  </a>
                  <p className="text-xs text-gray-400">{new Date(order.createdAt).toLocaleString('fr-FR')}</p>
                </div>
              </div>
              <span className="font-bold text-pastel-pink-500 text-lg">{order.total}€</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
