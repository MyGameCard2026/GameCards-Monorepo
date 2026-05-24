import { useState } from 'react';

const COLORS = [
  { id: 'drawing', color: '#079FA0', label: 'Gato Creativo' },
  { id: 'trivia', color: '#023852', label: 'Alquimista' },
  { id: 'words', color: '#FAC005', label: 'Políglota' },
  { id: 'acting', color: '#DC2E2F', label: 'Estelar' },
  { id: 'wildcard', color: '#9b59b6', label: 'Comodín' }
];

interface CraniumRouletteProps {
  onResult: (resultId: string) => void;
  isSpinning: boolean;
  setIsSpinning: (spinning: boolean) => void;
  resultId: string | null;
}

export default function CraniumRoulette({ onResult, isSpinning, setIsSpinning, resultId }: CraniumRouletteProps) {
  const [rotation, setRotation] = useState(0);

  const handleSpin = () => {
    if (isSpinning || resultId) return; 
    setIsSpinning(true);
    
    const targetIndex = Math.floor(Math.random() * COLORS.length);
    const targetId = COLORS[targetIndex].id;

    const sliceAngle = 360 / 5;
    const randomOffset = (Math.random() - 0.5) * (sliceAngle - 10); 
    const targetRotation = 360 - (targetIndex * sliceAngle + (sliceAngle / 2)) + randomOffset;
    
    const finalRotation = rotation + 1440 + targetRotation - (rotation % 360);

    setRotation(finalRotation);

    setTimeout(() => {
      setIsSpinning(false);
      onResult(targetId);
    }, 2000);
  };

  const conicGradient = COLORS.map((c, i) => `${c.color} ${i * 72}deg ${(i + 1) * 72}deg`).join(', ');

  return (
    <div className="flex flex-col items-center justify-center shrink-0 mt-2 mb-2">
      <div className="relative w-36 h-36 cursor-pointer transition-transform hover:scale-105" onClick={handleSpin}>
        {/* Puntero Superior */}
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[12px] border-r-[12px] border-t-[16px] border-l-transparent border-r-transparent border-t-white z-10 drop-shadow-md"></div>
        
        {/* Rueda */}
        <div 
          className="w-full h-full rounded-full border-4 border-white shadow-2xl overflow-hidden"
          style={{
            background: `conic-gradient(${conicGradient})`,
            transform: `rotate(${rotation}deg)`,
            transition: 'transform 2s cubic-bezier(0.2, 0.8, 0.2, 1)'
          }}
        ></div>

        {/* Centro de la rueda */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-inner flex items-center justify-center">
          <span className="text-sm">🎲</span>
        </div>
      </div>
      
      <div className="h-8 mt-4 flex items-center justify-center">
        {!resultId && !isSpinning && <p className="font-bold text-white/80 animate-pulse text-sm">Toca la ruleta para girar</p>}
        {isSpinning && <p className="font-bold text-white/80 animate-pulse text-sm">¡Girando...</p>}
        {resultId && !isSpinning && (
          <p className="font-bold text-lg text-center" style={{ color: COLORS.find(c => c.id === resultId)?.color }}>
            {resultId === 'wildcard' ? '¡COMODÍN MORADO! Elige tu mazo' : `¡Te tocó ${COLORS.find(c => c.id === resultId)?.label}!`}
          </p>
        )}
      </div>
    </div>
  );
}
