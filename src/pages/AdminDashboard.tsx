import { useState } from 'react';
import { useStore, type OrderStatus, type UserRole } from '../store';
import { BarChart3, Users, Package, Settings, TrendingUp, DollarSign, Eye, UserPlus, ToggleLeft, ToggleRight, Trash2, Calendar } from 'lucide-react';
import { Background } from '../components/Background';

const statusLabels: Record<OrderStatus, { label: string; color: string }> = {
  new: { label: 'Nouvelle', color: 'bg-pastel-blue-100 text-pastel-blue-700' },
  preparing: { label: 'En préparation', color: 'bg-yellow-100 text-yellow-700' },
  ready: { label: 'Prête', color: 'bg-green-100 text-green-700' },
  delivering: { label: 'En livraison', color: 'bg-purple-100 text-purple-700' },
  delivered: { label: 'Livrée', color: 'bg-gray-100 text-gray-600' },
};

export function AdminDashboard() {
  const store = useStore();
  const [tab, setTab] = useState<'stats' | 'orders' | 'products' | 'users'>('stats');
  const [newUserForm, setNewUserForm] = useState({ name: '', email: '', password: '', role: 'kitchen' as UserRole });
  const [showAddUser, setShowAddUser] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState<string>('all');
  const [selectedYear, setSelectedYear] = useState<string>('all');

  const stats = store.getStats();

  const tabs = [
    { id: 'stats' as const, label: 'Statistiques', icon: <BarChart3 size={18} /> },
    { id: 'orders' as const, label: 'Commandes', icon: <Package size={18} /> },
    { id: 'products' as const, label: 'Produits', icon: <Settings size={18} /> },
    { id: 'users' as const, label: 'Utilisateurs', icon: <Users size={18} /> },
  ];

  return (
    <div className="relative max-w-7xl mx-auto px-4 py-8">
      <Background />
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-gray-800">👑 Dashboard Admin</h1>
        <p className="text-gray-500">Gestion complète — Crème & Cookies</p>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-8 bg-white rounded-2xl p-2 shadow-md border border-pastel-beige-200">
        {tabs.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
              tab === t.id ? 'bg-gradient-to-r from-pastel-pink-400 to-pastel-blue-400 text-white shadow-md' : 'text-gray-600 hover:bg-pastel-beige-50'
            }`}>
            {t.icon} {t.label}
          </button>
        ))}
      </div>

      {/* Stats tab */}
      {tab === 'stats' && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: 'Commandes', value: stats.totalOrders, icon: <Package />, color: 'from-pastel-blue-400 to-pastel-blue-500' },
              { label: 'Revenus', value: `${stats.totalRevenue}€`, icon: <DollarSign />, color: 'from-green-400 to-green-500' },
              { label: 'En attente', value: stats.ordersByStatus.new + stats.ordersByStatus.preparing, icon: <Eye />, color: 'from-pastel-pink-400 to-pastel-pink-500' },
              { label: 'Livrées', value: stats.ordersByStatus.delivered, icon: <TrendingUp />, color: 'from-purple-400 to-purple-500' },
            ].map((kpi, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 shadow-md border border-pastel-beige-200">
                <div className={`w-10 h-10 bg-gradient-to-br ${kpi.color} rounded-xl flex items-center justify-center text-white mb-3`}>
                  {kpi.icon}
                </div>
                <p className="text-2xl font-extrabold text-gray-800">{kpi.value}</p>
                <p className="text-sm text-gray-500">{kpi.label}</p>
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl p-6 shadow-md border border-pastel-beige-200">
              <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">🍫 Toppings populaires</h3>
              <div className="space-y-3">
                {stats.popularToppings.length === 0 ? (
                  <p className="text-gray-400 text-sm">Pas encore de données</p>
                ) : stats.popularToppings.map((t, i) => (
                  <div key={t.name} className="flex items-center gap-3">
                    <span className="text-sm font-medium text-gray-600 w-32 truncate">{t.name}</span>
                    <div className="flex-1 bg-gray-100 rounded-full h-6 overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-pastel-pink-300 to-pastel-pink-400 rounded-full flex items-center justify-end px-2 transition-all"
                        style={{ width: `${Math.max(20, (t.count / Math.max(...stats.popularToppings.map(x => x.count))) * 100)}%` }}>
                        <span className="text-xs text-white font-bold">{t.count}</span>
                      </div>
                    </div>
                    {i === 0 && <span className="text-xs">🥇</span>}
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-md border border-pastel-beige-200">
              <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">🍯 Coulis populaires</h3>
              <div className="space-y-3">
                {stats.popularCoulis.length === 0 ? (
                  <p className="text-gray-400 text-sm">Pas encore de données</p>
                ) : stats.popularCoulis.map((c, i) => (
                  <div key={c.name} className="flex items-center gap-3">
                    <span className="text-sm font-medium text-gray-600 w-32 truncate">{c.name}</span>
                    <div className="flex-1 bg-gray-100 rounded-full h-6 overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-pastel-blue-300 to-pastel-blue-400 rounded-full flex items-center justify-end px-2 transition-all"
                        style={{ width: `${Math.max(20, (c.count / Math.max(...stats.popularCoulis.map(x => x.count))) * 100)}%` }}>
                        <span className="text-xs text-white font-bold">{c.count}</span>
                      </div>
                    </div>
                    {i === 0 && <span className="text-xs">🥇</span>}
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-md border border-pastel-beige-200">
              <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">📏 Répartition des tailles</h3>
              <div className="flex items-center gap-8 justify-center py-4">
                {[
                  { size: 'L', count: stats.sizeDistribution.L, emoji: '🍰' },
                  { size: 'XL', count: stats.sizeDistribution.XL, emoji: '🎂' },
                ].map(s => (
                  <div key={s.size} className="text-center">
                    <div className="text-4xl mb-2">{s.emoji}</div>
                    <div className="text-3xl font-extrabold text-pastel-pink-500">{s.count}</div>
                    <div className="text-sm text-gray-500">Taille {s.size}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-md border border-pastel-beige-200">
              <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">📦 Statuts des commandes</h3>
              <div className="space-y-2">
                {(Object.entries(stats.ordersByStatus) as [OrderStatus, number][]).map(([status, count]) => (
                  <div key={status} className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusLabels[status].color}`}>
                      {statusLabels[status].label}
                    </span>
                    <span className="font-bold text-gray-700">{count}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Orders tab */}
      {tab === 'orders' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h3 className="font-bold text-gray-800 text-lg">Toutes les commandes</h3>
            <div className="flex items-center gap-2">
              <Calendar size={16} className="text-gray-400" />
              <select 
                value={selectedMonth} 
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-pastel-blue-300"
              >
                <option value="all">Tous les mois</option>
                <option value="0">Janvier</option>
                <option value="1">Février</option>
                <option value="2">Mars</option>
                <option value="3">Avril</option>
                <option value="4">Mai</option>
                <option value="5">Juin</option>
                <option value="6">Juillet</option>
                <option value="7">Août</option>
                <option value="8">Septembre</option>
                <option value="9">Octobre</option>
                <option value="10">Novembre</option>
                <option value="11">Décembre</option>
              </select>
              <select 
                value={selectedYear} 
                onChange={(e) => setSelectedYear(e.target.value)}
                className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-pastel-blue-300"
              >
                <option value="all">Toutes les années</option>
                <option value="2024">2024</option>
                <option value="2025">2025</option>
                <option value="2026">2026</option>
              </select>
            </div>
          </div>
          {(() => {
            const filteredOrders = store.orders.filter(order => {
              const orderDate = new Date(order.createdAt);
              const monthMatch = selectedMonth === 'all' || orderDate.getMonth() === parseInt(selectedMonth);
              const yearMatch = selectedYear === 'all' || orderDate.getFullYear() === parseInt(selectedYear);
              return monthMatch && yearMatch;
            });
            
            if (filteredOrders.length === 0) {
              return (
                <div className="bg-white rounded-2xl p-12 text-center shadow-md">
                  <div className="text-4xl mb-3">📦</div>
                  <p className="text-gray-500">Aucune commande pour cette période</p>
                </div>
              );
            }
            
            return filteredOrders.map(order => (
              <div key={order.id} className="bg-white rounded-2xl p-6 shadow-md border border-pastel-beige-200 hover:shadow-lg transition-all">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                  <div>
                    <h4 className="font-bold text-gray-800 text-lg">{order.id}</h4>
                    <p className="text-sm text-gray-500">{order.clientName} · {order.clientPhone}</p>
                    <p className="text-xs text-gray-400">{new Date(order.createdAt).toLocaleString('fr-FR')}</p>
                    {order.notes && <p className="text-xs text-pastel-pink-600 mt-1">📝 {order.notes}</p>}
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`px-3 py-1.5 rounded-full text-xs font-bold ${statusLabels[order.status].color}`}>
                      {statusLabels[order.status].label}
                    </span>
                    <span className="text-xl font-extrabold text-pastel-pink-500">{order.total}€</span>
                    <button 
                      onClick={() => {
                        if (confirm('Êtes-vous sûr de vouloir supprimer cette commande ?')) {
                          store.deleteOrder(order.id);
                        }
                      }}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      title="Supprimer la commande"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
                <div className="space-y-2">
                  {order.items.map((item, i) => (
                    <div key={i} className="bg-pastel-beige-50 rounded-xl p-3 flex items-center justify-between text-sm">
                      <div>
                        <span className="font-medium">{item.size === 'L' ? '🍰' : '🎂'} Tiramisu {item.size}</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {item.toppings.map(t => <span key={t} className="text-xs px-2 py-0.5 bg-pastel-pink-100 text-pastel-pink-600 rounded-full">{t}</span>)}
                          {item.coulis.map(c => <span key={c} className="text-xs px-2 py-0.5 bg-pastel-blue-100 text-pastel-blue-600 rounded-full">{c}</span>)}
                        </div>
                      </div>
                      <span className="font-bold text-pastel-pink-500">{item.price}€</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t flex flex-wrap gap-2">
                  {(['new', 'preparing', 'ready', 'delivering', 'delivered'] as OrderStatus[]).map(s => (
                    <button key={s} onClick={() => store.updateOrderStatus(order.id, s)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                        order.status === s
                          ? 'bg-gradient-to-r from-pastel-pink-400 to-pastel-blue-400 text-white shadow-md'
                          : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                      }`}>
                      {statusLabels[s].label}
                    </button>
                  ))}
                </div>
              </div>
            ));
          })()}
        </div>
      )}

      {/* Products tab */}
      {tab === 'products' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6 shadow-md border border-pastel-beige-200">
            <h3 className="font-bold text-gray-800 text-lg mb-4">💰 Prix de base</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {(['L', 'XL'] as const).map(size => (
                <div key={size} className="flex items-center gap-4 p-4 bg-pastel-beige-50 rounded-xl">
                  <span className="text-3xl">{size === 'L' ? '🍰' : '🎂'}</span>
                  <div className="flex-1">
                    <label className="text-sm font-medium text-gray-700">Taille {size}</label>
                    <div className="flex items-center gap-2 mt-1">
                      <input type="number" value={store.prices[size]}
                        onChange={e => store.updatePrice(size, Number(e.target.value))}
                        className="w-24 px-3 py-2 border rounded-lg text-lg font-bold text-pastel-pink-500" min={0} />
                      <span className="text-gray-500">€</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-md border border-pastel-beige-200">
            <h3 className="font-bold text-gray-800 text-lg mb-4">🍫 Toppings</h3>
            <div className="grid sm:grid-cols-2 gap-3">
              {store.toppings.map(t => (
                <div key={t.id} className={`flex items-center justify-between p-4 rounded-xl border transition-all ${
                  t.active ? 'border-green-200 bg-green-50' : 'border-gray-200 bg-gray-50 opacity-60'
                }`}>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{t.emoji}</span>
                    <span className="font-medium text-gray-700">{t.name}</span>
                  </div>
                  <button onClick={() => store.toggleTopping(t.id)} className="text-xl">
                    {t.active ? <ToggleRight size={28} className="text-green-500" /> : <ToggleLeft size={28} className="text-gray-400" />}
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-md border border-pastel-beige-200">
            <h3 className="font-bold text-gray-800 text-lg mb-4">🍯 Coulis</h3>
            <div className="grid sm:grid-cols-2 gap-3">
              {store.coulisList.map(c => (
                <div key={c.id} className={`flex items-center justify-between p-4 rounded-xl border transition-all ${
                  c.active ? 'border-green-200 bg-green-50' : 'border-gray-200 bg-gray-50 opacity-60'
                }`}>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{c.emoji}</span>
                    <span className="font-medium text-gray-700">{c.name}</span>
                  </div>
                  <button onClick={() => store.toggleCoulis(c.id)} className="text-xl">
                    {c.active ? <ToggleRight size={28} className="text-green-500" /> : <ToggleLeft size={28} className="text-gray-400" />}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Users tab */}
      {tab === 'users' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-gray-800 text-lg">Gestion des utilisateurs</h3>
            <button onClick={() => setShowAddUser(!showAddUser)}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-pastel-pink-400 to-pastel-blue-400 text-white rounded-xl font-medium hover:shadow-lg transition-all">
              <UserPlus size={16} /> Ajouter
            </button>
          </div>

          {showAddUser && (
            <div className="bg-white rounded-2xl p-6 shadow-md border border-pastel-pink-200 space-y-4">
              <h4 className="font-bold text-gray-800">Nouvel utilisateur</h4>
              <div className="grid sm:grid-cols-2 gap-4">
                <input type="text" placeholder="Nom" value={newUserForm.name}
                  onChange={e => setNewUserForm(f => ({ ...f, name: e.target.value }))}
                  className="px-4 py-2 border rounded-xl outline-none focus:ring-2 focus:ring-pastel-blue-300" />
                <input type="email" placeholder="Email" value={newUserForm.email}
                  onChange={e => setNewUserForm(f => ({ ...f, email: e.target.value }))}
                  className="px-4 py-2 border rounded-xl outline-none focus:ring-2 focus:ring-pastel-blue-300" />
                <input type="password" placeholder="Mot de passe" value={newUserForm.password}
                  onChange={e => setNewUserForm(f => ({ ...f, password: e.target.value }))}
                  className="px-4 py-2 border rounded-xl outline-none focus:ring-2 focus:ring-pastel-blue-300" />
                <select value={newUserForm.role}
                  onChange={e => setNewUserForm(f => ({ ...f, role: e.target.value as UserRole }))}
                  className="px-4 py-2 border rounded-xl outline-none focus:ring-2 focus:ring-pastel-blue-300">
                  <option value="kitchen">Cuisine</option>
                  <option value="delivery">Livreur</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <button onClick={() => {
                if (newUserForm.name && newUserForm.email && newUserForm.password) {
                  store.addUser({ ...newUserForm, active: true });
                  setNewUserForm({ name: '', email: '', password: '', role: 'kitchen' });
                  setShowAddUser(false);
                }
              }}
                className="px-6 py-2 bg-green-500 text-white rounded-xl font-medium hover:bg-green-600">
                Créer
              </button>
            </div>
          )}

          <div className="space-y-3">
            {store.users.map(user => (
              <div key={user.id} className={`bg-white rounded-2xl p-5 shadow-md border flex items-center justify-between transition-all ${
                user.active ? 'border-pastel-beige-200' : 'border-red-200 opacity-60'
              }`}>
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${
                    user.role === 'admin' ? 'bg-purple-400' :
                    user.role === 'kitchen' ? 'bg-pastel-pink-400' :
                    user.role === 'delivery' ? 'bg-pastel-blue-400' : 'bg-gray-400'
                  }`}>
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">{user.name}</h4>
                    <p className="text-sm text-gray-500">{user.email}</p>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                      user.role === 'admin' ? 'bg-purple-100 text-purple-700' :
                      user.role === 'kitchen' ? 'bg-pastel-pink-100 text-pastel-pink-600' :
                      user.role === 'delivery' ? 'bg-pastel-blue-100 text-pastel-blue-600' : 'bg-gray-100 text-gray-600'
                    }`}>
                      {user.role}
                    </span>
                  </div>
                </div>
                <button onClick={() => store.toggleUserActive(user.id)}>
                  {user.active
                    ? <ToggleRight size={28} className="text-green-500" />
                    : <ToggleLeft size={28} className="text-gray-400" />}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
