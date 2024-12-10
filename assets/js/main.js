const pokemonList = document.getElementById('pokemon_list');

//Function to capitalize only the first letter
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
    /*
    string = 'pikachu'
    string.charAt(0) = p
    string.slice(1) = ikachu
    */
}

//function to create an html structure of the pokemon
function pokemonToLi(pokemon) {
    return `
            <li class="pokemon">
                <span class="number">#001</span>
                <span class="name">${capitalizeFirstLetter(pokemon.name)}</span>
                <div class="detail">
                    <ol class="types">
                        <li class="type">Grass</li>
                        <li class="type">Poison</li>
                    </ol>
                    <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png" alt="${pokemon.name}" />
                </div>
            </li>
            `;
}

// Function to convert data into HTML
function convertDataToHtml(data) {
    const pokemons = data.results; // Returns only the pokemon (array of results) of data object

    //using map to go through the pokemons array, get our pokemon list converts it to a li list
    //join it without space
    pokemonList.innerHTML += pokemons.map(pokemonToLi).join('');

    console.log(pokemons.map(pokemonToLi));
}

async function loadPokemon() {
    const data = await pokeApi.getPokemons();
    if (data) {
        convertDataToHtml(data);
    } else {
        return;
    }
}

loadPokemon();
