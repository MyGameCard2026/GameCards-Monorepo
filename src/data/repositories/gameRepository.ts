import games from '../json/games.json';

export const gameRepository = {
  getGamesByUserId: (userId: string) => {
    return games.filter(game => game.userId === userId);
  }
};
