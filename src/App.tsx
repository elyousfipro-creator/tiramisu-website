import { useStore } from './store';
import { HomePage } from './pages/HomePage';
import { ConfiguratorPage } from './pages/ConfiguratorPage';
import { PresetsPage } from './pages/PresetsPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { LoginPage } from './pages/LoginPage';
import { TrackingPage } from './pages/TrackingPage';
import { AdminDashboard } from './pages/AdminDashboard';
import { KitchenDashboard } from './pages/KitchenDashboard';
import { DeliveryDashboard } from './pages/DeliveryDashboard';
import { VerifyEmailPage } from './pages/VerifyEmailPage';
import { Navbar } from './components/Navbar';

export function App() {
  const currentPage = useStore(s => s.currentPage);
  const currentUser = useStore(s => s.currentUser);

  const renderPage = () => {
    // Role-based dashboard redirects
    if (currentUser) {
      if (currentPage === 'dashboard') {
        switch (currentUser.role) {
          case 'admin': return <AdminDashboard />;
          case 'kitchen': return <KitchenDashboard />;
          case 'delivery': return <DeliveryDashboard />;
          default: break;
        }
      }
      if (currentPage === 'admin' && currentUser.role === 'admin') return <AdminDashboard />;
      if (currentPage === 'kitchen' && currentUser.role === 'kitchen') return <KitchenDashboard />;
      if (currentPage === 'delivery' && currentUser.role === 'delivery') return <DeliveryDashboard />;
    }

    switch (currentPage) {
      case 'home': return <HomePage />;
      case 'configurator': return <ConfiguratorPage />;
      case 'presets': return <PresetsPage />;
      case 'cart': return <CartPage />;
      case 'checkout': return <CheckoutPage />;
      case 'login': return <LoginPage />;
      case 'tracking': return <TrackingPage />;
      case 'verify-email': return <VerifyEmailPage />;
      default: return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pastel-beige-300 via-pastel-pink-200 to-pastel-blue-300">
      <Navbar />
      <main>{renderPage()}</main>
    </div>
  );
}
