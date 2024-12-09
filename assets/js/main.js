const offset = 0;
const limit = 10;
const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;

//function to create an html structure of the pokemon
function pokemonToLi(pokemon) {
    return `
            <li class="pokemon">
                <span class="number">#001</span>
                <span class="name">${pokemon.name}</span>
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
    // Returns only the pokemon (array of results) of data object
    const pokemonList = data.results;
    debugger;
    // Loop 'for' to iterate Pokemon list
    for (let index = 0; index < pokemonList.length; index++) {
        const pokemon = pokemonList[index];
        console.log(pokemonToLi(pokemon));
    }
}

async function main(url) {
    const data = await fetchData(url);
    if (data) {
        convertDataToHtml(data);
    } else { window.alert('Unable to Load Pokemons') }
}

main(url);
