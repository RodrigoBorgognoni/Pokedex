const offset = 0;
const limit = 10;
const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
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

//function to create dynamically and add a new pokemon to our list
function createPokemon(pokemon) {
    const newPokemon = document.createElement('li'); //creates a new li
    newPokemon.innerHTML = pokemonToLi(pokemon); //calls our pokemonToLi to create the whole structure of our pokemon with .innerhtml
    pokemonList.appendChild(newPokemon); //adds the new li as last child to pokemonList
}

//Async function to call PokeApi
async function fetchData(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Erro ao buscar dados:', error);
    } finally {
        console.log('Requisição Concluída');
    }
}

// Function to convert data into HTML
function convertDataToHtml(data) {
    const pokemons = data.results; // Returns only the pokemon (array of results) of data object
    // Loop 'for' to iterate Pokemon list
    for (let index = 0; index < pokemons.length; index++) {
        const pokemon = pokemons[index];
        console.log(pokemon);
        createPokemon(pokemon); //calls our function and adds pokemon based on its index
    }
}

async function loadPokemon(url) {
    const data = await fetchData(url);
    if (data) {
        convertDataToHtml(data);
    } else {
        window.alert('Unable to Load Pokemons');
    }
}

loadPokemon(url);
