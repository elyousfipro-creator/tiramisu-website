import { useState } from 'react';
import { useStore } from '../store';
import { LogIn, UserPlus, Mail, Lock, User } from 'lucide-react';
import { Background } from '../components/Background';

export function LoginPage() {
  const { login, registerClient, setCurrentPage, currentUser } = useStore();
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  if (currentUser) {
    return (
      <div className="relative max-w-md mx-auto px-4 py-20 text-center">
        <Background />
        <div className="bg-white rounded-3xl p-8 shadow-xl border border-pastel-pink-200">
          <div className="text-5xl mb-4">👋</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Bienvenue, {currentUser.name} !</h2>
          <p className="text-gray-500 mb-2">Rôle : <span className="font-medium text-pastel-blue-600 capitalize">{currentUser.role}</span></p>
          <p className="text-sm text-gray-400 mb-6">{currentUser.email}</p>
          <div className="space-y-3">
            {currentUser.role !== 'client' && (
              <button onClick={() => setCurrentPage('dashboard')}
                className="w-full py-3 bg-gradient-to-r from-pastel-pink-400 to-pastel-blue-400 text-white rounded-xl font-bold">
                Accéder au Dashboard
              </button>
            )}
            <button onClick={() => setCurrentPage('configurator')}
              className="w-full py-3 border-2 border-pastel-blue-200 text-pastel-blue-600 rounded-xl font-medium hover:bg-pastel-blue-50">
              Composer un Tiramisu
            </button>
          </div>
        </div>
      </div>
    );
  }

  const handleLogin = () => {
    setError('');
    if (!email || !password) { setError('Remplissez tous les champs'); return; }
    const ok = login(email, password);
    if (ok) {
      setCurrentPage('home');
    } else {
      setError('Email ou mot de passe incorrect');
    }
  };

  const handleRegister = async () => {
    setError('');
    if (!name || !email || !password) { setError('Remplissez tous les champs'); return; }
    
    const ok = registerClient(name, email, password);
    if (ok) {
      // Send verification email
      try {
        const response = await fetch('/api/verify-email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, name })
        });
        
        if (response.ok) {
          setSuccess('Compte créé ! Vérifiez votre email pour activer votre compte.');
        } else {
          setSuccess('Compte créé ! (Erreur lors de l\'envoi de l\'email de vérification)');
        }
      } catch (error) {
        setSuccess('Compte créé ! Bienvenue !');
      }
      
      setTimeout(() => setCurrentPage('home'), 2000);
    } else {
      setError('Cet email est déjà utilisé');
    }
  };

  return (
    <div className="relative max-w-md mx-auto px-4 py-12">
      <Background />
      <div className="bg-white rounded-3xl p-8 shadow-2xl border border-pastel-pink-200">
        <div className="text-center mb-8">
          <div className="text-5xl mb-4">🍪</div>
          <h2 className="text-2xl font-bold text-gray-800">{isRegister ? 'Créer un compte' : 'Connexion'}</h2>
          <p className="text-gray-500 text-sm mt-1">
            {isRegister ? 'Rejoignez la famille Crème & Cookies' : 'Accédez à votre espace'}
          </p>
        </div>

        {error && <div className="p-3 bg-red-50 border border-red-200 text-red-600 rounded-xl text-sm mb-4">{error}</div>}
        {success && <div className="p-3 bg-green-50 border border-green-200 text-green-600 rounded-xl text-sm mb-4">{success}</div>}

        <div className="space-y-4">
          {isRegister && (
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                <User size={14} /> Nom
              </label>
              <input type="text" value={name} onChange={e => setName(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pastel-blue-300 focus:border-pastel-blue-300 outline-none"
                placeholder="Votre nom" />
            </div>
          )}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
              <Mail size={14} /> Email
            </label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pastel-blue-300 focus:border-pastel-blue-300 outline-none"
              placeholder="email@exemple.fr" />
          </div>
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
              <Lock size={14} /> Mot de passe
            </label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pastel-blue-300 focus:border-pastel-blue-300 outline-none"
              placeholder="••••••••"
              onKeyDown={e => e.key === 'Enter' && (isRegister ? handleRegister() : handleLogin())} />
          </div>

          <button onClick={isRegister ? handleRegister : handleLogin}
            className="w-full py-3 bg-gradient-to-r from-pastel-pink-400 to-pastel-blue-400 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2">
            {isRegister ? <><UserPlus size={18} /> Créer le compte</> : <><LogIn size={18} /> Se connecter</>}
          </button>

          <button onClick={() => { setIsRegister(!isRegister); setError(''); }}
            className="w-full text-center text-sm text-pastel-blue-600 hover:text-pastel-blue-700 font-medium">
            {isRegister ? 'Déjà un compte ? Se connecter' : 'Pas encore de compte ? S\'inscrire'}
          </button>
        </div>
      </div>
    </div>
  );
}
