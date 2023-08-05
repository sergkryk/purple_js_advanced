'use strict';

const mockUrl = 'https://dummyjson.com/products/'
const mockProductsId = [1,2,3,4,5,6,7,8];

async function getProduct(id) {
  const res = await fetch(`${mockUrl}${id}`);
  const data = await res.json();
  return data;
}

async function race(promises) {
  const result = await Promise.race(promises);
  return result;
}

async function main() {
  const promisesArr = mockProductsId.map(el => getProduct(el))
  const winner = await race(promisesArr);
  console.log(winner);
}

main();