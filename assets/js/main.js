const pokemonList = document.getElementById('pokemon_list');

//Function to capitalize only the first letter
function capitalizeFirstLetter(pokeName) {
    return pokeName.charAt(0).toUpperCase() + pokeName.slice(1);
    /*
    string = 'pikachu'
    string.charAt(0) = p
    string.slice(1) = ikachu
    */
}

function convertPokemonTypes (pokemonTypes){
    return pokemonTypes.map((typeSlot) => `<li class="type">${typeSlot.type.name}</li>`
)}

//function to create an html structure of the pokemon
function pokemonToLi(pokemon) {
    return `
            <li class="pokemon">
                <span class="number">#00${pokemon.order}</span>
                <span class="name">${capitalizeFirstLetter(pokemon.name)}</span>
                <div class="detail">
                    <ol class="types">
                        ${convertPokemonTypes(pokemon.types).join('')}
                    </ol>
                    <img src=${pokemon.sprites.other["official-artwork"].front_default} alt="${pokemon.name}" />
                </div>
            </li>
            `;
}

// Function to convert data into HTML
function convertDataToHtml(pokemons) {
    //using map to go through the pokemons array, get our pokemon list converts it to a li list
    //join it without space
    pokemonList.innerHTML += pokemons.map(pokemonToLi).join('');
}

// Async function to load Pokémons and convert them to HTML
async function loadPokemon() {
    const data = await pokeApi.getPokemons();// Call the pokeApi.getPokemons to fetch the list of Pokémons

    // If data is successfully fetched, convert it to HTML
    if (data) {
        convertDataToHtml(data);
    } else {
        return;
    }
}

loadPokemon();