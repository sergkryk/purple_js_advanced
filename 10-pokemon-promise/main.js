"use strict";

const URL = "https://pokeapi.co/api/v2/pokemon";

function consoleData(data) {
  console.log(data);
}
function alertData(data) {
  alert(data);
}
function doSomethingWithData(data) {
  console.log(`I am doing something with the ${data}`);
}

// я так понимаю дополнительная обертка в виде промиса не нужна т.к. fetch и так возвращает промис

// function getData(url, errorMessage = "Что-то пошло не так") {
//   return new Promise((resolve, reject) => {
//     fetch(url).then((response) => {
//       if (!response.ok) {
//         reject(new Error(errorMessage))
//       } else {
//         resolve(response.json())
//       }
//     })
//   })
// }

function getData(url, errorMessage = "Что-то пошло не так") {
  return fetch(url).then((response) => {
    if (!response.ok) {
      throw new Error(errorMessage);
    }
    return response.json();
  });
}

function parsePokemonAbility(response) {
  const { abilities } = response;
  if (abilities.length && abilities.length > 0) {
    const [{ ability }] = abilities;
    return ability;
  }
}

function getPokemonDetails(name) {
  return getData(
    `${URL}/${name}`,
    `Не удалось получить данные о ${name}`
  );
}

function getAbilityDetails(ability) {
  const { url } = ability;
  return getData(url, "Не удалось получить данные о способности");
}

function getPokemonAbility(pokemonName) {
  return getPokemonDetails(pokemonName)
    .then(parsePokemonAbility)
    .then(getAbilityDetails)
    .catch((error) => console.log(error.message));
}

getPokemonAbility("ditto").then(consoleData);
getPokemonAbility("pikachu").then(alertData);
getPokemonAbility("torchic").then(doSomethingWithData);
