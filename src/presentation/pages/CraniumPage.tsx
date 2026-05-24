import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { craniumSessionService } from '@gamecards/application';
import type { CraniumCard, CraniumCategory } from '@gamecards/application';
import { IconRenderer } from '../components/IconRenderer';
import CraniumCardModal from '../components/CraniumCardModal';
import CraniumRoulette from '../components/CraniumRoulette';

export default function CraniumPage() {
  const navigate = useNavigate();
  const categories = craniumSessionService.getCategories();
  
  const [activeCard, setActiveCard] = useState<CraniumCard | null>(null);
  const [activeCategory, setActiveCategory] = useState<CraniumCategory | null>(null);

  const [rouletteResult, setRouletteResult] = useState<string | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);

  const handlePickCard = (category: CraniumCategory) => {
    if (!rouletteResult) return; 
    if (rouletteResult !== 'wildcard' && rouletteResult !== category.id) return; 

    const card = craniumSessionService.pickRandomCard(category.id);
    if (card) {
      setActiveCategory(category);
      setActiveCard(card);
    } else {
      alert("¡Ya han jugado todas las cartas de esta categoría!");
    }
  };

  const handleCloseCard = () => {
    setActiveCard(null); 
    setActiveCategory(null);
    setRouletteResult(null); 
  };

  return (
    <div style={{ backgroundColor: '#111', width: '100%', height: '100dvh', color: 'white', display: 'flex', flexDirection: 'column', fontFamily: "'Outfit', sans-serif", overflow: 'hidden' }}>
      <header style={{ padding: '1rem 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#1a1a1a', borderBottom: '1px solid #333', flexShrink: 0 }}>
        <button onClick={() => navigate('/')} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
          <IconRenderer name="arrow_back_ios" className="w-6 h-6" />
        </button>
        <h2 style={{ fontSize: '1.2rem', fontWeight: 900, margin: 0, letterSpacing: '1px' }}>CRANIUM ESPIRITUAL</h2>
        <div style={{ width: '24px' }}></div>
      </header>

      <CraniumRoulette 
        onResult={(res) => setRouletteResult(res)} 
        isSpinning={isSpinning} 
        setIsSpinning={setIsSpinning} 
        resultId={rouletteResult} 
      />

      <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: '1fr 1fr', gap: '1rem', padding: '0 1.5rem 1.5rem', overflow: 'hidden' }}>
        {categories.map((cat) => {
          const isAllowed = rouletteResult === 'wildcard' || rouletteResult === cat.id;
          const isDisabled = !rouletteResult || !isAllowed;
          return (
            <div 
              key={cat.id} 
              onClick={() => handlePickCard(cat)}
              style={{ 
                backgroundColor: cat.color, borderRadius: '20px', display: 'flex', flexDirection: 'column', 
                alignItems: 'center', justifyContent: 'center', padding: '1rem', cursor: isDisabled ? 'not-allowed' : 'pointer', 
                boxShadow: '0 8px 20px rgba(0,0,0,0.3)', transition: 'all 0.3s', position: 'relative', overflow: 'hidden',
                opacity: isDisabled ? 0.3 : 1,
                transform: !isDisabled && rouletteResult ? 'scale(1.02)' : 'scale(1)'
              }}
              className={!isDisabled && rouletteResult ? 'animate-pulse ring-4 ring-white' : ''}
            >
              <IconRenderer name={cat.icon} className="w-12 h-12 mb-2 opacity-90" color="white" />
              <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 800, textAlign: 'center', textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>{cat.title}</h3>
              <span style={{ fontSize: '0.7rem', opacity: 0.8, textAlign: 'center', marginTop: '4px', fontWeight: 600 }}>{cat.desc}</span>
              <div style={{ position: 'absolute', top: '-10%', left: '-10%', width: '120%', height: '120%', background: 'linear-gradient(45deg, rgba(255,255,255,0.1), transparent)', pointerEvents: 'none' }}></div>
            </div>
          );
        })}
      </div>

      <CraniumCardModal 
        card={activeCard} 
        category={activeCategory} 
        onClose={handleCloseCard} 
      />
    </div>
  );
}
