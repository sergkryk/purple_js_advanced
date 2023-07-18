const sampleArr = [
  { id: 1, name: "Вася" },
  { id: 2, name: "Петя" },
  { id: 1, name: "Семён" },
  { id: 3, name: "Антон" },
];

function getUniqueWithSet(arr) {
  return Array.from(new Set(arr.map((a) => a.id))).map((id) => {
    return arr.find((a) => a.id === id);
  });
}

function getUniqueWithReduce(arr) {
  return arr.reduce((acc, el) => {
    if (acc.some((item) => item.id === el.id)) {
      return acc;
    }
    acc.push(el);
    return acc;
  }, []);
}

console.log(getUniqueWithSet(sampleArr));
console.log(getUniqueWithReduce(sampleArr));
