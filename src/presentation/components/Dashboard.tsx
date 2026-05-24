import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore, gameService, cardService } from '@gamecards/application';
import type { Game, Card } from '@gamecards/application';

export const Dashboard: React.FC = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const [games, setGames] = useState<Game[]>([]);
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [cards, setCards] = useState<Card[]>([]);
  const [loading, setLoading] = useState(true);

  // Security PIN states
  const [pinModalOpen, setPinModalOpen] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState(false);
  const [targetGame, setTargetGame] = useState<Game | null>(null);

  useEffect(() => {
    if (user) {
      gameService.getUserGames(user.id).then((userGames) => {
        setGames(userGames);
        setLoading(false);
      });
    }
  }, [user]);

  const handleSelectGameClick = (game: Game) => {
    setTargetGame(game);
    setPinModalOpen(true);
    setPinInput('');
    setPinError(false);
  };

  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput === '0000') {
      setPinModalOpen(false);
      if (targetGame) {
        handleSelectGame(targetGame);
      }
    } else {
      setPinError(true);
      setPinInput('');
    }
  };

  const getGameStyle = (gameId: string) => {
    if (gameId === 'game_almendra') {
      return 'bg-gradient-to-br from-[#F58B01] to-[#DC2E2F] border-4 border-[#FAC005] hover:border-white shadow-xl hover:shadow-[#F58B01]/40';
    }
    if (gameId === 'game_cranium') {
      return 'bg-gradient-to-br from-[#023852] to-[#079FA0] border-4 border-[#9FD8C5] hover:border-white shadow-xl hover:shadow-[#079FA0]/40';
    }
    return 'bg-game-teal border-4 border-game-teal hover:border-game-yellow shadow-xl hover:shadow-game-yellow/30';
  };

  const handleSelectGame = (game: Game) => {
    if (game.id === 'game_almendra') {
      navigate('/preparacion');
      return;
    }
    
    if (game.id === 'game_cranium') {
      navigate('/cranium');
      return;
    }
    
    setLoading(true);
    setSelectedGame(game);
    cardService.getGameCards(game.id).then((gameCards) => {
      setCards(gameCards);
      setLoading(false);
    });
  };

  if (loading && !selectedGame && games.length === 0) {
    return (
      <div className="min-h-screen bg-game-navy text-white flex items-center justify-center font-arco">
        <p className="text-2xl animate-pulse text-game-mint">Cargando tu mesa...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-game-mint/10 font-arco text-game-navy">
      {/* Barra de Navegación Superior */}
      <nav className="bg-game-navy p-4 shadow-lg shadow-game-navy/20 sticky top-0 z-50 text-white">
        <div className="max-w-7xl mx-auto flex flex-col xl:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3 shrink-0">
            <div className="w-12 h-12 bg-game-mint/20 rounded-full flex items-center justify-center border border-game-mint shadow-md">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-game-mint" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
            </div>
            <span className="text-xl tracking-wide hidden sm:block">¡Hola, {user?.username}!</span>
          </div>

          <div className="flex-1 w-full max-w-2xl px-4">
            <div className="relative flex items-center w-full h-12 rounded-full bg-white/10 overflow-hidden border border-white/20 focus-within:border-game-mint focus-within:bg-white/20 transition-all">
              <div className="grid place-items-center h-full w-12 text-gray-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                className="peer h-full w-full outline-none text-base text-white bg-transparent pr-4 placeholder-gray-300 font-sans"
                type="text"
                id="search"
                placeholder="Buscar juegos predeterminados..." />
            </div>
          </div>

          <div className="flex items-center gap-4 text-lg shrink-0">
            <button className="flex items-center gap-2 hover:text-game-yellow transition-colors group" title="Favoritos">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
            </button>
            <span className="text-white/30 text-2xl font-light">|</span>
            <button className="hover:text-game-orange transition-colors">Suscripciones</button>
            <span className="text-white/30 text-2xl font-light">|</span>
            <button className="hover:text-game-mint transition-colors">Crear Nuevo Juego</button>
            <span className="text-white/30 text-2xl font-light">|</span>
            <button onClick={logout} className="hover:text-game-red transition-colors flex items-center gap-2 group" title="Cerrar Sesión">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto p-8 mt-6">
        {!selectedGame ? (
          // VISTA DE JUEGOS
          <>
            <h1 className="text-4xl text-center text-game-navy mb-16 tracking-wide">Tus Juegos</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
              {games.map(game => (
                <div 
                  key={game.id} 
                  onClick={() => handleSelectGameClick(game)}
                  className={`group cursor-pointer relative rounded-[2.5rem] p-8 transition-all hover:-translate-y-3 flex flex-col items-center text-center overflow-hidden ${getGameStyle(game.id)}`}
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-game-navy/50 pointer-events-none"></div>
                  <div className="absolute -top-6 bg-game-yellow w-14 h-14 rounded-full flex items-center justify-center shadow-lg border-4 border-white text-white z-10">
                    🎲
                  </div>
                  <h3 className="text-3xl text-white mb-4 mt-4 leading-tight relative z-10">{game.title}</h3>
                  <p className="text-game-mint font-sans leading-relaxed text-lg relative z-10">{game.description}</p>
                </div>
              ))}
              {games.length === 0 && (
                <div className="col-span-full text-center py-20">
                  <p className="text-3xl text-game-navy/40">No tienes juegos en tu colección.</p>
                </div>
              )}
            </div>
          </>
        ) : (
          // VISTA DE CARTAS DEL JUEGO SELECCIONADO
          <>
            <div className="flex items-center gap-4 mb-12">
              <button 
                onClick={() => setSelectedGame(null)}
                className="bg-game-navy text-white w-12 h-12 rounded-full flex items-center justify-center hover:bg-game-teal transition-colors shadow-md"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
              </button>
              <h1 className="text-4xl text-game-navy tracking-wide">{selectedGame.title} - Cartas</h1>
            </div>

            {loading ? (
              <p className="text-2xl text-center text-game-teal animate-pulse">Abriendo la caja...</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
                {cards.map(card => (
                  <div 
                    key={card.id} 
                    className="group relative bg-white rounded-[2.5rem] p-8 border-4 border-game-mint hover:border-game-teal transition-all hover:-translate-y-3 shadow-xl hover:shadow-game-teal/30 flex flex-col items-center text-center"
                  >
                    <div className="absolute -top-6 bg-game-teal w-14 h-14 rounded-full flex items-center justify-center shadow-lg border-4 border-white text-white">
                      🃏
                    </div>
                    <h3 className="text-2xl text-game-navy mb-4 mt-4 leading-tight">{card.title}</h3>
                    <p className="text-gray-600 font-sans leading-relaxed text-lg">{card.description}</p>
                  </div>
                ))}
                {cards.length === 0 && (
                  <div className="col-span-full text-center py-20">
                    <p className="text-3xl text-game-navy/40">Esta caja está vacía.</p>
                  </div>
                )}
              </div>
            )}
          </>
        )}

        {/* Modal de PIN */}
        {pinModalOpen && (
          <div className="fixed inset-0 bg-black/80 z-[100] flex items-center justify-center p-4 backdrop-blur-sm">
            <div className="bg-white rounded-3xl p-8 w-full max-w-sm shadow-2xl relative">
              <button 
                onClick={() => setPinModalOpen(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 font-sans text-xl"
              >
                ✕
              </button>
              <div className="flex justify-center mb-4">
                <span className="text-5xl">🔒</span>
              </div>
              <h2 className="text-2xl text-game-navy text-center mb-2 font-bold tracking-wide">Acceso Protegido</h2>
              <p className="text-gray-500 text-center mb-6 font-sans text-sm">Ingresa el PIN de seguridad para jugar</p>
              
              <form onSubmit={handlePinSubmit} className="flex flex-col gap-4">
                <input 
                  type="password" 
                  value={pinInput}
                  onChange={(e) => setPinInput(e.target.value)}
                  className="w-full text-center text-4xl tracking-[0.5em] font-bold p-4 bg-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-game-teal font-sans"
                  maxLength={4}
                  autoFocus
                />
                {pinError && <p className="text-red-500 text-center font-sans text-sm font-bold animate-pulse">PIN Incorrecto</p>}
                <button 
                  type="submit"
                  className="w-full bg-game-navy text-white py-4 rounded-xl font-bold text-lg hover:bg-game-teal transition-colors tracking-widest mt-2"
                >
                  DESBLOQUEAR
                </button>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
