import pokeApi from '../models/pokeApi.js';
import { setupPagination, resetPagination, setCurrentGeneration, disableButton, enableButton } from './paginationController.js';
import { renderPokemonList } from '../views/js/pokemonListView.js';
import { getGenerationRange } from './utils/utils.js';

const pokemonList = document.getElementById('pokemon_list');
const searchInput = document.getElementById('searchInput');
const generationFilters = document.querySelectorAll('input[name="generation"]');

const limit = 10;

// Function to load all Pokemons
export async function loadPokemons(generation = '1', offset = 0) {
    const [startId, endId] = getGenerationRange(generation);
    try {
        const data = await pokeApi.getPokemonsByRange(startId, endId, limit, offset);
        if (data) {
            renderPokemonList(data, pokemonList);
            if (endId - startId <= offset + limit) {
                disableButton();
            }
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

searchInput.addEventListener(
    'input',
    debounce(() => {
        const query = searchInput.value.toLowerCase();
        if (query) {
            searchPokemon(query);
        } else {
            const selectedGeneration = document.querySelector('input[name="generation"]:checked').value;
            loadPokemons(selectedGeneration);
        }
    }, 300) // waits 300ms between searches
);

// Load Pokemon based on selected Gen
generationFilters.forEach((filter) => {
    filter.addEventListener('change', (e) => {
        const generation = e.target.value;
        setCurrentGeneration(generation);
        resetPagination(generation);
        pokemonList.innerHTML = '';
        loadPokemons(generation, 0);
    });
});
