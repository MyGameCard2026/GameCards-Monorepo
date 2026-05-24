export interface CraniumCategory {
  id: string;
  title: string;
  color: string;
  icon: string;
  desc: string;
}

export interface CraniumCard {
  id: string;
  type: string;
  subtype: string;
  consigna: string;
  respuesta?: string;
  deckId: string;
}
