function randomNumber(max) {
  return Math.ceil(Math.random() * max);
}

function diceRoll(diceType) {
  const max = diceType.replace(/\D/g, '');
  return randomNumber(max);
}


// сделано для проверки и отслеживания резултата
const randomArr = [];

for (let i = 0; i <= 100; i++) {
  randomArr.push(diceRoll('dice5'));
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

console.log(countItems(randomArr));