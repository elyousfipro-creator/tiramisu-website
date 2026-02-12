import { useState } from 'react';
import { useStore, type OrderStatus } from '../store';
import { ChefHat, Clock, CheckCircle2, Flame, History, Printer } from 'lucide-react';
import { Background } from '../components/Background';

const statusLabels: Record<OrderStatus, { label: string; color: string }> = {
  new: { label: 'Nouvelle', color: 'bg-pastel-blue-100 text-pastel-blue-700 border-pastel-blue-200' },
  preparing: { label: 'En préparation', color: 'bg-yellow-100 text-yellow-700 border-yellow-200' },
  ready: { label: 'Prête', color: 'bg-green-100 text-green-700 border-green-200' },
  delivering: { label: 'En livraison', color: 'bg-purple-100 text-purple-700 border-purple-200' },
  delivered: { label: 'Livrée', color: 'bg-gray-100 text-gray-600 border-gray-200' },
};

export function KitchenDashboard() {
  const { orders, updateOrderStatus } = useStore();
  const [tab, setTab] = useState<'pending' | 'history'>('pending');

  const pendingOrders = orders.filter(o => o.status === 'new' || o.status === 'preparing');
  const todayOrders = orders.filter(o => {
    const orderDate = new Date(o.createdAt);
    const today = new Date();
    return orderDate.toDateString() === today.toDateString();
  });

  const handlePrint = (order: typeof orders[0]) => {
    const printContent = `
══════════════════════════
   CRÈME & COOKIES
   TICKET DE PRÉPARATION
══════════════════════════
Commande: ${order.id}
Date: ${new Date(order.createdAt).toLocaleString('fr-FR')}
Client: ${order.clientName}
──────────────────────────
${order.items.map((item, i) => `
TIRAMISU #${i + 1} - Taille ${item.size}
  Toppings: ${item.toppings.join(', ') || 'Aucun'}
  Coulis: ${item.coulis.join(', ') || 'Aucun'}
  Prix: ${item.price}€
`).join('')}
──────────────────────────
TOTAL: ${order.total}€
${order.notes ? `\nNotes: ${order.notes}` : ''}
══════════════════════════
    `;
    const win = window.open('', '_blank', 'width=400,height=600');
    if (win) {
      win.document.write(`<pre style="font-family:monospace;font-size:14px;padding:20px;">${printContent}</pre>`);
      win.document.close();
      win.print();
    }
  };

  return (
    <div className="relative max-w-6xl mx-auto px-4 py-8">
      <Background />
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-gray-800 flex items-center gap-3">
          <ChefHat className="text-pastel-pink-500" /> Dashboard Cuisine
        </h1>
        <p className="text-gray-500">Crème & Cookies — Gérez les préparations en cours</p>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-pastel-blue-50 rounded-2xl p-4 text-center border border-pastel-blue-200">
          <div className="text-3xl font-extrabold text-pastel-blue-600">{orders.filter(o => o.status === 'new').length}</div>
          <div className="text-sm text-pastel-blue-500 font-medium">Nouvelles</div>
        </div>
        <div className="bg-yellow-50 rounded-2xl p-4 text-center border border-yellow-100">
          <div className="text-3xl font-extrabold text-yellow-600">{orders.filter(o => o.status === 'preparing').length}</div>
          <div className="text-sm text-yellow-500 font-medium">En préparation</div>
        </div>
        <div className="bg-green-50 rounded-2xl p-4 text-center border border-green-100">
          <div className="text-3xl font-extrabold text-green-600">{orders.filter(o => o.status === 'ready').length}</div>
          <div className="text-sm text-green-500 font-medium">Prêtes</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        <button onClick={() => setTab('pending')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium transition-all ${
            tab === 'pending' ? 'bg-pastel-pink-400 text-white shadow-md' : 'bg-white text-gray-600 hover:bg-pastel-pink-50'
          }`}>
          <Flame size={18} /> En attente ({pendingOrders.length})
        </button>
        <button onClick={() => setTab('history')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium transition-all ${
            tab === 'history' ? 'bg-gray-700 text-white shadow-md' : 'bg-white text-gray-600 hover:bg-gray-50'
          }`}>
          <History size={18} /> Historique du jour ({todayOrders.length})
        </button>
      </div>

      {/* Content */}
      {tab === 'pending' && (
        <div className="space-y-4">
          {pendingOrders.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 text-center shadow-md border border-pastel-beige-200">
              <div className="text-5xl mb-4">✅</div>
              <h3 className="text-xl font-bold text-gray-800">Aucune commande en attente</h3>
              <p className="text-gray-500">Tout est à jour !</p>
            </div>
          ) : pendingOrders.map(order => (
            <div key={order.id} className={`bg-white rounded-2xl p-6 shadow-lg border-l-4 ${
              order.status === 'new' ? 'border-l-pastel-blue-400' : 'border-l-yellow-400'
            } hover:shadow-xl transition-all`}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                <div>
                  <div className="flex items-center gap-3">
                    <h4 className="font-extrabold text-gray-800 text-xl">{order.id}</h4>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${statusLabels[order.status].color}`}>
                      {statusLabels[order.status].label}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                    <Clock size={14} /> {new Date(order.createdAt).toLocaleTimeString('fr-FR')} · {order.clientName}
                  </p>
                  {order.notes && (
                    <p className="text-sm text-pastel-pink-600 mt-1 bg-pastel-pink-50 px-3 py-1 rounded-lg inline-block">📝 {order.notes}</p>
                  )}
                </div>
                <div className="text-2xl font-extrabold text-pastel-pink-500">{order.total}€</div>
              </div>

              {/* Items details */}
              <div className="space-y-3 mb-4">
                {order.items.map((item, i) => (
                  <div key={i} className="bg-gradient-to-r from-pastel-beige-50 to-pastel-pink-50 rounded-xl p-4 border border-pastel-beige-200">
                    <div className="flex items-center justify-between mb-2">
                      <h5 className="font-bold text-gray-800">
                        {item.size === 'L' ? '🍰' : '🎂'} Tiramisu {item.size}
                        <span className="text-pastel-pink-500 ml-2">({item.price}€)</span>
                      </h5>
                    </div>
                    {item.toppings.length > 0 && (
                      <div className="mb-2">
                        <span className="text-xs font-bold text-pastel-pink-600 uppercase">Toppings :</span>
                        <div className="flex flex-wrap gap-1.5 mt-1">
                          {item.toppings.map(t => (
                            <span key={t} className="px-3 py-1 bg-pastel-pink-200 text-pastel-pink-700 rounded-lg text-sm font-medium">{t}</span>
                          ))}
                        </div>
                      </div>
                    )}
                    {item.coulis.length > 0 && (
                      <div>
                        <span className="text-xs font-bold text-pastel-blue-600 uppercase">Coulis :</span>
                        <div className="flex flex-wrap gap-1.5 mt-1">
                          {item.coulis.map(c => (
                            <span key={c} className="px-3 py-1 bg-pastel-blue-200 text-pastel-blue-700 rounded-lg text-sm font-medium">{c}</span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Actions */}
              <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-100">
                {order.status === 'new' && (
                  <button onClick={() => updateOrderStatus(order.id, 'preparing')}
                    className="flex items-center gap-2 px-5 py-2.5 bg-yellow-500 text-white rounded-xl font-bold hover:bg-yellow-600 shadow-md transition-all">
                    <Flame size={16} /> Commencer la préparation
                  </button>
                )}
                {order.status === 'preparing' && (
                  <button onClick={() => updateOrderStatus(order.id, 'ready')}
                    className="flex items-center gap-2 px-5 py-2.5 bg-green-500 text-white rounded-xl font-bold hover:bg-green-600 shadow-md transition-all">
                    <CheckCircle2 size={16} /> Marquer comme prête
                  </button>
                )}
                <button onClick={() => handlePrint(order)}
                  className="flex items-center gap-2 px-4 py-2.5 border border-gray-200 text-gray-600 rounded-xl font-medium hover:bg-gray-50 transition-all">
                  <Printer size={16} /> Imprimer ticket
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === 'history' && (
        <div className="space-y-3">
          {todayOrders.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 text-center shadow-md">
              <div className="text-4xl mb-3">📋</div>
              <p className="text-gray-500">Aucune commande aujourd'hui</p>
            </div>
          ) : todayOrders.map(order => (
            <div key={order.id} className="bg-white rounded-2xl p-5 shadow-md border border-pastel-beige-200 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className={`px-3 py-1.5 rounded-full text-xs font-bold ${statusLabels[order.status].color}`}>
                  {statusLabels[order.status].label}
                </span>
                <div>
                  <h4 className="font-bold text-gray-800">{order.id}</h4>
                  <p className="text-xs text-gray-400">
                    {order.clientName} · {new Date(order.createdAt).toLocaleTimeString('fr-FR')}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <span className="font-bold text-pastel-pink-500">{order.total}€</span>
                <p className="text-xs text-gray-400">
                  {order.items.length} tiramisu{order.items.length > 1 ? 's' : ''}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
