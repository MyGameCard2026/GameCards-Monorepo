import { anniversaryRepository } from '@gamecards/data';
import type { AnniversaryQuestion, AnniversaryDeck } from '../models/Anniversary';

const STORAGE_KEY = "juego_aniversario_proceso";

export const gameSessionService = {
  getDecks: (): AnniversaryDeck[] => {
    const meta = anniversaryRepository.getDeckMetadata();
    return Object.entries(meta).map(([id, data]) => ({
      id,
      title: data.title,
      desc: data.desc,
      icon: data.icon,
      color: data.color
    }));
  },

  getAllQuestions: (): AnniversaryQuestion[] => {
    return anniversaryRepository.getAllQuestions().map(q => ({
      id: q.id,
      text: q.text,
      deckId: q.deckId
    }));
  },

  getPlayedIds: (): string[] => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  },

  savePlayedId: (id: string) => {
    const played = gameSessionService.getPlayedIds();
    if (!played.includes(id)) {
      const updated = [...played, id];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    }
  },

  resetProgress: () => {
    localStorage.removeItem(STORAGE_KEY);
  },

  buildBalancedQueue: (selectedDeckIds: string[]): AnniversaryQuestion[] => {
    if (selectedDeckIds.length === 0) return [];
    
    const playedIds = gameSessionService.getPlayedIds();
    const allQuestions = gameSessionService.getAllQuestions();

    const groups: Record<string, AnniversaryQuestion[]> = {};
    selectedDeckIds.forEach(id => { groups[id] = []; });
    
    allQuestions.forEach(q => {
      if (groups[q.deckId] && !playedIds.includes(q.id)) {
        groups[q.deckId].push(q);
      }
    });

    const shuffle = (array: AnniversaryQuestion[]) => [...array].sort(() => Math.random() - 0.5);

    for (const id in groups) {
      groups[id] = shuffle(groups[id]);
    }

    const appearanceCounts: Record<string, number> = {};
    selectedDeckIds.forEach(id => { appearanceCounts[id] = 0; });

    const finalQueue: AnniversaryQuestion[] = [];
    let lastDeckId: string | null = null;

    while (true) {
      const availableDecks = selectedDeckIds.filter(id => groups[id].length > 0);
      if (availableDecks.length === 0) break;

      const minAppearances = Math.min(...availableDecks.map(id => appearanceCounts[id]));
      let validDecks = availableDecks.filter(id => appearanceCounts[id] < minAppearances + 2);
      if (validDecks.length === 0) validDecks = availableDecks;

      let candidateDecks = validDecks.filter(id => id !== lastDeckId);
      if (candidateDecks.length === 0) candidateDecks = validDecks; 

      candidateDecks.sort((a, b) => groups[b].length - groups[a].length);
      const pickedDeck = candidateDecks[0];

      const card = groups[pickedDeck].pop();
      if (card) {
        finalQueue.push(card);
        appearanceCounts[pickedDeck]++;
        lastDeckId = pickedDeck;
      }
    }

    return finalQueue;
  }
};
