import pokeApi from '../../models/pokeApi.js';

const modal = document.getElementById('pokemonModal');
const span = document.getElementsByClassName('close')[0];

export function showModal(pokemonId) {
    const pokemonDetails = document.getElementById('pokemonDetails');
    pokemonDetails.innerHTML = '';

    pokeApi.getPokemonDetail(pokemonId).then((pokemon) => {
        const content = `
        <h2 class="modal_text">${pokemon.name}</h2>
        <div class="modal_pokemon">
            <img src="${pokemon.photo}" alt="${pokemon.name}">
        </div>  
            <span class="modal_text">
                <p>Type: ${pokemon.types.join(', ')}</p>
                <p>Weight: ${parseInt(pokemon.weight)/10} kg</p>
                <p>Height: ${parseInt(pokemon.height)/10} m</p>
            </span>
        `;
        pokemonDetails.innerHTML = content;
    });

    modal.style.display = 'block'; // show modal
}

span.onclick = function () {
    modal.style.display = 'none'; // Close modal
};

window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = 'none'; // Close modal when clicking outside
    }
};
