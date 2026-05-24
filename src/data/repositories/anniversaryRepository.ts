import { allQuestions, deckMetadata } from '../json/anniversaryQuestions';

export const anniversaryRepository = {
  getAllQuestions: () => {
    return allQuestions;
  },
  getDeckMetadata: () => {
    return deckMetadata;
  }
};
