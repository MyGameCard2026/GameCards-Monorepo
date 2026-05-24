import React, { useState } from 'react';
import { useAuthStore } from '@gamecards/application';

export const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login, isLoading, error } = useAuthStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(username, password);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-game-navy text-game-navy font-arco p-4 relative overflow-hidden">
      {/* Círculos decorativos de fondo */}
      <div className="absolute top-[-10%] left-[-10%] w-64 h-64 bg-game-teal rounded-full opacity-50 blur-3xl"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-game-mint rounded-full opacity-50 blur-3xl"></div>

      <form onSubmit={handleSubmit} className="relative bg-white p-8 md:p-12 rounded-[3rem] shadow-2xl shadow-game-teal/20 w-full max-w-md flex flex-col items-center">
        
        {/* Ícono de silueta en un círculo */}
        <div className="w-24 h-24 bg-game-yellow rounded-full flex items-center justify-center shadow-lg border-4 border-white -mt-20 mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
          </svg>
        </div>

        <h2 className="text-4xl text-center text-game-navy mb-8 tracking-wide">
          ¡A Jugar!
        </h2>
        
        {error && (
          <div className="w-full bg-game-red/10 border-2 border-game-red text-game-red px-4 py-3 rounded-2xl text-center mb-6 font-sans font-bold">
            {error}
          </div>
        )}

        <div className="w-full space-y-6">
          <div className="flex flex-col">
            <input 
              type="text" 
              placeholder="USUARIO"
              className="w-full px-6 py-4 bg-gray-50 border-2 border-game-mint rounded-full focus:outline-none focus:border-game-teal focus:ring-4 focus:ring-game-teal/20 text-lg transition-all"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="flex flex-col">
            <input 
              type="password" 
              placeholder="CONTRASEÑA"
              className="w-full px-6 py-4 bg-gray-50 border-2 border-game-mint rounded-full focus:outline-none focus:border-game-teal focus:ring-4 focus:ring-game-teal/20 text-lg transition-all"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        </div>

        <button 
          type="submit" 
          disabled={isLoading}
          className="w-full mt-10 py-4 bg-game-orange hover:bg-game-red disabled:opacity-50 disabled:hover:bg-game-orange text-white text-2xl rounded-full transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1 active:translate-y-0"
        >
          {isLoading ? '...' : 'ENTRAR'}
        </button>
      </form>
    </div>
  );
};
