const arr = [
  {id: 1, name: "Вася"},
  {id: 2, name: "Петя"},
  {id: 1, name: "Семён"},
  {id: 3, name: "Антон"},
]

const unique = Array.from(new Set(arr.map(a => a.id)))
 .map(id => {
   return arr.find(a => a.id === id)
 });
 
