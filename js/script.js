const pokemonName = document.querySelector(".pokemon__name");
const pokemonId = document.querySelector(".pokemon__number");
const pokemonSprite = document.querySelector(".pokemon__image");

const form = document.querySelector(".form");
const input = document.querySelector(".input__search");
const prevButton = document.querySelector(".btn-prev");
const nextButton = document.querySelector(".btn-next");

let searchPokemons = 1;

const fetchPokemon = async (pokemon) => {
  const APIResponse = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${pokemon}`
  );
  if (APIResponse.status === 200) {
    const data = await APIResponse.json();
    return data;
  }
};

const renderPokemon = async (pokemon) => {
  pokemonName.innerHTML = "Loading..";
  pokemonId.innerHTML = "";
  pokemonSprite.style.display = "none";
  const data = await fetchPokemon(pokemon);

  if (data) {
    pokemonName.innerHTML = data.name;
    pokemonId.innerHTML = data.id;
    if (data.id < 650) {
      pokemonSprite.src =
        data["sprites"]["versions"]["generation-v"]["black-white"]["animated"][
          "front_default"
        ];
    } else if (data.id < 808) {
      pokemonSprite.src =
        data["sprites"]["versions"]["generation-vii"]["ultra-sun-ultra-moon"][
          "front_default"
        ];
    }
    input.value = "";
    pokemonSprite.style.display = "block";
    searchPokemons = data.id;

    if (data.id > 807) {
      pokemonSprite.src = "";
      pokemonName.innerHTML = "Not found :(";
      pokemonSprite.style.display = "none";
      pokemonId.innerHTML = "";
      searchPokemons = 0;
    }
  } else {
    pokemonName.innerHTML = "Not found :(";
    pokemonId.innerHTML = "";
    pokemonSprite.style.display = "none";
    searchPokemons = 1;
  }
};

form.addEventListener("submit", (event) => {
  event.preventDefault();
  renderPokemon(input.value.toLowerCase());
});

prevButton.addEventListener("click", () => {
  if (searchPokemons > 1) {
    renderPokemon(searchPokemons - 1);
  } else {
    renderPokemon((searchPokemons = 1));
  }
});

nextButton.addEventListener("click", () => {
  renderPokemon(searchPokemons + 1);
});

renderPokemon(searchPokemons);
