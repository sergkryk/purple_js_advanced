const URL = "https://pokeapi.co/api/v2/pokemon/ditto";

function makeHttpRequest(url, method = "GET") {
  const request = new XMLHttpRequest();
  request.open(method, url);
  request.send();
  return request;
}

const pokemonRequest = makeHttpRequest(URL);

function abilityResponseHandler() {
  console.log(JSON.parse(this.responseText));
}

function pokemonResponseHandler() {
  const { abilities } = JSON.parse(this.responseText);
  if (abilities.length && abilities.length > 0) {
    const { ability } = abilities[0];
    if ("url" in ability) {
      const abilityRequest = makeHttpRequest(ability.url);
      abilityRequest.addEventListener("load", abilityResponseHandler);
    }
  }
}

pokemonRequest.addEventListener("load", pokemonResponseHandler);
