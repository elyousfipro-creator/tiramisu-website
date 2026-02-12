import { create } from 'zustand';
import { sendEmail, emailTemplates } from './services/email';

// Types
export type Size = 'L' | 'XL';
export type OrderStatus = 'new' | 'preparing' | 'ready' | 'delivering' | 'delivered';
export type UserRole = 'admin' | 'kitchen' | 'delivery' | 'client';

export interface Topping {
  id: string;
  name: string;
  emoji: string;
  active: boolean;
}

export interface Coulis {
  id: string;
  name: string;
  emoji: string;
  active: boolean;
}

export interface TiramisuItem {
  id: string;
  size: Size;
  toppings: string[];
  coulis: string[];
  price: number;
}

export interface Order {
  id: string;
  items: TiramisuItem[];
  total: number;
  status: OrderStatus;
  clientName: string;
  clientPhone: string;
  clientAddress: string;
  createdAt: string;
  assignedDriver?: string;
  notes: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: UserRole;
  active: boolean;
}

export interface Notification {
  id: string;
  message: string;
  type: 'info' | 'success' | 'warning';
  timestamp: string;
  read: boolean;
  forRoles: UserRole[];
}

interface AppState {
  // Auth
  currentUser: User | null;
  users: User[];
  login: (email: string, password: string) => boolean;
  logout: () => void;
  registerClient: (name: string, email: string, password: string) => boolean;

  // Products
  toppings: Topping[];
  coulisList: Coulis[];
  prices: { L: number; XL: number };
  toggleTopping: (id: string) => void;
  toggleCoulis: (id: string) => void;
  updatePrice: (size: Size, price: number) => void;

  // Cart
  cart: TiramisuItem[];
  addToCart: (item: TiramisuItem) => void;
  removeFromCart: (id: string) => void;
  updateCartItem: (id: string, item: TiramisuItem) => void;
  clearCart: () => void;

  // Orders
  orders: Order[];
  placeOrder: (clientName: string, clientPhone: string, clientAddress: string, notes: string) => string;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  assignDriver: (orderId: string, driverName: string) => void;
  deleteOrder: (orderId: string) => void;

  // Notifications
  notifications: Notification[];
  addNotification: (message: string, type: 'info' | 'success' | 'warning', forRoles: UserRole[]) => void;
  markNotificationRead: (id: string) => void;

  // Favorites
  favorites: TiramisuItem[];
  addFavorite: (item: TiramisuItem) => void;
  removeFavorite: (id: string) => void;

  // Loyalty
  loyaltyPoints: Record<string, number>; // userId -> completed orders count
  getLoyaltyInfo: (userId: string) => { totalOrders: number; currentTier: string; currentProgress: number; nextReward: string; emoji: string };

  // Users management
  addUser: (user: Omit<User, 'id'>) => void;
  toggleUserActive: (id: string) => void;

  // Navigation
  currentPage: string;
  setCurrentPage: (page: string) => void;

  // Stats
  getStats: () => {
    totalOrders: number;
    totalRevenue: number;
    popularToppings: { name: string; count: number }[];
    popularCoulis: { name: string; count: number }[];
    sizeDistribution: { L: number; XL: number };
    ordersByStatus: Record<OrderStatus, number>;
  };
}

const generateId = () => Math.random().toString(36).substring(2, 9) + Date.now().toString(36);

export const calculatePrice = (size: Size, toppings: string[], coulis: string[], prices: { L: number; XL: number }): number => {
  const basePrice = size === 'L' ? prices.L : prices.XL;
  const totalExtras = toppings.length + coulis.length;
  const extraCost = Math.max(0, totalExtras - 1) * 1;
  return basePrice + extraCost;
};

const defaultToppings: Topping[] = [
  { id: 'kinder', name: 'Kinder Bueno', emoji: '🍫', active: true },
  { id: 'kinder-white', name: 'Kinder Bueno White', emoji: '🤍', active: true },
  { id: 'speculoos', name: 'Spéculoos', emoji: '🍪', active: true },
  { id: 'oreo', name: 'Oreo', emoji: '🖤', active: true },
  { id: 'twix', name: 'Twix', emoji: '🍬', active: true },
  { id: 'cookies', name: 'Cookies', emoji: '🍪', active: true },
  { id: 'mms', name: "M&M's", emoji: '🌈', active: true },
];

const defaultCoulis: Coulis[] = [
  { id: 'chocolat', name: 'Coulis Chocolat', emoji: '🍫', active: true },
  { id: 'nutella', name: 'Nutella', emoji: '🫙', active: true },
  { id: 'speculoos-coulis', name: 'Coulis Spéculoos', emoji: '🍯', active: true },
  { id: 'caramel', name: 'Caramel', emoji: '🍮', active: true },
];

