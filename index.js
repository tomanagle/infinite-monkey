const fs = require('fs');
const initialData = require('./data.json');

const target = fs.readFileSync('./target.txt', 'utf8');

const letters = [
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
  'n',
  'o',
  'p',
  'q',
  'r',
  's',
  't',
  'u',
  'v',
  'w',
  'x',
  'y',
  'z'
];

let current = '';

let best = initialData.best || [];

const resetOnFailure = true; // Should the current be reset on every failure

function shouldBest({ current }) {
  if (!current) return;
  const bestBest = best[best.length - 1];

  if (!bestBest || current.length > bestBest.word.length) {
    best.push({
      word: current,
      timestamp: new Date()
    });

    fs.writeFileSync(
      './data.json',
      JSON.stringify({
        best: best
      }),
      'utf-8'
    );
  }
}

while (current !== letters) {
  const letter = letters[Math.floor(Math.random() * 26)];
  const targetLetter = target[current.length];

  const adjustedTarget =
    targetLetter !== ' ' ? targetLetter : target[current.length + 1];

  if (targetLetter === ' ') {
    current = current + ' ';
    continue;
  }

  const fits = letter === adjustedTarget;

  if (fits) {
    current = `${current}${letter}`;

    shouldBest({ current });

    continue;
  } else if (resetOnFailure) {
    current = '';
    continue;
  }
}
