import { showModal } from '../../controllers/modalController.js';

//Function to make the first letter of pokemon Upper Case
//The same outcome can be achieved in CSS using text-transform: capitalize
function capitalizeFirstLetter(pokeName) {
    return pokeName.charAt(0).toUpperCase() + pokeName.slice(1);
}

//renders a Pokemon list inside a container
export function renderPokemonList(pokemons, container) {
    container.innerHTML += pokemons
        .map(
            (pokemon) =>
                `<li class="pokemon ${pokemon.color}" data-name="${pokemon.name}" data-type="${pokemon.types.join(' ')}" data-id="${
                    pokemon.id
                }"> <span class="number">#${pokemon.id.toString().padStart(3, '0')}</span> <span class="name">${capitalizeFirstLetter(
                    pokemon.name
                )}</span> <div class="detail"> <ol class="types"> ${pokemon.types
                    .map((type) => `<li class="type ${type}">${capitalizeFirstLetter(type)}</li>`)
                    .join('')} </ol> <img src="${pokemon.photo}" alt="${pokemon.name}" /> </div> </li>`
        )
        .join(''); 
    // Adiciona evento de clique para exibir o modal com detalhes do Pokémon
    container.querySelectorAll('.pokemon').forEach((pokemonItem) => {
        const pokemonId = parseInt(pokemonItem.dataset.id, 10); // Remover zeros à esquerda
        pokemonItem.addEventListener('click', () => showModal(pokemonId));
    });
}

// Função para filtrar a lista de Pokémon
export function filterPokemonList(filter, container) {
    const cards = container.querySelectorAll('.pokemon');
    cards.forEach((card) => {
        const name = card.getAttribute('data-name').toLowerCase();
        const type = card.getAttribute('data-type').toLowerCase();
        if (name.includes(filter) || type.includes(filter)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}
