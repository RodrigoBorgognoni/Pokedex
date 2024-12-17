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

// Função para buscar Pokémon por nome ou tipo
async function searchPokemon(query) {
    try {
        const data = await pokeApi.searchPokemon(query); // Buscar Pokémon pela query
        if (data) {
            pokemonList.innerHTML = ''; // Limpar a lista atual
            renderPokemonList(data, pokemonList);
        } else {
            window.alert('Nenhum Pokémon encontrado.');
        }
    } catch (error) {
        console.error('Erro ao buscar Pokémon:', error);
        window.alert('Ocorreu um erro ao tentar buscar os Pokémon. Por favor, tente novamente mais tarde.');
    }
}


// Filter Pokémon quando o usuário clicar no botão
searchButton.addEventListener('click', () => {
    const query = searchInput.value.toLowerCase();
    if (query) {
        searchPokemon(query);
    }
});
// Filtrar Pokémon quando o usuário pressionar Enter no campo de entrada
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const query = searchInput.value.toLowerCase();
        if (query) {
            searchPokemon(query);
        }
    }
});