const defaultUsers: User[] = [
  { id: 'admin1', name: 'Administrateur', email: 'admin@cremecookies.fr', password: 'Ayoub1821305!', role: 'admin', active: true },
  { id: 'kitchen1', name: 'Chef Cuisine', email: 'cuisine@cremecookies.fr', password: 'Ayoub1821305!', role: 'kitchen', active: true },
  { id: 'delivery1', name: 'Livreur Ali', email: 'livreur@cremecookies.fr', password: 'Ayoub1821305!', role: 'delivery', active: true },
];

const sampleOrders: Order[] = [
  {
    id: 'CMD-001',
    items: [{ id: 's1', size: 'XL', toppings: ['Oreo', 'Kinder Bueno'], coulis: ['Nutella'], price: 12 }],
    total: 12,
    status: 'preparing',
    clientName: 'Marie Dupont',
    clientPhone: '06 12 34 56 78',
    clientAddress: '12 Rue de la Paix, 75002 Paris',
    createdAt: new Date(Date.now() - 30 * 60000).toISOString(),
    notes: '',
  },
  {
    id: 'CMD-002',
    items: [{ id: 's2', size: 'L', toppings: ['Spéculoos'], coulis: ['Caramel', 'Nutella'], price: 7 }],
    total: 7,
    status: 'ready',
    clientName: 'Jean Martin',
    clientPhone: '06 98 76 54 32',
    clientAddress: '5 Avenue des Champs, 75008 Paris',
    createdAt: new Date(Date.now() - 60 * 60000).toISOString(),
    notes: 'Sonner 2 fois',
  },
  {
    id: 'CMD-003',
    items: [
      { id: 's3', size: 'XL', toppings: ['Kinder Bueno', "M&M's", 'Cookies'], coulis: ['Coulis Chocolat'], price: 13 },
      { id: 's4', size: 'L', toppings: ['Oreo'], coulis: ['Caramel'], price: 6 },
    ],
    total: 19,
    status: 'delivered',
    clientName: 'Sophie Bernard',
    clientPhone: '06 55 44 33 22',
    clientAddress: '28 Bd Haussmann, 75009 Paris',
    createdAt: new Date(Date.now() - 3 * 3600000).toISOString(),
    assignedDriver: 'Livreur Ali',
    notes: '',
  },
];

