import React, { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate, Navigate } from 'react-router-dom';
import Roulette from '../components/Roulette';
import { IconRenderer } from '../components/IconRenderer';
import { gameSessionService } from '@gamecards/application';
import type { AnniversaryQuestion } from '@gamecards/application';

export default function JuegoPage() {
  const location = useLocation();
  const navigate = useNavigate();
  
  const selectedDeckIds: string[] = location.state?.selectedDecks || [];
  const players: string[] = location.state?.players || [];

  if (players.length === 0 || selectedDeckIds.length === 0) {
    return <Navigate to="/preparacion" />;
  }

  const [isRolling, setIsRolling] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState<AnniversaryQuestion | null>(null);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [questionsQueue, setQuestionsQueue] = useState<AnniversaryQuestion[]>([]);

  const decksMeta = gameSessionService.getDecks().reduce((acc, d) => {
    acc[d.id] = d;
    return acc;
  }, {} as Record<string, any>);

  const handleResetProgress = () => {
    if (window.confirm("¿Seguro que quieren reiniciar todo el mazo? Volverán a salir todas las cartas.")) {
      gameSessionService.resetProgress();
      window.location.reload(); 
    }
  };

  const buildBalancedQueue = useCallback(() => {
    return gameSessionService.buildBalancedQueue(selectedDeckIds);
  }, [selectedDeckIds]);

  useEffect(() => {
    const newQueue = buildBalancedQueue();
    setQuestionsQueue(newQueue);
  }, [buildBalancedQueue]);

  const pickNextQuestion = useCallback(() => {
    if (questionsQueue.length === 0) return;

    const nextQueue = [...questionsQueue];
    const nextQ = nextQueue.shift(); 
    
    if (nextQ) {
      setCurrentQuestion(nextQ);
      setQuestionsQueue(nextQueue);
      gameSessionService.savePlayedId(nextQ.id);
    }
  }, [questionsQueue]);

  useEffect(() => {
    if (questionsQueue.length > 0 && !currentQuestion) {
      pickNextQuestion();
    }
  }, [questionsQueue, currentQuestion, pickNextQuestion]);

  const handleRoll = () => {
    if (isRolling || !isReady) return;
    
    if (questionsQueue.length === 0) {
        alert("¡Felicidades! Han completado todas las cartas de estos mazos.");
        return;
    }

    setIsRolling(true);
    setTimeout(() => {
      pickNextQuestion();
      setCurrentPlayerIndex((prev) => (prev + 1) % players.length);
      setIsRolling(false);
      setIsReady(false);
    }, 1000); 
  };

  if (selectedDeckIds.length === 0) return <div style={{ backgroundColor: '#023852', height: '100dvh' }} />;

  const deckInfo = currentQuestion ? decksMeta[currentQuestion.deckId] : null;
  const currentPlayerName = players[currentPlayerIndex];

  return (
    <div style={{ 
      backgroundColor: '#023852', width: '100%', height: '100dvh', 
      display: 'flex', flexDirection: 'column', padding: '0.5rem 1.2rem', 
      fontFamily: "'Outfit', sans-serif", overflow: 'hidden', boxSizing: 'border-box'
    }}>
      
      {/* NAV SUPERIOR: Salir y Reiniciar */}
      <nav style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        paddingTop: '0.5rem' 
      }}>
        <button 
          onClick={() => navigate('/preparacion')}
          style={{
            background: 'none', border: 'none', color: 'white',
            display: 'flex', alignItems: 'center', gap: '8px',
            cursor: 'pointer', opacity: 0.6
          }}
        >
          <IconRenderer name="arrow_back_ios" className="w-5 h-5" />
          <span style={{ fontWeight: 600, fontSize: '0.85rem' }}>Salir</span>
        </button>

        <button 
          onClick={handleResetProgress}
          style={{
            background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', 
            color: 'white', borderRadius: '12px', padding: '6px 12px',
            fontSize: '0.7rem', fontWeight: 600, cursor: 'pointer', opacity: 0.5
          }}
        >
          Reiniciar Mazo
        </button>
      </nav>

      {/* SECCIÓN CENTRAL: CARTA */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {currentQuestion && deckInfo && (
          <div style={{ 
            backgroundColor: 'white', borderRadius: '24px', width: '100%', maxWidth: '360px',
            borderTop: `18px solid ${deckInfo.color}`, 
            boxShadow: '0 8px 30px rgba(0,0,0,0.4)',
            padding: '1.2rem', textAlign: 'center',
            height: '280px', 
            display: 'flex', flexDirection: 'column', boxSizing: 'border-box',
            position: 'relative'
          }}>
             
             <span style={{
               position: 'absolute', top: '12px', right: '16px',
               fontSize: '0.65rem', fontWeight: 800, color: '#d1d1d1'
             }}>
               #{currentQuestion.id}
             </span>

             <h3 style={{ 
               fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px', 
               fontWeight: 800, color: deckInfo.color, margin: '0 0 12px 0'
              }}>
               Turno de: {currentPlayerName}
             </h3>
             
             <div style={{
               flex: 1, overflowY: 'auto', display: 'flex', alignItems: 'center',
               justifyContent: 'center', padding: '0 5px'
             }}>
               <h2 style={{ 
                 color: '#222', fontSize: '1.15rem',
                 fontWeight: 700, lineHeight: '1.4', margin: '0'
                }}>
                 "{currentQuestion.text}"
               </h2>
             </div>

             <p style={{ fontSize: '0.7rem', color: '#bbb', margin: '12px 0 0 0' }}>
                Cartas restantes en esta sesión: {questionsQueue.length}
             </p>
          </div>
        )}
      </div>

      {/* SECCIÓN INFERIOR */}
      <div style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        gap: '1rem', paddingBottom: '1.5rem'
      }}>
        
        <Roulette 
          isRolling={isRolling} isReady={isReady} onRoll={handleRoll} 
          resultIcon={deckInfo?.icon} resultColor={deckInfo?.color} 
        />

        <label style={{ 
          display: 'flex', alignItems: 'center', gap: '10px', color: 'white', 
          cursor: 'pointer', fontSize: '1rem', fontWeight: 600, userSelect: 'none',
          padding: '10px 20px',
          backgroundColor: isReady ? 'rgba(52, 168, 83, 0.2)' : 'rgba(255, 255, 255, 0.05)',
          borderRadius: '16px', border: isReady ? '1.5px solid #34A853' : '1.5px solid transparent'
        }}>
          <input 
            type="checkbox" checked={isReady} 
            onChange={(e) => {
              setIsReady(e.target.checked);
              if (e.target.checked && !isRolling) handleRoll();
            }}
            disabled={isRolling}
            style={{ width: '18px', height: '18px', accentColor: '#34A853' }} 
          />
          <span>{isRolling ? "GIRANDO..." : "Toca para girar"}</span>
        </label>
      </div>
    </div>
  );
}
