const pokeApi = {};

//Async function to call PokeApi
pokeApi.getPokemons = async (offset = 0, limit = 9) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
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
