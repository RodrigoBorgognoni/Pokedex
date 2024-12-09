const offset = 0;
const limit = 10;
const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;

/* fetch(url)
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((error) => console.error('Erro ao buscar dados:', error))
    .finally(() => console.log('Requisição Concluída')); */

//Async function to call PokeApi
async function fetchData(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error('Erro ao buscar dados:', error);
    } finally {
        console.log('Requisição Concluída');
    }
}

//Calling async function fetchData with desired url as param
fetchData(url);
