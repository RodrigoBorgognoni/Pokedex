export function capitalizeFirstLetter(pokeName) {
    return pokeName.charAt(0).toUpperCase() + pokeName.slice(1);
}

export function pokemonToLi(pokemon) {
    return `
        <li class="pokemon">
            <span class="number">#${pokemon.order.toString().padStart(3, '0')}</span>
            <span class="name">${capitalizeFirstLetter(pokemon.name)}</span>
            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map(typeInfo => `<li class="type">${capitalizeFirstLetter(typeInfo.type.name)}</li>`).join('')}
                </ol>
                <img src="${pokemon.photo}" alt="${pokemon.name}" />
            </div>
        </li>
    `;
}

//renders a Pokemon list inside a container
export function renderPokemonList(pokemons, container) {
    container.innerHTML = pokemons.map(pokemonToLi).join('');
}