import { useStore } from '../store';
import { ShoppingCart, Plus, Star } from 'lucide-react';
import oreoImage from '../assets/TIRAMISU OREO .png';
import speculosImage from '../assets/TIRAMISU LOTUS .png';
import kinderBuenoImage from '../assets/TIRAMISU KINDER BUENI.png';
import kinderBuenoWhiteImage from '../assets/KINDER BUENO WHITE.jpg';
import twixImage from '../assets/TIRAMISU TWIX CARAMEL.png';
import cookieImage from '../assets/TIRAMISU COOKIE CHOCOLAT.png';
import miniOreoImage from '../assets/TIRAMISU OREO MINI.png';
import miniSpeculosImage from '../assets/TIRAMISU MINI SPECULOS.png';
import miniKinderImage from '../assets/TIRAMISU KINDER MINI.png';
import miniTwixImage from '../assets/TIRAMISU MINI TWIX.png';
import miniCookiesImage from '../assets/TIRAMISU MINI COOKIES.png';

const presetTiramisus = [
  {
    id: 'oreo',
    name: 'Tiramisu Oreo',
    description: 'Le classique revisité avec des biscuits Oreo croquants',
    price: 5.00,
    image: oreoImage,
    size: 'L' as const,
    toppings: ['oreo'],
    coulis: ['chocolat'],
    rating: 4.8,
    popular: true
  },
  {
    id: 'speculos',
    name: 'Tiramisu Spéculos',
    description: 'Le goût caramelisé du Spéculos traditionnel',
    price: 5.00,
    image: speculosImage,
    size: 'L' as const,
    toppings: ['speculos'],
    coulis: ['caramel'],
    rating: 4.6,
    popular: true
  },
  {
    id: 'kinder-bueno',
    name: 'Tiramisu Kinder Bueno',
    description: 'Le goût unique du Kinder Bueno dans un tiramisu crémeux',
    price: 5.00,
    image: kinderBuenoImage,
    size: 'L' as const,
    toppings: ['kinder-bueno'],
    coulis: ['chocolat'],
    rating: 4.7,
    popular: true,
    hasWhiteOption: true
  },
  {
    id: 'twix',
    name: 'Tiramisu Twix',
    description: 'Le duo caramel-chocolat du Twix',
    price: 5.00,
    image: twixImage,
    size: 'L' as const,
    toppings: ['twix'],
    coulis: ['caramel'],
    rating: 4.6,
    popular: false
  },
  {
    id: 'cookies',
    name: 'Tiramisu Cookies',
    description: 'Cookies maison et chocolat fondant',
    price: 5.00,
    image: cookieImage,
    size: 'L' as const,
    toppings: ['cookies'],
    coulis: ['chocolat'],
    rating: 4.3,
    popular: false
  },
  {
    id: 'mini-oreo',
    name: 'Mini Tiramisu Oreo',
    description: 'Format individuel du classique Oreo',
    price: 5.00,
    image: miniOreoImage,
    size: 'L' as const,
    toppings: ['oreo'],
    coulis: ['chocolat'],
    rating: 4.3,
    popular: false
  },
  {
    id: 'mini-speculos',
    name: 'Mini Tiramisu Spéculos',
    description: 'Format individuel au goût caramelisé',
    price: 5.00,
    image: miniSpeculosImage,
    size: 'L' as const,
    toppings: ['speculos'],
    coulis: ['caramel'],
    rating: 4.0,
    popular: false
  },
  {
    id: 'mini-kinder',
    name: 'Mini Tiramisu Kinder',
    description: 'Format individuel avec les saveurs Kinder',
    price: 5.00,
    image: miniKinderImage,
    size: 'L' as const,
    toppings: ['kinder'],
    coulis: ['chocolat'],
    rating: 4.2,
    popular: false,
    hasWhiteOption: true
  },
  {
    id: 'mini-twix',
    name: 'Mini Tiramisu Twix',
    description: 'Format individuel Twix caramel',
    price: 5.00,
    image: miniTwixImage,
    size: 'L' as const,
    toppings: ['twix'],
    coulis: ['caramel'],
    rating: 4.2,
    popular: false
  },
  {
    id: 'mini-cookies',
    name: 'Mini Tiramisu Cookies',
    description: 'Format individuel avec des cookies',
    price: 5.00,
    image: miniCookiesImage,
    size: 'L' as const,
    toppings: ['cookies'],
    coulis: ['chocolat'],
    rating: 4.1,
    popular: false
  }
];

