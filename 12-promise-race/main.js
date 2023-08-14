"use strict";

const mockUrl = "https://dummyjson.com/products/";
const mockProductsId = [1, 2, 3, 4, 5, 6, 7, 8,];

function getProduct(id) {
  return new Promise((resolve, reject) => {
    fetch(`${mockUrl}${id}`)
      .then((response) => response.json())
      .then(resolve, reject)
      .catch(reject);
  });
}

// оригинальная функция из интернета, не понимаю зачем делать Promise.resolve если у нас и так список промисов у которых есть метод then
// const race = function(promisesArray) {
//   return new Promise((resolve, reject) => {
//     promisesArray.forEach((promise) => {
//       Promise.resolve(promise)
//         .then(resolve, reject) // resolve, when any of the input promise resolves
//         .catch(reject); // reject, when any of the input promise rejects
//     });
//   });
// };

function race(promisesArray) {
  return new Promise((resolve, reject) => {
    promisesArray.forEach((promise) => {
      promise.then(resolve, reject).catch(reject);
    });
  });
};

function main() {
  const promisesArr = mockProductsId.map((el) => getProduct(el));
  console.log(promisesArr);
  race(promisesArr)
    .then((winner) => console.log(winner))
    .catch((error) => console.log("Error!", error));
}



main();
