import pokeApi from '../../models/pokeApi.js';
import { renderPokemonList } from '../../views/js/pokemonListView.js';
import { getGenerationRange } from './utils/utils.js';

const loadNextButton = document.getElementById('loadNext');
let currentOffset = 0;
const limit = 10;
let currentGen = '1';
let isLoading = false;

export function disableButton() {
    loadNextButton.setAttribute('disabled', 'disabled');
    loadNextButton.classList.add('desativado');
    loadNextButton.innerText = 'Fim'; // Changes button text
}

export function enableButton() {
    loadNextButton.removeAttribute('disabled', 'disabled');
    loadNextButton.classList.remove('desativado');
    loadNextButton.innerText = 'Explore Mais Pokémons'; //Restores the original text
}

async function loadPokemonsByGeneration(generation, offset, limit, container) {
    const [startId, endId] = getGenerationRange(generation);
    try {
        const data = await pokeApi.getPokemonsByRange(startId, endId, limit, offset);
        renderPokemonList(data, container);
        isLoading = false;
        if (endId - startId <= offset + limit) {
            disableButton();
        }
    } catch (error) {
        console.error('Erro ao carregar Pokémons:', error);
        window.alert('Não foi possível carregar os Pokémons');
        isLoading = false;
    }
}

export function setupPagination(container) {
    loadNextButton.addEventListener('click', () => {
        if (!isLoading) {
            currentOffset += limit;
            loadPokemonsByGeneration(currentGen, currentOffset, limit, container);
        }
    });
}

export function resetPagination(generation) {
    currentGen = generation;
    currentOffset = 0;
}

export function setCurrentGeneration(generation) {
    currentGen = generation;
}