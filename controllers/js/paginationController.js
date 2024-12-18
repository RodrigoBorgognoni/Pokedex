import pokeApi from '../../models/js/pokeApi.js';
import { renderPokemonList } from '../../views/js/pokemonListView.js';

const loadNextButton = document.getElementById('loadNext');
let currentOffset = 0;
const limit = 10;
//const firstGen = 151;
let isLoading = false;

function disableButton() {
    loadNextButton.setAttribute('disabled', 'disabled');
    loadNextButton.setAttribute('data-text', loadNextButton.innerText); // Saves original text
    loadNextButton.classList.add('desativado');
    loadNextButton.innerText = 'Fim'; // Changes button text
}

function enableButton() {
    loadNextButton.removeAttribute('disabled');
    loadNextButton.classList.remove('desativado');
    loadNextButton.innerText = loadNextButton.getAttribute('data-text'); //Restores the original text
}

async function loadPokemons(offset, limit, container) {
    try {
        const data = await pokeApi.getPokemons(offset, limit);
        renderPokemonList(data, container);
        isLoading = false;
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
            loadPokemons(currentOffset, limit, container);
/*             //renders only first Gen pokemon
            const quantityPokemonNextPage = currentOffset + limit;
            if (quantityPokemonNextPage >= firstGen) {
                const newLimit = firstGen - currentOffset;
                loadPokemons(currentOffset, newLimit, container);
                disableButton();
            } // Stop multiple loading
            else loadPokemons(currentOffset, limit, container); */
        }
    });
}
