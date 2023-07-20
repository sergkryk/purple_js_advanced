const sampleArr = [
  { id: 1, name: "Вася" },
  { id: 2, name: "Петя" },
  { id: 1, name: "Семён" },
  { id: 3, name: "Антон" },
];

const sample2 = [
  { id: 1, name: "Семён" },
  { id: 1, name: "Вася" },
  { id: 2, name: "Петя" },
  { id: 1, name: "Семён" },
  { id: 3, name: "Антон" },
  { id: 3, name: "Антон" },
  { id: 3, name: "Даша" },
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


// проверка объектов на одинаковость сравнивая все ключи первого уровня
function isShallowEqual(obj1, obj2) {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) {
    return false;
  }

  for (let key of keys1) {
    if (obj1[key] !== obj2[key]) {
      return false;
    }
  }

  return true;
}

function isShallowEqualViaJson(obj1, obj2) {
  return JSON.stringify(obj1) === JSON.stringify(obj2);
}

// функция проверки массива объектов 
function getUniqueObjects(arr) {
  return arr.reduce((acc, el) => {
    if (
      acc.some((accEl) => {
        return isShallowEqualViaJson(accEl, el);
      })
    ) {
      return acc;
    }
    acc.push(el);
    return acc;
  }, []);
}

console.log(getUniqueObjects(sample2));
