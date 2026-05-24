const fs = require('fs');

const files = [
  './src/data/json/cranium_trivia.json',
  './src/data/json/cranium_words.json',
  './src/data/json/cranium_acting.json',
  './src/data/json/cranium_drawing.json'
];

for (const file of files) {
  let data = JSON.parse(fs.readFileSync(file, 'utf8'));
  let modified = false;
  for (let card of data) {
    const match = card.consigna.match(/\n*\s*Respuesta:\s*(.*)$/i);
    if (match) {
      card.respuesta = match[1].trim();
      card.consigna = card.consigna.replace(/\n*\s*Respuesta:\s*(.*)$/i, '').trim();
      modified = true;
    }
  }
  if (modified) {
    fs.writeFileSync(file, JSON.stringify(data, null, 2));
    console.log(`Updated ${file}`);
  }
}