export function PresetsPage() {
  const { addToCart, setCurrentPage } = useStore();

  const handleAddToCart = (preset: typeof presetTiramisus[0], isWhite: boolean = false, size: 'L' | 'XL' = 'L') => {
    const finalToppings = isWhite && preset.hasWhiteOption 
      ? preset.toppings.map(t => t === 'kinder-bueno' ? 'kinder-bueno-white' : t === 'kinder' ? 'kinder-white' : t)
      : preset.toppings;
    
    addToCart({
      id: `preset-${preset.id}-${isWhite ? 'white' : 'normal'}-${size}-${Date.now()}`,
      size: size,
      toppings: finalToppings,
      coulis: preset.coulis,
      price: size === 'XL' ? 10.00 : 5.00
    });
  };

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-pastel-pink-500 to-pastel-blue-500 bg-clip-text text-transparent mb-4">
            Tiramisus Préfaits
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Découvrez nos créations exclusives, prêtes à être dégustées !
          </p>
        </div>

        {/* Popular Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <Star className="text-pastel-pink-500 fill-current" />
            Les Plus Populaires
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {presetTiramisus.filter(p => p.popular).map((preset) => (
              <div key={preset.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow group">
                <div className="relative h-48 overflow-hidden bg-gradient-to-br from-pastel-pink-100 to-pastel-blue-100">
                  <img
                    src={preset.image}
                    alt={preset.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2 right-2 bg-pastel-pink-500 text-white px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                    <Star size={12} fill="currentColor" />
                    {preset.rating}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{preset.name}</h3>
                  <p className="text-gray-600 text-sm mb-4">{preset.description}</p>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-2xl font-bold text-pastel-blue-600">5.00 €</span>
                      <span className="text-sm text-gray-500 ml-2">L / 10.00 € XL</span>
                    </div>
                    <div className="flex gap-2">
                      {preset.hasWhiteOption && (
                        <button
                          onClick={() => handleAddToCart(preset, false, 'L')}
                          className="bg-gradient-to-r from-pastel-blue-500 to-pastel-blue-600 text-white px-3 py-2 rounded-xl hover:shadow-lg transition-all text-sm"
                        >
                          Normal L
                        </button>
                      )}
                      <button
                        onClick={() => handleAddToCart(preset, preset.hasWhiteOption, 'L')}
                        className={`bg-gradient-to-r ${preset.hasWhiteOption ? 'from-pastel-pink-300 to-pastel-pink-400' : 'from-pastel-pink-500 to-pastel-blue-500'} text-white px-4 py-2 rounded-xl hover:shadow-lg transition-all flex items-center gap-2`}
                      >
                        <ShoppingCart size={18} />
                        <span>{preset.hasWhiteOption ? 'White L' : 'Taille L'}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* All Presets */}
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Tous nos Tiramisus</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {presetTiramisus.map((preset) => (
              <div key={preset.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow group">
                <div className="relative h-32 overflow-hidden bg-gradient-to-br from-pastel-pink-100 to-pastel-blue-100">
                  <img
                    src={preset.image}
                    alt={preset.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {preset.popular && (
                    <div className="absolute top-2 right-2 bg-pastel-pink-500 text-white px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                      <Star size={10} fill="currentColor" />
                      Populaire
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-gray-800 mb-1">{preset.name}</h3>
                  <p className="text-gray-600 text-xs mb-3 line-clamp-2">{preset.description}</p>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-lg font-bold text-pastel-blue-600">5.00 €</span>
                      <span className="text-xs text-gray-500 ml-1">L/XL 10€</span>
                    </div>
                    <div className="flex gap-1">
                      {preset.hasWhiteOption && (
                        <button
                          onClick={() => handleAddToCart(preset, false, 'L')}
                          className="bg-gradient-to-r from-pastel-blue-500 to-pastel-blue-600 text-white px-2 py-1 rounded-lg hover:shadow-md transition-all text-xs"
                        >
                          N L
                        </button>
                      )}
                      <button
                        onClick={() => handleAddToCart(preset, preset.hasWhiteOption, 'L')}
                        className={`bg-gradient-to-r ${preset.hasWhiteOption ? 'from-pastel-pink-300 to-pastel-pink-400' : 'from-pastel-pink-500 to-pastel-blue-500'} text-white p-2 rounded-lg hover:shadow-md transition-all`}
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 text-center bg-gradient-to-r from-pastel-pink-100 to-pastel-blue-100 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">
            Vous préférez créer votre propre tiramisu ?
          </h3>
          <button
            onClick={() => setCurrentPage('configurator')}
            className="bg-white text-pastel-pink-500 px-6 py-3 rounded-xl font-bold hover:shadow-lg transition-all border-2 border-pastel-pink-500"
          >
            Composer mon tiramisu
          </button>
        </div>
      </div>
    </div>
  );
}
