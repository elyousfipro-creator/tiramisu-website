import { useState } from 'react';
import { useStore, calculatePrice, type Size } from '../store';
import { Check, Plus, ShoppingCart, Heart, ArrowRight, ArrowLeft } from 'lucide-react';

// Import topping images
import kinderBuenoImg from '../assets/TOOPPINGS KINDER BUENO.jpg';
import kinderBuenoWhiteImg from '../assets/TOOPPINGS KINDER BUENO WHITE.jpg';
import oreoImg from '../assets/TOPPING OREO.webp';
import cookieImg from '../assets/TOPPING COOKIE.jpg';
import mmsImg from '../assets/TOPPINGS M&M\'S.jpg';
import twixImg from '../assets/TOPPINGS TWIX.jpg';
import speculosImg from '../assets/TOPPING SPECULOS.jpg';
// Import coulis images
import coulisChocolatImg from '../assets/COULIS CHOCOLAT .png';
import coulisCaramelImg from '../assets/COULIS CARAMEL.png';
import coulisSpeculosImg from '../assets/COULIS SPECULOS.png';
import coulisNutellaImg from '../assets/Coulis nutella.jpg';

const toppingImages: Record<string, string> = {
  'Kinder Bueno': kinderBuenoImg,
  'Kinder Bueno White': kinderBuenoWhiteImg,
  'Oreo': oreoImg,
  'Cookies': cookieImg,
  "M&M's": mmsImg,
  'Twix': twixImg,
  'Spéculoos': speculosImg,
};

const coulisImages: Record<string, string> = {
  'Coulis Chocolat': coulisChocolatImg,
  'Caramel': coulisCaramelImg,
  'Coulis Spéculoos': coulisSpeculosImg,
  'Nutella': coulisNutellaImg,
};

