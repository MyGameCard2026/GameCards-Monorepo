import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { craniumSessionService } from '@gamecards/application';
import type { CraniumCard, CraniumCategory } from '@gamecards/application';
import { IconRenderer } from '../components/IconRenderer';
import CraniumCardModal from '../components/CraniumCardModal';

export default function CraniumPage() {
  const navigate = useNavigate();
  const categories = craniumSessionService.getCategories();
  
  const [activeCard, setActiveCard] = useState<CraniumCard | null>(null);
  const [activeCategory, setActiveCategory] = useState<CraniumCategory | null>(null);

  const handlePickCard = (category: CraniumCategory) => {
    const card = craniumSessionService.pickRandomCard(category.id);
    if (card) {
      setActiveCategory(category);
      setActiveCard(card);
    } else {
      alert("¡Ya han jugado todas las cartas de esta categoría!");
    }
  };

  return (
    <div style={{ backgroundColor: '#111', width: '100%', height: '100dvh', color: 'white', display: 'flex', flexDirection: 'column', fontFamily: "'Outfit', sans-serif", overflow: 'hidden' }}>
      <header style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#1a1a1a', borderBottom: '1px solid #333' }}>
        <button onClick={() => navigate('/')} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
          <IconRenderer name="arrow_back_ios" className="w-6 h-6" />
        </button>
        <h2 style={{ fontSize: '1.4rem', fontWeight: 900, margin: 0, letterSpacing: '1px' }}>CRANIUM ESPIRITUAL</h2>
        <div style={{ width: '24px' }}></div>
      </header>

      <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: '1fr 1fr', gap: '1rem', padding: '1.5rem', overflow: 'hidden' }}>
        {categories.map((cat) => (
          <div 
            key={cat.id} 
            onClick={() => handlePickCard(cat)}
            style={{ 
              backgroundColor: cat.color, borderRadius: '20px', display: 'flex', flexDirection: 'column', 
              alignItems: 'center', justifyContent: 'center', padding: '1rem', cursor: 'pointer', 
              boxShadow: '0 8px 20px rgba(0,0,0,0.3)', transition: 'transform 0.2s', position: 'relative', overflow: 'hidden'
            }}
          >
            <IconRenderer name={cat.icon} className="w-16 h-16 mb-2 opacity-90" color="white" />
            <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 800, textAlign: 'center', textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>{cat.title}</h3>
            <span style={{ fontSize: '0.75rem', opacity: 0.8, textAlign: 'center', marginTop: '4px', fontWeight: 600 }}>{cat.desc}</span>
            <div style={{ position: 'absolute', top: '-10%', left: '-10%', width: '120%', height: '120%', background: 'linear-gradient(45deg, rgba(255,255,255,0.1), transparent)', pointerEvents: 'none' }}></div>
          </div>
        ))}
      </div>

      <CraniumCardModal 
        card={activeCard} 
        category={activeCategory} 
        onClose={() => { setActiveCard(null); setActiveCategory(null); }} 
      />
    </div>
  );
}
