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

function getData(url, errorMessage = "Что-то пошло не так") {
  return fetch(url).then((response) => {
    if (!response.ok) {
      throw new Error(errorMessage);
    }
    return response.json();
  });
}

function sendRequest(url, responseHandler, errorMessage) {
  return getData(url, errorMessage).then(
    responseHandler
  );
}

function parsePokemonAbility(response) {
  const { abilities } = response;
  if (abilities.length && abilities.length > 0) {
    const [{ ability }] = abilities;
    return ability;
  }
}

function getPokemonAbility(pokemonName, pokemonAbilityHandler) {
  sendRequest(`${URL}/${pokemonName}`, parsePokemonAbility, `Не удалось получить данные о ${pokemonName}`)
    .then((ability) => sendRequest(ability?.url, pokemonAbilityHandler), "Не удалось получить данные о способности");
}

getPokemonAbility("ditto", consoleData);
getPokemonAbility("pikachu", alertData);
getPokemonAbility("torchic", doSomethingWithData);
