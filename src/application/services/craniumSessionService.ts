import { craniumRepository } from '@gamecards/data';
import type { CraniumCategory, CraniumCard } from '../models/Cranium';

const STORAGE_KEY = "juego_cranium_proceso";

export const craniumSessionService = {
  getCategories: (): CraniumCategory[] => {
    return craniumRepository.getCategoryMetadata();
  },

  getAllCardsByCategory: (categoryId: string): CraniumCard[] => {
    switch(categoryId) {
      case 'acting': return craniumRepository.getActingCards();
      case 'drawing': return craniumRepository.getDrawingCards();
      case 'trivia': return craniumRepository.getTriviaCards();
      case 'words': return craniumRepository.getWordsCards();
      default: return [];
    }
  },

  getPlayedIds: (): string[] => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  },

  savePlayedId: (id: string) => {
    const played = craniumSessionService.getPlayedIds();
    if (!played.includes(id)) {
      const updated = [...played, id];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    }
  },

  resetProgress: () => {
    localStorage.removeItem(STORAGE_KEY);
  },

  pickRandomCard: (categoryId: string): CraniumCard | null => {
    const allCards = craniumSessionService.getAllCardsByCategory(categoryId);
    const playedIds = craniumSessionService.getPlayedIds();
    
    // Filtrar cartas que no se han jugado
    let availableCards = allCards.filter(c => !playedIds.includes(c.id));
    
    // Si ya se jugaron todas de esta categoría, se resetea (solo para esta categoría, en un escenario real tal vez resetear todo el juego, o permitir repetir)
    if (availableCards.length === 0) {
      availableCards = allCards; 
      // Opcionalmente: limpiar las IDs jugadas de esta categoría en localStorage, pero para este MVP simplemente permitimos repetir si se acaban.
    }

    if (availableCards.length === 0) return null;

    const randomIndex = Math.floor(Math.random() * availableCards.length);
    const pickedCard = availableCards[randomIndex];
    
    craniumSessionService.savePlayedId(pickedCard.id);
    return pickedCard;
  }
};
