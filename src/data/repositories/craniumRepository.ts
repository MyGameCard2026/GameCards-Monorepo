import craniumActing from '../json/cranium_acting.json';
import craniumDrawing from '../json/cranium_drawing.json';
import craniumTrivia from '../json/cranium_trivia.json';
import craniumWords from '../json/cranium_words.json';

export const craniumRepository = {
  getActingCards: () => craniumActing,
  getDrawingCards: () => craniumDrawing,
  getTriviaCards: () => craniumTrivia,
  getWordsCards: () => craniumWords,
  
  getCategoryMetadata: () => [
    { id: 'drawing', title: 'Gato Creativo', color: '#079FA0', icon: 'palette', desc: 'Arte y expresión no verbal' },
    { id: 'trivia', title: 'Alquimista', color: '#023852', icon: 'lightbulb', desc: 'Conocimiento y sabiduría' },
    { id: 'words', title: 'Políglota', color: '#FAC005', icon: 'abc', desc: 'Comunicación verbal estricta' },
    { id: 'acting', title: 'Estelar', color: '#DC2E2F', icon: 'theater_comedy', desc: 'Acción y conexión empática' }
  ]
};
