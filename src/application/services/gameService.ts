import { gameRepository } from '@gamecards/data';
import type { Game } from '../models/Game';

export const gameService = {
  getUserGames: async (userId: string): Promise<Game[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(gameRepository.getGamesByUserId(userId));
      }, 500);
    });
  }
};
