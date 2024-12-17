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
pokeApi.getPokemons = async function (offset = 0, limit = 10) {
    // Define the URL with offset and limit parameters
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
    try {
        const response = await fetch(url); // Fetch the list of Pokémons from the API
        const json = await response.json(); // Parse the response as JSON

        const pokemons = json.results; // Extract the list of Pokémons from the JSON response

        // Map over the list of Pokémons to get their details
        const pokeDetailsPromises = pokemons.map((pokemon) => this.getPokemonDetail(pokemon));
        // Wait for all the promises to resolve and get the details
        return await Promise.all(pokeDetailsPromises);
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


