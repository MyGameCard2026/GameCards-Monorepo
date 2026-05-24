import cards from '../json/cards.json';

export const cardRepository = {
  getCardsByGameId: (gameId: string) => {
    return cards.filter(card => card.gameId === gameId);
  }
};
