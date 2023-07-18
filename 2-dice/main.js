function getRandomNumber(max) {
  return Math.ceil(Math.random() * max);
}

function rollDice(diceType) {
  const max = diceType.replace(/\D/g, '');
  return getRandomNumber(max);
}


// сделано для проверки и отслеживания результата
const results = [];

for (let i = 0; i <= 100; i++) {
  results.push(rollDice('dice5'));
}

function countItems(arr) {
  return arr.reduce((acc, el) => {
    if (acc[el]) {
      acc[el] = acc[el] + 1;
      return acc;
    }
    acc[el] = 1;
    return acc;
  }, {})
}

console.log(countItems(results));