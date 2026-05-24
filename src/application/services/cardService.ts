import { cardRepository } from '@gamecards/data';
import type { Card } from '../models/Card';

export const cardService = {
  getGameCards: async (gameId: string): Promise<Card[]> => {
    // Simulamos un retardo de red
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(cardRepository.getCardsByGameId(gameId));
      }, 500);
    });
  }
};