export function ConfiguratorPage() {
  const { toppings, coulisList, prices, addToCart, addFavorite, currentUser, setCurrentPage, favorites } = useStore();
  const [step, setStep] = useState(1);
  const [size, setSize] = useState<Size>('XL');
  const [selectedToppings, setSelectedToppings] = useState<string[]>([]);
  const [selectedCoulis, setSelectedCoulis] = useState<string[]>([]);
  const [showSuccess, setShowSuccess] = useState(false);

  const activeToppings = toppings.filter(t => t.active);
  const activeCoulis = coulisList.filter(c => c.active);
  const totalPrice = calculatePrice(size, selectedToppings, selectedCoulis, prices);
  const totalExtras = selectedToppings.length + selectedCoulis.length;

  const toggleTopping = (name: string) => {
    setSelectedToppings(prev => prev.includes(name) ? prev.filter(t => t !== name) : [...prev, name]);
  };

  const toggleCoulisItem = (name: string) => {
    setSelectedCoulis(prev => prev.includes(name) ? prev.filter(c => c !== name) : [...prev, name]);
  };

  const handleAddToCart = () => {
    if (selectedToppings.length === 0 && selectedCoulis.length === 0) return;
    addToCart({
      id: Math.random().toString(36).substring(2, 9),
      size,
      toppings: selectedToppings,
      coulis: selectedCoulis,
      price: totalPrice,
    });
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleSaveFavorite = () => {
    addFavorite({ id: '', size, toppings: selectedToppings, coulis: selectedCoulis, price: totalPrice });
  };

  const loadFavorite = (fav: typeof favorites[0]) => {
    setSize(fav.size);
    setSelectedToppings(fav.toppings);
    setSelectedCoulis(fav.coulis);
    setStep(3);
  };

  const resetConfig = () => {
    setSize('XL');
    setSelectedToppings([]);
    setSelectedCoulis([]);
    setStep(1);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl lg:text-4xl font-extrabold text-gray-800">
          🍰 Compose ton <span className="bg-gradient-to-r from-pastel-pink-500 to-pastel-blue-500 bg-clip-text text-transparent">Tiramisu</span>
        </h1>
        <p className="text-gray-500 mt-2">Suis les étapes pour créer ton tiramisu parfait</p>
      </div>

      {/* Progress bar */}
      <div className="flex items-center justify-center gap-2 mb-10">
        {[1, 2, 3].map(s => (
          <div key={s} className="flex items-center gap-2">
            <button onClick={() => setStep(s)}
              className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${
                s === step ? 'bg-gradient-to-r from-pastel-pink-400 to-pastel-blue-400 text-white shadow-lg scale-110' :
                s < step ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-400'
              }`}>
              {s < step ? <Check size={16} /> : s}
            </button>
            {s < 3 && <div className={`w-12 sm:w-20 h-1 rounded-full transition-colors ${s < step ? 'bg-green-400' : 'bg-gray-200'}`} />}
          </div>
        ))}
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Main panel */}
        <div className="flex-1">
          {/* Step 1: Size */}
          {step === 1 && (
            <div className="space-y-6 animate-in">
              <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                📏 Étape 1 : Choisis ta taille
              </h2>
              <div className="grid sm:grid-cols-2 gap-6">
                {(['L', 'XL'] as Size[]).map(s => (
                  <button key={s} onClick={() => setSize(s)}
                    className={`relative p-8 rounded-3xl border-3 transition-all duration-300 transform hover:scale-[1.02] ${
                      size === s
                        ? 'border-pastel-pink-400 bg-gradient-to-br from-pastel-pink-50 to-pastel-blue-50 shadow-xl shadow-pastel-pink-200'
                        : 'border-gray-200 bg-white hover:border-pastel-blue-200 shadow-md'
                    }`}>
                    {size === s && (
                      <div className="absolute top-4 right-4 w-8 h-8 bg-pastel-pink-400 rounded-full flex items-center justify-center">
                        <Check size={16} className="text-white" />
                      </div>
                    )}
                    <div className="text-6xl mb-4">{s === 'L' ? '🍰' : '🎂'}</div>
                    <h3 className="text-2xl font-bold text-gray-800">Taille {s}</h3>
                    <p className="text-gray-500 mt-1">{s === 'L' ? '1-2 portions' : '3-4 portions'}</p>
                    <div className="text-3xl font-extrabold text-pastel-pink-500 mt-3">{prices[s]}€</div>
                    <p className="text-xs text-gray-400 mt-2">1er topping/coulis inclus</p>
                  </button>
                ))}
              </div>
              <button onClick={() => setStep(2)}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3 bg-gradient-to-r from-pastel-pink-400 to-pastel-blue-400 text-white rounded-xl font-bold hover:shadow-lg transition-all">
                Suivant <ArrowRight size={18} />
              </button>
            </div>
          )}

          {/* Step 2: Toppings */}
          {step === 2 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                🍫 Étape 2 : Choisis tes toppings
              </h2>
              <p className="text-gray-500 text-sm">1er choix inclus, puis +1€ par topping supplémentaire</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {activeToppings.map(t => {
                  const selected = selectedToppings.includes(t.name);
                  const imgSrc = toppingImages[t.name];
                  return (
                    <button key={t.id} onClick={() => toggleTopping(t.name)}
                      className={`relative p-4 rounded-2xl border-2 transition-all duration-200 transform hover:scale-105 ${
                        selected
                          ? 'border-pastel-pink-400 bg-pastel-pink-50 shadow-md'
                          : 'border-gray-200 bg-white hover:border-pastel-blue-200'
                      }`}>
                      {selected && (
                        <div className="absolute top-2 right-2 w-6 h-6 bg-pastel-pink-400 rounded-full flex items-center justify-center">
                          <Check size={12} className="text-white" />
                        </div>
                      )}
                      {imgSrc ? (
                        <img src={imgSrc} alt={t.name} className="w-full h-16 object-cover rounded-xl mb-2" />
                      ) : (
                        <div className="text-3xl mb-2">{t.emoji}</div>
                      )}
                      <p className="text-sm font-semibold text-gray-700">{t.name}</p>
                    </button>
                  );
                })}
              </div>
              <div className="flex gap-3">
                <button onClick={() => setStep(1)}
                  className="flex items-center gap-2 px-6 py-3 border-2 border-gray-200 text-gray-600 rounded-xl font-medium hover:bg-gray-50 transition-all">
                  <ArrowLeft size={18} /> Retour
                </button>
                <button onClick={() => setStep(3)}
                  className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-pastel-pink-400 to-pastel-blue-400 text-white rounded-xl font-bold hover:shadow-lg transition-all">
                  Suivant <ArrowRight size={18} />
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Coulis */}
          {step === 3 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                🍯 Étape 3 : Choisis tes coulis
              </h2>
              <p className="text-gray-500 text-sm">Chaque coulis supplémentaire au-delà du 1er choix global : +1€</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {activeCoulis.map(c => {
                  const selected = selectedCoulis.includes(c.name);
                  const imgSrc = coulisImages[c.name];
                  return (
                    <button key={c.id} onClick={() => toggleCoulisItem(c.name)}
                      className={`relative p-5 rounded-2xl border-2 transition-all duration-200 transform hover:scale-105 ${
                        selected
                          ? 'border-pastel-blue-400 bg-pastel-blue-50 shadow-md'
                          : 'border-gray-200 bg-white hover:border-pastel-pink-200'
                      }`}>
                      {selected && (
                        <div className="absolute top-2 right-2 w-6 h-6 bg-pastel-blue-500 rounded-full flex items-center justify-center">
                          <Check size={12} className="text-white" />
                        </div>
                      )}
                      {imgSrc ? (
                        <img src={imgSrc} alt={c.name} className="w-full h-16 object-cover rounded-xl mb-2" />
                      ) : (
                        <div className="text-3xl mb-2">{c.emoji}</div>
                      )}
                      <p className="text-sm font-semibold text-gray-700">{c.name}</p>
                    </button>
                  );
                })}
              </div>

              {/* Summary */}
              <div className="bg-white rounded-2xl p-6 border border-pastel-pink-200 shadow-lg space-y-4">
                <h3 className="text-lg font-bold text-gray-800">📋 Récapitulatif</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Taille {size}</span>
                    <span className="font-bold">{prices[size]}€</span>
                  </div>
                  {selectedToppings.length > 0 && (
                    <div>
                      <span className="text-gray-600">Toppings :</span>
                      <ul className="ml-4 text-gray-500">
                        {selectedToppings.map((t, i) => (
                          <li key={t} className="flex justify-between">
                            <span>• {t}</span>
                            <span className="text-xs text-gray-400">
                              {i === 0 && selectedCoulis.length === 0 ? 'inclus' : '+1€'}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {selectedCoulis.length > 0 && (
                    <div>
                      <span className="text-gray-600">Coulis :</span>
                      <ul className="ml-4 text-gray-500">
                        {selectedCoulis.map((c, i) => (
                          <li key={c} className="flex justify-between">
                            <span>• {c}</span>
                            <span className="text-xs text-gray-400">
                              {i === 0 && selectedToppings.length === 0 ? 'inclus' : '+1€'}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {totalExtras > 1 && (
                    <div className="flex justify-between text-pastel-pink-600 text-xs">
                      <span>Suppléments ({totalExtras - 1} × 1€)</span>
                      <span>+{totalExtras - 1}€</span>
                    </div>
                  )}
                  <div className="border-t pt-2 flex justify-between text-lg font-extrabold text-pastel-pink-500">
                    <span>Total</span>
                    <span>{totalPrice}€</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <button onClick={() => setStep(2)}
                  className="flex items-center gap-2 px-6 py-3 border-2 border-gray-200 text-gray-600 rounded-xl font-medium hover:bg-gray-50 transition-all">
                  <ArrowLeft size={18} /> Retour
                </button>
                <button onClick={handleAddToCart}
                  disabled={selectedToppings.length === 0 && selectedCoulis.length === 0}
                  className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-pastel-pink-400 to-pastel-blue-400 text-white rounded-xl font-bold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed">
                  <ShoppingCart size={18} /> Ajouter au panier
                </button>
                {currentUser && (
                  <button onClick={handleSaveFavorite}
                    className="flex items-center gap-2 px-6 py-3 border-2 border-pastel-pink-200 text-pastel-pink-500 rounded-xl font-medium hover:bg-pastel-pink-50 transition-all">
                    <Heart size={18} /> Sauvegarder
                  </button>
                )}
                <button onClick={resetConfig}
                  className="px-6 py-3 text-gray-400 hover:text-gray-600 rounded-xl font-medium transition-all">
                  Réinitialiser
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right sidebar - Live price */}
        <div className="lg:w-72">
          <div className="sticky top-24 space-y-4">
            <div className="bg-white rounded-2xl p-6 border border-pastel-blue-200 shadow-lg text-center">
              <div className="text-5xl mb-3">{size === 'L' ? '🍰' : '🎂'}</div>
              <h3 className="font-bold text-gray-800">Tiramisu {size}</h3>
              <div className="text-4xl font-extrabold text-pastel-pink-500 my-3">{totalPrice}€</div>
              <div className="text-xs text-gray-400 space-y-1">
                <p>Base : {prices[size]}€</p>
                {totalExtras > 1 && <p>+ {totalExtras - 1} suppléments</p>}
              </div>
              {selectedToppings.length > 0 && (
                <div className="mt-3 pt-3 border-t text-left">
                  <p className="text-xs font-semibold text-gray-500 mb-1">Toppings :</p>
                  <div className="flex flex-wrap gap-1">
                    {selectedToppings.map(t => (
                      <span key={t} className="text-xs px-2 py-1 bg-pastel-pink-100 text-pastel-pink-600 rounded-full">{t}</span>
                    ))}
                  </div>
                </div>
              )}
              {selectedCoulis.length > 0 && (
                <div className="mt-3 pt-3 border-t text-left">
                  <p className="text-xs font-semibold text-gray-500 mb-1">Coulis :</p>
                  <div className="flex flex-wrap gap-1">
                    {selectedCoulis.map(c => (
                      <span key={c} className="text-xs px-2 py-1 bg-pastel-blue-100 text-pastel-blue-600 rounded-full">{c}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Favorites */}
            {currentUser && favorites.length > 0 && (
              <div className="bg-white rounded-2xl p-4 border border-pastel-pink-200 shadow-lg">
                <h4 className="font-bold text-gray-800 flex items-center gap-2 text-sm mb-3">
                  <Heart size={14} className="text-pastel-pink-500" /> Mes favoris
                </h4>
                <div className="space-y-2">
                  {favorites.map(f => (
                    <button key={f.id} onClick={() => loadFavorite(f)}
                      className="w-full text-left p-2 rounded-xl hover:bg-pastel-pink-50 text-xs transition-colors border border-pastel-pink-100">
                      <span className="font-medium">{f.size}</span> - {f.toppings.join(', ')} {f.coulis.length > 0 && `+ ${f.coulis.join(', ')}`}
                      <span className="block text-pastel-pink-500 font-bold">{f.price}€</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Success toast */}
      {showSuccess && (
        <div className="fixed bottom-6 right-6 bg-green-500 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 z-50 animate-bounce">
          <Check size={20} />
          <div>
            <p className="font-bold">Ajouté au panier !</p>
            <button onClick={() => setCurrentPage('cart')} className="text-sm underline">Voir le panier</button>
          </div>
        </div>
      )}

      {/* Add another */}
      {showSuccess && (
        <div className="fixed bottom-6 left-6 z-50">
          <button onClick={resetConfig}
            className="bg-pastel-blue-500 text-white px-6 py-3 rounded-2xl shadow-2xl flex items-center gap-2 font-bold hover:bg-pastel-blue-600 transition-colors">
            <Plus size={18} /> Ajouter un autre
          </button>
        </div>
      )}
    </div>
  );
}
