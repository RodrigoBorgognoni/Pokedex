import pokeApi from '../../models/pokeApi.js';

const modal = document.getElementById('pokemonModal');
const span = document.getElementsByClassName('close')[0];

export function showModal(pokemonId) {
    const pokemonDetails = document.getElementById('pokemonDetails');
    pokemonDetails.innerHTML = '';

    pokeApi.getPokemonDetail(pokemonId).then(pokemon => {
        const content = `
            <h2>${pokemon.name}</h2>
            <img src="${pokemon.photo}" alt="${pokemon.name}">
            <p>Type: ${pokemon.types.join(', ')}</p>
            <p>Weight: ${pokemon.weight} kg</p>
            <p>Height: ${pokemon.height} m</p>
        `;
        pokemonDetails.innerHTML = content;
    });

    modal.style.display = 'block'; // show modal
}

span.onclick = function() {
    modal.style.display = 'none'; // Close modal
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = 'none'; // Close modal when clicking outside
    }
}
