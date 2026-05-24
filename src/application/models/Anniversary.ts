export interface AnniversaryDeck {
  id: string;
  title: string;
  desc: string;
  icon: string;
  color: string;
}

export interface AnniversaryQuestion {
  id: string;
  text: string;
  deckId: string;
}
