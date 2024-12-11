import pokeApi from '../../models/js/pokeApi.js';
import { renderPokemonList } from '../../views/js/pokemonListView.js';

const pokemonList = document.getElementById('pokemon_list');

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
