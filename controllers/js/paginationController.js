import pokeApi from '../../models/js/pokeApi.js';
import { renderPokemonList } from '../../views/js/pokemonListView.js';

const loadNextButton = document.getElementById('loadNext');
let currentOffset = 0;
const limit = 16;
let isLoading = false;

async function loadPokemons(offset, limit, container) {
    isLoading = true;
    loadNextButton.disabled = true; // deactivates button while loading
    try {
        const data = await pokeApi.getPokemons(offset, limit);
        renderPokemonList(data, container);
        isLoading = false;
        loadNextButton.disabled = false; // Reactivates button after load
    } catch (error) {
        console.error('Erro ao carregar Pokémons:', error);
        window.alert('Não foi possível carregar os Pokémons');
        isLoading = false;
        loadNextButton.disabled = false; // Reactivates button even if error
    }
}

export function setupPagination(container) {
    loadNextButton.addEventListener('click', () => {
        if (!isLoading) { // Stop multiple loading
            currentOffset += limit;
            loadPokemons(currentOffset, limit, container);
        }
    });
}
