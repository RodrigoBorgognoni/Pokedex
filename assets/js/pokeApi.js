const pokeApi = {};

// Function to get the details of a specific Pokémon from its URL
pokeApi.getPokemonDetail = async (pokemon) => {
    try {
        // Fetch the Pokémon details from the provided URL
        const response = await fetch(pokemon.url);
        // Parse the response as JSON and return the result
        return await response.json();
    } catch (error) {
        // Log an error message if fetching the Pokémon details fails
        console.error('Erro ao buscar detalhes dos Pokémons:', error);

        // Re-throw the error to handle it in the calling function
        throw error;
    }
};

// Async function to get a list of Pokémons with their details
pokeApi.getPokemons = async (offset = 0, limit = 18) => {
    // Define the URL with offset and limit parameters
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
    try {
        
        const response = await fetch(url);// Fetch the list of Pokémons from the API
        const json = await response.json();// Parse the response as JSON
        
        const pokemons = json.results;// Extract the list of Pokémons from the JSON response

        // Map over the list of Pokémons to get their details
        const pokeDetailsPromises = pokemons.map(pokeApi.getPokemonDetail);
        // Wait for all the promises to resolve and get the details
        const pokeDetails = await Promise.all(pokeDetailsPromises);
        return pokeDetails;
    } catch (error) {
        console.error('Erro ao buscar dados:', error);
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
};
