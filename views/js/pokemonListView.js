//Function to make the first letter of pokemon Upper Case
//The same outcome can be achieved in CSS using text-transform: capitalize
function capitalizeFirstLetter(pokeName) {
    return pokeName.charAt(0).toUpperCase() + pokeName.slice(1);
}

//renders a Pokemon list inside a container
export function renderPokemonList(pokemons, container) {
    container.innerHTML += pokemons.map((pokemon) => 
        `<li class="pokemon ${pokemon.color}">
            <span class="number">#${pokemon.order.toString().padStart(3, '0')}</span>
            <span class="name">${capitalizeFirstLetter(pokemon.name)}</span>
            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${capitalizeFirstLetter(type)}</li>`).join('')}
                </ol>
                <img src="${pokemon.photo}" alt="${pokemon.name}" />
            </div>
        </li>`
    ).join('');
}
