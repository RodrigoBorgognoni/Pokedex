import { convertApiDetailsToPokemon } from './pokeModel.js';

const pokeApi = {};

// Function to get the details of a specific Pokémon from its URL
pokeApi.getPokemonDetail = async function (pokemon) {
    try {
        const response = await fetch(pokemon.url); // Fetch the Pokémon details from the provided URL
        const data = await response.json(); // Parse the response as JSON and return the result
        return convertApiDetailsToPokemon(data);
    } catch (error) {
        console.error('Erro ao buscar detalhes dos Pokémons:', error);
        // Re-throw the error to handle it in the calling function
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

// Async function to get pokemons based on ID range
pokeApi.getPokemonsByRange = async function (startId, endId) {
    const promises = [];
    for (let id = startId; id <= endId; id++) {
        promises.push(fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then((response) => response.json()));
    }
    try {
        const data = await Promise.all(promises);
        return data.map(convertApiDetailsToPokemon);
    } catch (error) {
        console.error('Erro ao buscar Pokémons por intervalo de IDs:', error);
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
