import { useEffect, useState } from 'react';
import { useStore } from '../store';
import { Background } from '../components/Background';
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';

export function VerifyEmailPage() {
  const setCurrentPage = useStore(s => s.setCurrentPage);
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Get token from URL
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    
    if (!token) {
      setStatus('error');
      setMessage('Token de vérification manquant');
      return;
    }

    verifyEmail(token);
  }, []);

  const verifyEmail = async (token: string) => {
    try {
      const response = await fetch(`/api/verify-email?token=${token}`);
      const data = await response.json();

      if (data.success) {
        setStatus('success');
        setMessage('Votre email a été vérifié avec succès !');
      } else {
        setStatus('error');
        setMessage(data.error || 'Une erreur est survenue');
      }
    } catch (error) {
      setStatus('error');
      setMessage('Erreur de connexion au serveur');
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4">
      <Background />
      
      <div className="relative bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-8 max-w-md w-full text-center">
        {status === 'loading' && (
          <>
            <Loader2 className="w-16 h-16 text-pastel-pink-400 animate-spin mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Vérification en cours...</h2>
            <p className="text-gray-600">Veuillez patienter pendant que nous vérifions votre email.</p>
          </>
        )}

        {status === 'success' && (
          <>
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-12 h-12 text-green-500" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Email vérifié ! ✅</h2>
            <p className="text-gray-600 mb-6">{message}</p>
            <p className="text-sm text-gray-500 mb-4">Votre compte est maintenant actif. Vous pouvez vous connecter et commander !</p>
            <button 
              onClick={() => setCurrentPage('login')}
              className="inline-block bg-gradient-to-r from-pastel-pink-400 to-pastel-blue-400 text-white px-8 py-3 rounded-2xl font-bold hover:opacity-90 transition-opacity"
            >
              Se connecter
            </button>
          </>
        )}

        {status === 'error' && (
          <>
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <XCircle className="w-12 h-12 text-red-500" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Erreur ❌</h2>
            <p className="text-gray-600 mb-4">{message}</p>
            <p className="text-sm text-gray-500">Le lien de vérification peut être expiré ou invalide.</p>
          </>
        )}
      </div>
    </div>
  );
}
