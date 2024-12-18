import { setupPagination } from './controllers/paginationController.js';
import { loadPokemons } from './controllers/pokemonController.js';

// Inicializa a paginação e carrega os Pokémon quando a página é carregada
document.addEventListener('DOMContentLoaded', () => {
    const pokemonList = document.getElementById('pokemon_list');
    setupPagination(pokemonList);
    loadPokemons();
});
