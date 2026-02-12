import { useStore } from '../store';
import { ShoppingCart, User, LogOut, Bell, ChefHat, Truck, Shield, Home, CakeSlice, Star } from 'lucide-react';
import logo from '../assets/LOGO CREME ET COOKIES.png';

export function Navbar() {
  const { currentUser, currentPage, setCurrentPage, cart, notifications, logout, markNotificationRead } = useStore();
  const unreadNotifs = notifications.filter(n => !n.read && (!currentUser || n.forRoles.includes(currentUser.role)));

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-lg border-b border-pastel-pink-300 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button onClick={() => setCurrentPage('home')} className="flex items-center gap-2 group">
            <img 
              src={logo} 
              alt="Crème & Cookies" 
              className="h-8 w-8 group-hover:scale-110 transition-transform"
            />
            <span className="text-xl font-bold bg-gradient-to-r from-pastel-pink-500 to-pastel-blue-500 bg-clip-text text-transparent hidden sm:block">
              Crème & Cookies
            </span>
          </button>

          {/* Nav links */}
          <div className="flex items-center gap-1 sm:gap-2">
            <NavBtn active={currentPage === 'home'} onClick={() => setCurrentPage('home')}>
              <Home size={18} />
              <span className="hidden sm:inline">Accueil</span>
            </NavBtn>
            <NavBtn active={currentPage === 'configurator'} onClick={() => setCurrentPage('configurator')}>
              <CakeSlice size={18} />
              <span className="hidden sm:inline">Composer</span>
            </NavBtn>
            <NavBtn active={currentPage === 'presets'} onClick={() => setCurrentPage('presets')}>
              <Star size={18} />
              <span className="hidden sm:inline">Préfaits</span>
            </NavBtn>

            {currentUser && currentUser.role !== 'client' && (
              <NavBtn active={currentPage === 'dashboard'} onClick={() => setCurrentPage('dashboard')}>
                {currentUser.role === 'admin' && <Shield size={18} />}
                {currentUser.role === 'kitchen' && <ChefHat size={18} />}
                {currentUser.role === 'delivery' && <Truck size={18} />}
                <span className="hidden sm:inline">Dashboard</span>
              </NavBtn>
            )}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-2">
            {/* Notifications */}
            {currentUser && (
              <div className="relative group">
                <button className="relative p-2 rounded-xl hover:bg-pastel-blue-50 transition-colors">
                  <Bell size={20} className="text-pastel-blue-600" />
                  {unreadNotifs.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-pastel-pink-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                      {unreadNotifs.length}
                    </span>
                  )}
                </button>
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-pastel-pink-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 max-h-96 overflow-y-auto z-50">
                  <div className="p-3 border-b border-pastel-pink-100 font-semibold text-pastel-blue-700">Notifications</div>
                  {unreadNotifs.length === 0 ? (
                    <div className="p-4 text-gray-400 text-sm text-center">Aucune notification</div>
                  ) : (
                    unreadNotifs.slice(0, 10).map(n => (
                      <button key={n.id} onClick={() => markNotificationRead(n.id)}
                        className="w-full text-left p-3 hover:bg-pastel-beige-50 border-b border-pastel-beige-100 transition-colors">
                        <div className="text-sm text-gray-700">{n.message}</div>
                        <div className="text-xs text-gray-400 mt-1">
                          {new Date(n.timestamp).toLocaleTimeString('fr-FR')}
                        </div>
                      </button>
                    ))
                  )}
                </div>
              </div>
            )}

            {/* Cart */}
            <button onClick={() => setCurrentPage('cart')}
              className="relative p-2 rounded-xl hover:bg-pastel-pink-50 transition-colors">
              <ShoppingCart size={20} className="text-pastel-pink-600" />
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-pastel-pink-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                  {cart.length}
                </span>
              )}
            </button>

            {/* User */}
            {currentUser ? (
              <div className="flex items-center gap-2">
                <span className="text-sm text-pastel-blue-700 font-medium hidden md:block">{currentUser.name}</span>
                <button onClick={logout} className="p-2 rounded-xl hover:bg-red-100 transition-colors" title="Déconnexion">
                  <LogOut size={18} className="text-red-400" />
                </button>
              </div>
            ) : (
              <button onClick={() => setCurrentPage('login')}
                className="flex items-center gap-1 px-3 py-2 rounded-xl bg-gradient-to-r from-pastel-pink-400 to-pastel-blue-400 text-white hover:from-pastel-pink-500 hover:to-pastel-blue-500 transition-colors text-sm font-medium">
                <User size={16} />
                <span className="hidden sm:inline">Connexion</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

function NavBtn({ children, active, onClick }: { children: React.ReactNode; active: boolean; onClick: () => void }) {
  return (
    <button onClick={onClick}
      className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium transition-all ${
        active ? 'bg-pastel-blue-100 text-pastel-blue-700 shadow-sm' : 'text-gray-600 hover:bg-pastel-beige-100 hover:text-pastel-blue-600'
      }`}>
      {children}
    </button>
  );
}
