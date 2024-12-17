import pokeApi from '../../models/js/pokeApi.js';
import { renderPokemonList } from '../../views/js/pokemonListView.js';
import { filterPokemonList } from '../../views/js/pokemonListView.js';

const pokemonList = document.getElementById('pokemon_list');
const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');

// Função para carregar os Pokémon
export async function loadPokemons() {
    try {
        const data = await pokeApi.getPokemons();
        if (data) {
            renderPokemonList(data, pokemonList);
        }
    } catch (error) {
        console.error('Erro ao carregar Pokémons:', error);
        switch (error.name) {
            case 'TypeError':
                window.alert(
                    'Parece que houve um problema de conexão ou a página está indisponível no momento. Por favor, verifique sua conexão com a internet e tente novamente.'
                );
                break;
            case 'SyntaxError':
                window.alert('Encontramos um problema ao processar os dados recebidos. Por favor, atualize a página e tente novamente.');
                break;
            default:
                window.alert('Ocorreu um erro ao tentar buscar as informações. Por favor, tente novamente mais tarde.');
                break;
        }
    }
}

// function to search by type or name
async function searchPokemon(query) {
    try {
        const data = await pokeApi.searchPokemon(query);
        if (data) {
            pokemonList.innerHTML = '';
            renderPokemonList(data, pokemonList);
        } else {
            window.alert('Nenhum Pokémon encontrado.');
        }
    } catch (error) {
        console.error('Erro ao buscar Pokémon:', error);
        window.alert('Ocorreu um erro ao tentar buscar os Pokémon. Por favor, tente novamente mais tarde.');
    }
}

// debounce function to set a timeout
function debounce(func, wait) {
    let timeout;
    return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}

searchButton.addEventListener('click', () => {
    const query = searchInput.value.toLowerCase();
    if (query) {
        searchPokemon(query);
    }
});

searchInput.addEventListener('input', debounce(() => {
        const query = searchInput.value.toLowerCase();
        if (query) {
            searchPokemon(query);
        }
    }, 300)// waits 300ms between searches
); 
