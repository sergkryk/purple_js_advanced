"use strict";

const URL = "https://pokeapi.co/api/v2/pokemon";

// интересно нужна ли такая функция ради функции?
function getResponseJson(data) {
  return JSON.parse(data);
}

function makeHttpRequest(url, method = "GET") {
  const request = new XMLHttpRequest();
  request.open(method, url);
  request.send();
  return request;
}

function consoleData() {
  console.log(getResponseJson(this.responseText));
}

function alertData() {
  const { name } = getResponseJson(this.responseText);
  alert(`The ability is ${name}`);
}

function doSomethingWithData() {
  console.log(
    `I am doing something with the ${getResponseJson(this.responseText).name}`
  );
}

function getAbilityDetails(url, detailsResponseHandler) {
  const abilityRequest = makeHttpRequest(url);
  abilityRequest.addEventListener("load", detailsResponseHandler);
}

function pokemonResponseHandler (detailsResponseHandler) {
  const { abilities } = getResponseJson(this.responseText);
  if (abilities.length && abilities.length > 0) {
    const [{ ability }] = abilities;
    getAbilityDetails(ability?.url, detailsResponseHandler);
  }
};

function getPokemonAbility(name, detailsResponseHandler) {
  const pokemonRequest = makeHttpRequest(`${URL}/${name}`);

  pokemonRequest.addEventListener("load", function() {
    // вот здесь не пойму, по идее если бы я обьявил pokemonResponseHandler через стрелочную функцию то мне бы не нужно было привязывать this,
    // но нет, ничего не работало и this указывал на Window а не на XMLHttpRequest
    pokemonResponseHandler.call(this,detailsResponseHandler);
  });
}

getPokemonAbility("ditto", consoleData);
getPokemonAbility("pikachu", alertData);
getPokemonAbility("torchic", doSomethingWithData);
