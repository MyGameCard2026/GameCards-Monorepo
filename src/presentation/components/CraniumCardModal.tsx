import { useEffect, useState } from 'react';
import type { CraniumCard, CraniumCategory } from '@gamecards/application';
import { IconRenderer } from './IconRenderer';

interface CraniumCardModalProps {
  card: CraniumCard | null;
  category: CraniumCategory | null;
  onClose: () => void;
}

export default function CraniumCardModal({ card, category, onClose }: CraniumCardModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);

  useEffect(() => {
    if (card && category) {
      setTimeout(() => setIsOpen(true), 10);
      setShowAnswer(false);
    } else {
      setIsOpen(false);
      setShowAnswer(false);
    }
  }, [card, category]);

  if (!card || !category) return null;

  return (
    <div 
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.85)', zIndex: 100,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '1.5rem',
        opacity: isOpen ? 1 : 0,
        transition: 'opacity 0.3s ease',
        backdropFilter: 'blur(6px)'
      }}
      onClick={onClose}
    >
      <div 
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%', maxWidth: '380px', maxHeight: '85vh',
          backgroundColor: 'white', borderRadius: '24px',
          boxShadow: `0 0 50px ${category.color}50, 0 25px 50px rgba(0,0,0,0.5)`,
          transform: isOpen ? 'scale(1) translateY(0) rotateY(0deg)' : 'scale(0.8) translateY(50px) rotateY(-90deg)',
          transition: 'transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
          display: 'flex', flexDirection: 'column',
          position: 'relative', overflow: 'hidden'
        }}
      >
        <div style={{ backgroundColor: category.color, padding: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', flexShrink: 0 }}>
          <IconRenderer name={category.icon} className="w-10 h-10 text-white mb-2" color="white" />
          <h2 style={{ color: 'white', margin: 0, fontSize: '1.3rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '2px' }}>{card.type}</h2>
        </div>
        
        <div style={{ flex: 1, padding: '1.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', overflowY: 'auto' }}>
          <div style={{ backgroundColor: `${category.color}20`, color: category.color, padding: '0.4rem 1rem', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '1.5rem', textAlign: 'center', border: `1px solid ${category.color}50` }}>
            {card.subtype}
          </div>

          <p style={{ color: '#111', fontSize: '1.25rem', fontWeight: 600, lineHeight: 1.5, margin: 0, textAlign: 'center', flex: 1, display: 'flex', alignItems: 'center', whiteSpace: 'pre-wrap', wordBreak: 'break-word', width: '100%' }}>
            {card.consigna}
          </p>

          {card.respuesta && (
            <div style={{ width: '100%', marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {!showAnswer ? (
                <button 
                  onClick={() => setShowAnswer(true)}
                  style={{ width: '100%', padding: '0.8rem', backgroundColor: '#f0f0f0', border: '1px dashed #ccc', borderRadius: '12px', color: '#666', fontWeight: 700, cursor: 'pointer', fontSize: '0.9rem' }}
                >
                  Ojo 👁️ Ver Respuesta
                </button>
              ) : (
                <div style={{ width: '100%', padding: '1rem', backgroundColor: '#eefcf5', border: '1px solid #a3e6cd', borderRadius: '12px', color: '#0d593d', textAlign: 'center' }}>
                  <span style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, opacity: 0.7, marginBottom: '0.3rem' }}>RESPUESTA</span>
                  <span style={{ fontSize: '1.1rem', fontWeight: 700 }}>{card.respuesta}</span>
                </div>
              )}
            </div>
          )}
        </div>

        <button 
          onClick={onClose}
          style={{
            margin: '0 1.5rem 1.5rem', padding: '1rem', backgroundColor: category.color, color: 'white',
            border: 'none', borderRadius: '14px', fontSize: '1rem', fontWeight: 800, cursor: 'pointer',
            boxShadow: `0 4px 14px ${category.color}60`
          }}
        >
          CERRAR CARTA
        </button>
      </div>
    </div>
  );
}
