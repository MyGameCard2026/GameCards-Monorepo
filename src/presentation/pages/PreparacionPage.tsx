import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { gameSessionService } from '@gamecards/application';
import { IconRenderer } from '../components/IconRenderer';

export default function PreparacionPage() {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState<string | null>(null);
  const [selectedDecks, setSelectedDecks] = useState<string[]>([]);
  
  const decks = gameSessionService.getDecks();

  const [players, setPlayers] = useState<string[]>([]);
  const [newPlayerName, setNewPlayerName] = useState('');

  const toggleSelection = (id: string) => {
    setSelectedDecks(prev => prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]);
  };

  const handleSelectAll = () => {
    if (selectedDecks.length === decks.length) {
      setSelectedDecks([]);
    } else {
      setSelectedDecks(decks.map(deck => deck.id));
    }
  };

  const handleAddPlayer = () => {
    if (newPlayerName.trim() !== '') {
      setPlayers([...players, newPlayerName.trim()]);
      setNewPlayerName('');
    }
  };

  const handleRemovePlayer = (index: number) => {
    setPlayers(players.filter((_, i) => i !== index));
  };

  const isAllSelected = selectedDecks.length === decks.length;

  const handleContinue = () => {
    if (players.length === 0 || selectedDecks.length === 0) {
      alert("Por favor añade al menos 1 jugador y selecciona 1 mazo.");
      return;
    }
    navigate('/juego', { state: { selectedDecks, players } });
  };

  return (
    <div style={{ backgroundColor: 'white', width: '100%', height: '100dvh', color: '#333', display: 'flex', flexDirection: 'column', fontFamily: "'Outfit', sans-serif", overflow: 'hidden', margin: 0, padding: 0 }}>
      
      <style>{`
        .hide-scroll::-webkit-scrollbar { display: none; }
        .hide-scroll { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      <header style={{ padding: '2rem 1.5rem 1rem', textAlign: 'center', flexShrink: 0, backgroundColor: 'white', zIndex: 10, boxShadow: '0 4px 15px rgba(0,0,0,0.03)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
          <button 
            onClick={() => navigate('/')}
            style={{ position: 'absolute', left: 0, background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
          >
            <IconRenderer name="arrow_back_ios" className="w-6 h-6" color="#333" />
          </button>
          <h2 style={{ fontSize: 'clamp(1.8rem, 6vw, 2.5rem)', fontWeight: 900, margin: 0, color: '#1a1a1a', letterSpacing: '-1px' }}>Configuración</h2>
        </div>
        <p style={{ color: '#666', marginTop: '8px', fontSize: '0.95rem' }}>Ajusta las opciones para jugar</p>
      </header>

      <div className="hide-scroll" style={{ flexGrow: 1, overflowY: 'auto', overflowX: 'hidden', width: '100%', maxWidth: '500px', margin: '0 auto', paddingBottom: '1rem' }}>
        
        {/* SECCIÓN JUGADORES */}
        <div style={{ padding: '1.5rem', backgroundColor: '#fafafa', borderBottom: '1px solid #eaeaea' }}>
          <h3 style={{ margin: '0 0 1rem 0', fontSize: '1.1rem', fontWeight: 800, color: '#1a1a1a' }}>
            Jugadores ({players.length})
          </h3>
          
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '1rem' }}>
            {players.length === 0 && (
              <span style={{ fontSize: '0.9rem', color: '#999', fontStyle: 'italic' }}>Añade al menos un jugador para empezar.</span>
            )}
            {players.map((player, index) => (
              <div key={index} style={{ backgroundColor: '#1a1a1a', color: 'white', padding: '6px 14px', borderRadius: '20px', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.9rem', fontWeight: 600 }}>
                {player}
                <div onClick={() => handleRemovePlayer(index)} style={{ cursor: 'pointer', opacity: 0.7, display: 'flex', alignItems: 'center' }}>
                  <IconRenderer name="close" className="w-4 h-4" />
                </div>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <input 
              value={newPlayerName} 
              onChange={(e) => setNewPlayerName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAddPlayer()}
              placeholder="Añadir jugador..." 
              style={{ flex: 1, padding: '12px 15px', borderRadius: '12px', border: '1px solid #ddd', fontFamily: "'Outfit', sans-serif", fontSize: '0.95rem', outline: 'none' }} 
            />
            <button 
              onClick={handleAddPlayer} 
              style={{ backgroundColor: '#023852', color: 'white', border: 'none', borderRadius: '12px', padding: '0 20px', fontWeight: 800, cursor: 'pointer' }}
            >
              +
            </button>
          </div>
        </div>

        {/* BOTÓN SELECCIONAR TODAS */}
        <div onClick={handleSelectAll} style={{ display: 'flex', alignItems: 'center', padding: '1.2rem 1.5rem', backgroundColor: 'white', borderBottom: '1px solid #f2f2f2', cursor: 'pointer', WebkitTapHighlightColor: 'transparent', userSelect: 'none' }}>
          <div style={{ width: '26px', height: '26px', borderRadius: '8px', flexShrink: 0, border: `2px solid ${isAllSelected ? '#1a1a1a' : '#d0d0d0'}`, backgroundColor: isAllSelected ? '#1a1a1a' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '15px', transition: 'all 0.2s ease' }}>
            {isAllSelected && <IconRenderer name="done_all" className="w-5 h-5 text-white" color="white" />}
          </div>
          <span style={{ fontWeight: 800, fontSize: '1.1rem', color: '#1a1a1a' }}>Seleccionar todas las barajas</span>
        </div>

        {/* LISTA DE BARAJAS */}
        {decks.map((deck) => {
          const isSelected = selectedDecks.includes(deck.id);
          const isExpanded = expanded === deck.id;

          return (
            <div key={deck.id} style={{ borderBottom: '1px solid #f2f2f2' }}>
              <div onClick={() => toggleSelection(deck.id)} style={{ display: 'flex', alignItems: 'center', padding: '1.2rem 1.5rem', backgroundColor: isSelected ? `${deck.color}08` : 'transparent', transition: 'background-color 0.3s ease', cursor: 'pointer', WebkitTapHighlightColor: 'transparent', userSelect: 'none' }}>
                <div style={{ width: '26px', height: '26px', borderRadius: '8px', flexShrink: 0, border: `2px solid ${isSelected ? deck.color : '#d0d0d0'}`, backgroundColor: isSelected ? deck.color : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '15px', transition: 'all 0.2s ease' }}>
                  {isSelected && <IconRenderer name="check" className="w-5 h-5 text-white" color="white" />}
                </div>
                <div style={{ flex: 1, display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
                  <IconRenderer name={deck.icon} className="w-8 h-8 mr-4 flex-shrink-0" color={deck.color} />
                  <span style={{ fontWeight: 700, fontSize: '1.1rem', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden', marginLeft: '5px' }}>{deck.title}</span>
                </div>
                <div onClick={(e) => { e.stopPropagation(); setExpanded(isExpanded ? null : deck.id); }} style={{ cursor: 'pointer', padding: '10px', flexShrink: 0, transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)', WebkitTapHighlightColor: 'transparent', display: 'flex', alignItems: 'center' }}>
                  <IconRenderer name="expand_more" className="w-6 h-6" color="#ccc" />
                </div>
              </div>
              <div style={{ maxHeight: isExpanded ? '150px' : '0', opacity: isExpanded ? 1 : 0, overflow: 'hidden', transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)', backgroundColor: '#fafafa' }}>
                <p style={{ padding: '0.8rem 1.5rem 1.2rem 4rem', margin: 0, fontSize: '0.9rem', color: '#666', lineHeight: '1.5' }}>{deck.desc}</p>
              </div>
            </div>
          );
        })}
      </div>

      <footer style={{ padding: '1.5rem', width: '100%', maxWidth: '500px', margin: '0 auto', flexShrink: 0, backgroundColor: 'white', borderTop: '1px solid #eee' }}>
        <button 
          onClick={handleContinue}
          style={{ width: '100%', padding: '1.2rem', backgroundColor: (players.length > 0 && selectedDecks.length > 0) ? '#079FA0' : '#ccc', color: 'white', border: 'none', borderRadius: '16px', fontSize: '1.2rem', fontWeight: 800, cursor: (players.length > 0 && selectedDecks.length > 0) ? 'pointer' : 'not-allowed', transition: 'background-color 0.3s' }}
        >
          COMENZAR JUEGO
        </button>
      </footer>
    </div>
  );
}
