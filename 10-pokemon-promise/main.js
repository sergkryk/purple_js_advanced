const URL = "https://pokeapi.co/api/v2/pokemon/ditto";

function getData(url, errorMessage) {
  return fetch(url).then((response) => {
    if (!response.ok) {
      throw new Error(errorMessage);
    }
    return response.json();
  });
}

const pokemon = getData(URL, "Не удалось получить данные о покемоне");

function pokemonResolve(data) {
  const { abilities } = data;
  if (abilities.length && abilities.length > 0) {
    const { ability } = abilities[0];
    if ("url" in ability) {
      getData(ability.url, "Не удалось получить данные о способности").then(response => {
        console.log(response);
      });
    }
  }
}

function pokemonReject(error) {
  console.log(error);
}

pokemon.then(pokemonResolve, pokemonReject);