export const useStore = create<AppState>((set, get) => ({
  // Auth
  currentUser: null,
  users: defaultUsers,
  login: (email, password) => {
    const user = get().users.find(u => u.email === email && u.password === password && u.active);
    if (user) {
      set({ currentUser: user });
      return true;
    }
    return false;
  },
  logout: () => set({ currentUser: null, currentPage: 'home' }),
  registerClient: (name, email, password) => {
    const exists = get().users.find(u => u.email === email);
    if (exists) return false;
    const newUser: User = { id: generateId(), name, email, password, role: 'client', active: true };
    set(s => ({ users: [...s.users, newUser], currentUser: newUser }));
    return true;
  },

  // Products
  toppings: defaultToppings,
  coulisList: defaultCoulis,
  prices: { L: 5, XL: 10 },
  toggleTopping: (id) => set(s => ({
    toppings: s.toppings.map(t => t.id === id ? { ...t, active: !t.active } : t)
  })),
  toggleCoulis: (id) => set(s => ({
    coulisList: s.coulisList.map(c => c.id === id ? { ...c, active: !c.active } : c)
  })),
  updatePrice: (size, price) => set(s => ({ prices: { ...s.prices, [size]: price } })),

  // Cart
  cart: [],
  addToCart: (item) => set(s => ({ cart: [...s.cart, item] })),
  removeFromCart: (id) => set(s => ({ cart: s.cart.filter(i => i.id !== id) })),
  updateCartItem: (id, item) => set(s => ({
    cart: s.cart.map(i => i.id === id ? item : i)
  })),
  clearCart: () => set({ cart: [] }),

  // Orders
  orders: sampleOrders,
  placeOrder: (clientName, clientPhone, clientAddress, notes) => {
    const cart = get().cart;
    if (cart.length === 0) return '';
    const orderId = 'CMD-' + String(get().orders.length + 1).padStart(3, '0');
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    const order: Order = {
      id: orderId,
      items: cart,
      total,
      status: 'new',
      clientName,
      clientPhone,
      clientAddress,
      createdAt: new Date().toISOString(),
      notes,
    };
    set(s => ({ orders: [order, ...s.orders], cart: [] }));
    get().addNotification(`Nouvelle commande ${orderId} de ${clientName}`, 'info', ['admin', 'kitchen']);
    return orderId;
  },
  updateOrderStatus: (orderId, status) => {
    set(s => ({
      orders: s.orders.map(o => o.id === orderId ? { ...o, status } : o)
    }));
    const statusLabels: Record<OrderStatus, string> = {
      new: 'Nouvelle', preparing: 'En préparation', ready: 'Prête',
      delivering: 'En livraison', delivered: 'Livrée'
    };
    get().addNotification(
      `Commande ${orderId} : ${statusLabels[status]}`,
      status === 'delivered' ? 'success' : 'info',
      ['admin', 'kitchen', 'delivery']
    );
  },
  assignDriver: (orderId, driverName) => {
    set(s => ({
      orders: s.orders.map(o => o.id === orderId ? { ...o, assignedDriver: driverName } : o)
    }));
  },
  deleteOrder: (orderId) => {
    set(s => ({
      orders: s.orders.filter(o => o.id !== orderId)
    }));
  },

  // Notifications
  notifications: [],
  addNotification: (message, type, forRoles) => {
    const notif: Notification = {
      id: generateId(),
      message,
      type,
      timestamp: new Date().toISOString(),
      read: false,
      forRoles,
    };
    set(s => ({ notifications: [notif, ...s.notifications].slice(0, 50) }));
  },
  markNotificationRead: (id) => set(s => ({
    notifications: s.notifications.map(n => n.id === id ? { ...n, read: true } : n)
  })),

  // Favorites
  favorites: [],
  addFavorite: (item) => set(s => ({ favorites: [...s.favorites, { ...item, id: generateId() }] })),
  removeFavorite: (id) => set(s => ({ favorites: s.favorites.filter(f => f.id !== id) })),

  // Loyalty
  loyaltyPoints: {},
  getLoyaltyInfo: (_userId: string) => {
    const orders = get().orders.filter(o => o.status === 'delivered');
    const totalOrders = orders.length;
    const cyclePosition = totalOrders % 18;
    let currentTier = 'Bronze';
    let emoji = '🥉';
    let currentProgress = 0;
    let nextReward = '🍪 1 Cookie';

    if (cyclePosition < 6) {
      currentTier = 'Bronze';
      emoji = '🥉';
      currentProgress = cyclePosition;
      nextReward = '🍪 1 Cookie';
    } else if (cyclePosition < 12) {
      currentTier = 'Argent';
      emoji = '🥈';
      currentProgress = cyclePosition - 6;
      nextReward = '🍰 1 Mini Tiramisu';
    } else {
      currentTier = 'Or';
      emoji = '🥇';
      currentProgress = cyclePosition - 12;
      nextReward = '🎂 1 Tiramisu XL au choix';
    }

    return { totalOrders, currentTier, currentProgress, nextReward, emoji };
  },

  // Users management
  addUser: async (user) => {
    const newUser = { ...user, id: generateId() };
    set(s => ({ users: [...s.users, newUser] }));
    
    // Send welcome email
    if (user.email) {
      try {
        await sendEmail({
          to: user.email,
          ...emailTemplates.welcome(user.name)
        });
      } catch (error) {
        console.error('Failed to send welcome email:', error);
      }
    }
    
    return newUser;
  },
  toggleUserActive: (id) => set(s => ({
    users: s.users.map(u => u.id === id ? { ...u, active: !u.active } : u)
  })),

  // Navigation
  currentPage: 'home',
  setCurrentPage: (page) => set({ currentPage: page }),

  // Stats
  getStats: () => {
    const orders = get().orders;
    const totalOrders = orders.length;
    const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);

    const toppingCount: Record<string, number> = {};
    const coulisCount: Record<string, number> = {};
    let lCount = 0, xlCount = 0;

    orders.forEach(o => {
      o.items.forEach(item => {
        if (item.size === 'L') lCount++; else xlCount++;
        item.toppings.forEach(t => { toppingCount[t] = (toppingCount[t] || 0) + 1; });
        item.coulis.forEach(c => { coulisCount[c] = (coulisCount[c] || 0) + 1; });
      });
    });

    const popularToppings = Object.entries(toppingCount)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);

    const popularCoulis = Object.entries(coulisCount)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);

    const ordersByStatus: Record<OrderStatus, number> = { new: 0, preparing: 0, ready: 0, delivering: 0, delivered: 0 };
    orders.forEach(o => { ordersByStatus[o.status]++; });

    return { totalOrders, totalRevenue, popularToppings, popularCoulis, sizeDistribution: { L: lCount, XL: xlCount }, ordersByStatus };
  },
}));
