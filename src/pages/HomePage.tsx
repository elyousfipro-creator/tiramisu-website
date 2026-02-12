import { useStore } from '../store';
import { ArrowRight, Star, Clock, Truck as TruckIcon, Heart } from 'lucide-react';
import kinderBuenoImage from '../assets/kinder-bueno-promo.png';
import { Background } from '../components/Background';

export function HomePage() {
  const setCurrentPage = useStore(s => s.setCurrentPage);

  return (
    <div className="overflow-hidden relative">
      <Background />
      {/* Hero */}
      <section className="relative py-20 lg:py-32 px-4">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1 text-center lg:text-left space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 border border-pastel-pink-300 rounded-full text-pastel-pink-600 text-sm font-medium shadow-sm">
              <span>🍪</span> Artisanal & Fait Maison
            </div>
            <h1 className="text-5xl lg:text-7xl font-extrabold leading-tight">
              <span className="bg-gradient-to-r from-pastel-pink-500 via-pastel-pink-400 to-pastel-blue-500 bg-clip-text text-transparent">
                Compose ton
              </span>
              <br />
              <span className="text-gray-800">Tiramisu</span>
              <br />
              <span className="bg-gradient-to-r from-pastel-blue-500 to-pastel-pink-400 bg-clip-text text-transparent">
                sur mesure
              </span>
            </h1>

            {/* Offre promo */}
            <div className="inline-flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-yellow-100 to-orange-100 border-2 border-yellow-400 rounded-2xl shadow-lg animate-pulse">
              <span className="text-2xl">🎁</span>
              <div className="text-left">
                <p className="text-xs font-bold text-yellow-700 uppercase tracking-wider">Offre du moment</p>
                <p className="text-sm font-bold text-gray-800">1 Tiramisu XL acheté = 1 Cookie offert !</p>
              </div>
            </div>

            <p className="text-lg text-gray-600 max-w-lg mx-auto lg:mx-0">
              Choisis ta taille, tes toppings préférés et tes coulis favoris. 
              Nous préparons ton tiramisu avec amour et te le livrons frais ! 
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button onClick={() => setCurrentPage('configurator')}
                className="group flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-pastel-pink-400 to-pastel-blue-400 text-white rounded-2xl font-bold text-lg shadow-lg shadow-pastel-pink-200 hover:shadow-xl hover:shadow-pastel-pink-300 transform hover:-translate-y-1 transition-all duration-300">
                Composer mon Tiramisu
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button onClick={() => setCurrentPage('login')}
                className="flex items-center justify-center gap-2 px-8 py-4 border-2 border-pastel-blue-300 text-pastel-blue-600 rounded-2xl font-bold text-lg hover:bg-pastel-blue-50 transition-all">
                Se connecter
              </button>
            </div>
          </div>
          <div className="flex-1 relative">
            <div className="relative w-80 h-80 lg:w-96 lg:h-96 mx-auto">
              <div className="absolute inset-0 bg-gradient-to-br from-pastel-pink-200 to-pastel-blue-200 rounded-full opacity-30 blur-3xl animate-pulse" />
              <div className="relative bg-gradient-to-br from-white to-pastel-pink-100 rounded-3xl p-8 shadow-2xl border border-pastel-pink-300 transform rotate-3 hover:rotate-0 transition-transform duration-500">
                <div className="text-center space-y-4">
                  <img src={kinderBuenoImage} alt="Tiramisu" className="w-full h-48 object-cover rounded-2xl" />
                  <h3 className="text-2xl font-bold text-pastel-blue-700">Tiramisu</h3>
                  <div className="flex items-center justify-center gap-1">
                    {[1,2,3,4,5].map(i => <Star key={i} size={16} className="fill-pastel-pink-400 text-pastel-pink-400" />)}
                    <span className="text-sm text-pastel-blue-600 ml-2">4.9/5</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 px-4 bg-white/60 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl lg:text-4xl font-bold text-center text-gray-800 mb-4">Comment ça marche ?</h2>
          <p className="text-center text-gray-500 mb-16 text-lg">3 étapes simples pour ton tiramisu parfait</p>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: '1', emoji: '📏', title: 'Choisis ta taille', desc: 'Taille L (5€) ou XL (10€) selon ton appétit !' },
              { step: '2', emoji: '🍫', title: 'Ajoute tes toppings', desc: 'Kinder, Oreo, Spéculoos... Le premier est inclus !' },
              { step: '3', emoji: '🍯', title: 'Choisis tes coulis', desc: 'Chocolat, Nutella, Caramel... Fais-toi plaisir !' },
            ].map((item) => (
                              <div key={item.step} className="relative bg-white rounded-3xl p-8 shadow-lg border border-pastel-beige-300 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group">
                <div className="absolute -top-4 -left-4 w-10 h-10 bg-gradient-to-br from-pastel-pink-400 to-pastel-blue-400 rounded-xl flex items-center justify-center text-white font-bold shadow-lg">
                  {item.step}
                </div>
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">{item.emoji}</div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{item.title}</h3>
                <p className="text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { icon: <Star size={24} />, title: 'Fait Maison', desc: 'Recette artisanale' },
              { icon: <Clock size={24} />, title: 'Rapide', desc: 'Préparé en 30 min' },
              { icon: <TruckIcon size={24} />, title: 'Livraison', desc: 'Chez vous rapidement' },
              { icon: <Heart size={24} />, title: 'Avec Amour', desc: 'Préparé avec passion' },
            ].map((f, i) => (
              <div key={i} className="bg-white/90 backdrop-blur rounded-2xl p-6 text-center border border-pastel-beige-300 hover:bg-white shadow-md hover:shadow-lg transition-all">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-pastel-blue-100 rounded-xl text-pastel-blue-600 mb-3">
                  {f.icon}
                </div>
                <h4 className="font-bold text-gray-800">{f.title}</h4>
                <p className="text-sm text-gray-500">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 px-4 bg-white/60 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl lg:text-4xl font-bold text-center text-gray-800 mb-4">Nos Tarifs</h2>
          <p className="text-center text-gray-500 mb-12">Premier topping ou coulis inclus !</p>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              { size: 'L', price: 5, desc: 'Parfait pour une personne', portions: '1-2 portions' },
              { size: 'XL', price: 10, desc: 'Idéal pour partager', portions: '3-4 portions', popular: true },
            ].map((p) => (
              <div key={p.size} className={`relative bg-white rounded-3xl p-8 shadow-lg border-2 ${p.popular ? 'border-pastel-pink-400 shadow-pastel-pink-200' : 'border-pastel-beige-300'} hover:shadow-xl transition-all`}>
                {p.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-pastel-pink-400 to-pastel-blue-400 text-white text-xs font-bold rounded-full">
                    POPULAIRE
                  </div>
                )}
                <div className="text-center space-y-4">
                  <div className="text-6xl">🍰</div>
                  <h3 className="text-2xl font-bold text-gray-800">Taille {p.size}</h3>
                  <div className="text-4xl font-extrabold text-pastel-pink-500">{p.price}€</div>
                  <p className="text-gray-500">{p.desc}</p>
                  <p className="text-sm text-pastel-blue-600">{p.portions}</p>
                  <ul className="text-left space-y-2 text-sm text-gray-600">
                    <li className="flex items-center gap-2"><span className="text-green-500">✓</span> 1 topping inclus</li>
                    <li className="flex items-center gap-2"><span className="text-green-500">✓</span> Mascarpone premium</li>
                    <li className="flex items-center gap-2"><span className="text-green-500">✓</span> Topping sup. : +1€</li>
                    <li className="flex items-center gap-2"><span className="text-green-500">✓</span> Coulis sup. : +1€</li>
                  </ul>
                  <button onClick={() => setCurrentPage('configurator')}
                    className="w-full py-3 bg-gradient-to-r from-pastel-pink-400 to-pastel-blue-400 text-white rounded-xl font-bold hover:shadow-lg transition-all">
                    Composer
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Programme Fidélité */}
      <section className="py-20 px-4 bg-white/60 backdrop-blur-sm">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-pastel-pink-100 to-pastel-blue-100 border border-pastel-pink-300 rounded-full text-pastel-pink-600 text-sm font-medium mb-4">
              <span>🎁</span> Programme Fidélité
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-3">Carte de Fidélité</h2>
            <p className="text-gray-500 text-lg">Commande régulièrement et débloque des récompenses exclusives !</p>
          </div>

          {/* Carte de fidélité interactive */}
          <div className="bg-gradient-to-br from-pastel-beige-100 via-white to-pastel-pink-100 rounded-3xl p-8 shadow-xl border border-pastel-beige-300 mb-10">
            <div className="flex flex-col md:flex-row items-center gap-6 mb-8">
              <div className="w-20 h-20 bg-gradient-to-br from-amber-600 to-amber-800 rounded-2xl flex items-center justify-center text-4xl shadow-lg">
                🥉
              </div>
              <div className="text-center md:text-left">
                <h3 className="text-2xl font-bold text-gray-800">Carte Bronze</h3>
                <p className="text-gray-500">6 commande(s) pour débloquer ta récompense</p>
              </div>
            </div>

            {/* Progress dots */}
            <div className="flex items-center justify-center gap-3 md:gap-5 mb-6">
              {[1, 2, 3, 4, 5, 6].map((dot) => (
                <div key={dot} className="flex flex-col items-center gap-2">
                  <div className={`w-12 h-12 md:w-14 md:h-14 rounded-2xl flex items-center justify-center text-lg font-bold border-2 transition-all duration-300 ${
                    dot <= 0
                      ? 'bg-gradient-to-br from-pastel-pink-400 to-pastel-blue-400 text-white border-pastel-pink-400 shadow-lg shadow-pastel-pink-200 scale-105'
                      : 'bg-white text-gray-300 border-pastel-beige-300 hover:border-pastel-pink-300 hover:text-pastel-pink-400'
                  }`}>
                    {dot <= 0 ? '✓' : dot}
                  </div>
                </div>
              ))}
            </div>
            <p className="text-center text-sm text-gray-400 mb-2">
              <span className="font-semibold text-pastel-pink-500">0</span> / 6 commandes complétées
            </p>
            <div className="w-full bg-pastel-beige-200 rounded-full h-2 mt-4">
              <div className="bg-gradient-to-r from-pastel-pink-400 to-pastel-blue-400 h-2 rounded-full transition-all duration-700" style={{ width: '0%' }} />
            </div>
          </div>

          {/* Les 3 paliers */}
          <div className="grid md:grid-cols-3 gap-6">
            {/* Bronze */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-300 to-amber-500 rounded-3xl opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
              <div className="relative bg-white rounded-3xl p-6 shadow-lg border-2 border-amber-200 hover:border-amber-400 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-amber-700 rounded-2xl mx-auto flex items-center justify-center shadow-lg">
                    <span className="text-3xl">🥉</span>
                  </div>
                  <div>
                    <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-bold tracking-wider">BRONZE</span>
                  </div>
                  <div className="space-y-1">
                    <p className="text-2xl font-extrabold text-gray-800">6 commandes</p>
                    <div className="w-8 h-0.5 bg-amber-400 mx-auto rounded-full" />
                  </div>
                  <div className="bg-amber-50 rounded-2xl p-4 border border-amber-200">
                    <p className="text-lg font-bold text-amber-700">🍪 1 Cookie</p>
                    <p className="text-xs text-amber-500 mt-1">Cookie artisanal offert</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Argent */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-gray-300 to-gray-500 rounded-3xl opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
              <div className="relative bg-white rounded-3xl p-6 shadow-lg border-2 border-gray-200 hover:border-gray-400 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-gray-300 to-gray-500 rounded-2xl mx-auto flex items-center justify-center shadow-lg">
                    <span className="text-3xl">🥈</span>
                  </div>
                  <div>
                    <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-bold tracking-wider">ARGENT</span>
                  </div>
                  <div className="space-y-1">
                    <p className="text-2xl font-extrabold text-gray-800">6 commandes</p>
                    <div className="w-8 h-0.5 bg-gray-400 mx-auto rounded-full" />
                  </div>
                  <div className="bg-gray-50 rounded-2xl p-4 border border-gray-200">
                    <p className="text-lg font-bold text-gray-600">🍰 1 Mini Tiramisu</p>
                    <p className="text-xs text-gray-400 mt-1">Mini tiramisu offert</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Or */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-300 to-yellow-500 rounded-3xl opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
              <div className="relative bg-white rounded-3xl p-6 shadow-lg border-2 border-yellow-200 hover:border-yellow-400 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-2xl mx-auto flex items-center justify-center shadow-lg">
                    <span className="text-3xl">🥇</span>
                  </div>
                  <div>
                    <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-bold tracking-wider">OR</span>
                  </div>
                  <div className="space-y-1">
                    <p className="text-2xl font-extrabold text-gray-800">6 commandes</p>
                    <div className="w-8 h-0.5 bg-yellow-400 mx-auto rounded-full" />
                  </div>
                  <div className="bg-yellow-50 rounded-2xl p-4 border border-yellow-200">
                    <p className="text-lg font-bold text-yellow-700">🎂 1 Tiramisu XL au choix</p>
                    <p className="text-xs text-yellow-500 mt-1">Tiramisu XL offert !</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Explication */}
          <div className="mt-10 bg-gradient-to-r from-pastel-pink-100 to-pastel-blue-100 rounded-2xl p-6 border border-pastel-pink-200">
            <div className="flex flex-col md:flex-row items-center gap-4">
              <div className="text-4xl">🔄</div>
              <div className="text-center md:text-left">
                <h4 className="font-bold text-gray-800 mb-1">Comment ça marche ?</h4>
                <p className="text-sm text-gray-600">
                  Chaque commande livrée te rapproche d'une récompense ! Complète <strong>6 commandes</strong> pour passer au palier suivant. 
                  Après le palier Or, le cycle recommence. <strong>Bronze → Argent → Or → Bronze...</strong> Les récompenses sont cumulables et sans limite ! 🎉
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center bg-gradient-to-r from-pastel-pink-400 to-pastel-blue-400 rounded-3xl p-12 shadow-2xl">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">Prêt à composer ?</h2>
          <p className="text-white/80 text-lg mb-8">Crée ton tiramisu unique et fais-toi livrer !</p>
          <button onClick={() => setCurrentPage('configurator')}
            className="px-10 py-4 bg-white text-pastel-pink-600 rounded-2xl font-bold text-lg hover:bg-pastel-beige-50 shadow-lg transform hover:-translate-y-1 transition-all">
            🍰 C'est parti !
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-300 pt-16 pb-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
            {/* Brand */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="text-4xl">🍪</span>
                <div>
                  <h3 className="text-xl font-extrabold text-white leading-tight">Crème et Cookies</h3>
                </div>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                Tiramisus artisanaux faits maison à Angers.
              </p>
              <div className="flex items-center gap-3 pt-2">
                <span className="w-8 h-1 bg-gradient-to-r from-pastel-pink-400 to-pastel-blue-400 rounded-full"></span>
                <span className="text-xs text-gray-500 italic">Avec amour depuis Angers</span>
              </div>
            </div>

            {/* Horaires */}
            <div className="space-y-4">
              <h4 className="text-white font-bold text-lg flex items-center gap-2">
                <span className="w-1.5 h-5 bg-pastel-pink-400 rounded-full inline-block"></span>
                Horaires
              </h4>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="text-lg">📅</span>
                  <span className="text-gray-400">Lundi - Dimanche</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-lg">🕕</span>
                  <span className="text-gray-400">18h00 - 00h00</span>
                </div>
              </div>
              <div className="mt-3 px-3 py-2 bg-gray-800 rounded-lg border border-gray-700 inline-block">
                <span className="text-xs text-green-400 font-medium flex items-center gap-1.5">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse inline-block"></span>
                  Ouvert tous les jours
                </span>
              </div>
            </div>

            {/* Contact */}
            <div className="space-y-4">
              <h4 className="text-white font-bold text-lg flex items-center gap-2">
                <span className="w-1.5 h-5 bg-pastel-blue-400 rounded-full inline-block"></span>
                Contact
              </h4>
              <div className="space-y-3">
                <a href="https://www.google.com/maps/search/?api=1&query=Angers+France"
                  target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-3 hover:text-pastel-pink-300 transition-colors group">
                  <span className="text-lg">📍</span>
                  <span className="text-gray-400 group-hover:text-pastel-pink-300 transition-colors">Angers</span>
                </a>
                <a href="mailto:cremeetcookiess@gmail.com"
                  className="flex items-center gap-3 hover:text-pastel-blue-300 transition-colors group">
                  <span className="text-lg">✉️</span>
                  <span className="text-gray-400 group-hover:text-pastel-blue-300 transition-colors break-all">cremeetcookiess@gmail.com</span>
                </a>
              </div>
            </div>

            {/* Réseaux */}
            <div className="space-y-4">
              <h4 className="text-white font-bold text-lg flex items-center gap-2">
                <span className="w-1.5 h-5 bg-gradient-to-b from-pastel-pink-400 to-pastel-blue-400 rounded-full inline-block"></span>
                Réseaux
              </h4>
              <div className="space-y-3">
                <a href="https://www.instagram.com/creme.et.cookies"
                  target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-3 hover:text-pastel-pink-300 transition-colors group">
                  <span className="text-lg">📸</span>
                  <span className="text-gray-400 group-hover:text-pastel-pink-300 transition-colors">@creme.et.cookies</span>
                </a>
                <a href="https://www.snapchat.com/add/cremeetcookiess"
                  target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-3 hover:text-yellow-300 transition-colors group">
                  <span className="text-lg">👻</span>
                  <span className="text-gray-400 group-hover:text-yellow-300 transition-colors">cremeetcookiess</span>
                </a>
              </div>
              <div className="flex gap-3 pt-2">
                <a href="https://www.instagram.com/creme.et.cookies" target="_blank" rel="noopener noreferrer"
                  className="w-10 h-10 bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 rounded-xl flex items-center justify-center text-white text-sm hover:scale-110 transition-transform shadow-lg">
                  📸
                </a>
                <a href="https://www.snapchat.com/add/cremeetcookiess" target="_blank" rel="noopener noreferrer"
                  className="w-10 h-10 bg-yellow-400 rounded-xl flex items-center justify-center text-white text-sm hover:scale-110 transition-transform shadow-lg">
                  👻
                </a>
              </div>
            </div>
          </div>

          {/* Separator */}
          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-xs text-gray-500">
                © 2024 Crème et Cookies. Tous droits réservés.
              </p>
              <p className="text-xs text-gray-600">
                Tiramisus artisanaux 🍰 faits avec ❤️ à Angers
              </p>
            </div>
            <div className="text-center mt-4">
              <span className="text-xs text-gray-700">
                Comptes démo : admin@cremecookies.fr / admin123 | cuisine@cremecookies.fr / cuisine123 | livreur@cremecookies.fr / livreur123
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
