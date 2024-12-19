import { convertApiDetailsToPokemon } from './pokeModel.js';

const pokeApi = {};

// Function to get the details of a specific Pokémon from its URL
pokeApi.getPokemonDetail = async function (pokemonId) {
    try {
        const url = `https://pokeapi.co/api/v2/pokemon/${pokemonId}`;
        const response = await fetch(url);
        const data = await response.json();
        return convertApiDetailsToPokemon(data);
    } catch (error) {
        console.error('Erro ao buscar detalhes dos Pokémons:', error);
        throw error;
    }
};

// Async function to get a list of Pokémons with their details
pokeApi.getPokemonsByRange = async function (startId, endId, limit = 10, offset = 0) {
    try {
        const promises = [];
        const start = startId + offset;
        const end = Math.min(startId + offset + limit - 1, endId);

        for (let id = start; id <= end; id++) {
            const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
            promises.push(fetch(url).then((response) => response.json()));
        }
        const pokemons = await Promise.all(promises);
        return pokemons.map((data) => convertApiDetailsToPokemon(data));
    } catch (error) {
        console.error('Erro ao buscar dados:', error);
        throw error;
    }
};

// async function to search pokemon by name or type
pokeApi.searchPokemon = async function (query) {
    try {
        const urlByName = `https://pokeapi.co/api/v2/pokemon/${query.toLowerCase()}`;
        const responseByName = await fetch(urlByName); // tries to search pokemon by name

        if (responseByName.ok) {
            const dataByName = await responseByName.json();
            // returns converted result
            return [convertApiDetailsToPokemon(dataByName)];
        }

        //If search by name fails, search by type
        const urlByType = `https://pokeapi.co/api/v2/type/${query.toLowerCase()}`;
        const responseByType = await fetch(urlByType); // tries to search pokemon by type

        if (responseByType.ok) {
            const dataByType = await responseByType.json();
            const pokeDetailsPromises = dataByType.pokemon.map((pokeWrapper) => this.getPokemonDetail(pokeWrapper.pokemon));
            return await Promise.all(pokeDetailsPromises);
        }

        // if no result, throw error
        throw new Error('Nenhum Pokémon encontrado para a consulta fornecida.');
    } catch (error) {
        console.error('Erro ao buscar Pokémon:', error);
        throw error;
    }
};

export default pokeApi;
