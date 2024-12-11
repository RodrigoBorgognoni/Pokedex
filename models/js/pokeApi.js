import Pokemon from './pokeModel.js';

const pokeApi = {};

// Function to get the details of a specific Pokémon from its URL
pokeApi.getPokemonDetail = async function (pokemon) {
    try {
        const response = await fetch(pokemon.url); // Fetch the Pokémon details from the provided URL
        const data = await response.json(); // Parse the response as JSON and return the result
        return new Pokemon(data.order, data.name, data.color, data.types, data.sprites.other['official-artwork'].front_default);
    } catch (error) {
        console.error('Erro ao buscar detalhes dos Pokémons:', error);
        // Re-throw the error to handle it in the calling function
        throw error;
    }
};

// Async function to get a list of Pokémons with their details
pokeApi.getPokemons = async function (offset = 0, limit = 18) {
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

export default pokeApi;
