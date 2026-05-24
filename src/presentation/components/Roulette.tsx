import React from 'react';
import { IconRenderer } from './IconRenderer';

interface RouletteProps {
  isRolling: boolean;
  isReady: boolean;
  onRoll: () => void;
  resultIcon?: string;
  resultColor?: string;
}

const Roulette: React.FC<RouletteProps> = ({ isRolling, resultIcon, resultColor }) => {
  return (
    <div 
      className={`relative w-24 h-24 rounded-full flex items-center justify-center shadow-lg transition-all duration-700 ease-in-out border-4 ${isRolling ? 'animate-spin border-white' : 'border-transparent'}`}
      style={{
        backgroundColor: isRolling ? '#555' : (resultColor || '#333'),
        transform: isRolling ? 'rotate(1080deg) scale(1.1)' : 'rotate(0deg) scale(1)'
      }}
    >
      {!isRolling && resultIcon && (
        <div className="transition-opacity duration-300 opacity-100 flex items-center justify-center">
          <IconRenderer name={resultIcon} className="w-12 h-12" color="white" />
        </div>
      )}
      {isRolling && (
        <div className="animate-pulse flex items-center justify-center">
          <IconRenderer name="sync" className="w-12 h-12" color="white" />
        </div>
      )}
      {!isRolling && !resultIcon && (
        <div className="opacity-50 flex items-center justify-center">
          <IconRenderer name="casino" className="w-10 h-10" color="white" />
        </div>
      )}
    </div>
  );
};

export default Roulette;
