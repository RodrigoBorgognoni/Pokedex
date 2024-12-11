class Pokemon {
    constructor(order, name, color, types, photo) {
        this.order = order;
        this.name = name;
        this.color = color;
        this.types = types;
        this.photo = photo;
    }
}

// Function to convert API details into an instance of the Pokemon class
export function convertApiDetailsToPokemon(pokeDetail) {
    // Map through the types array in pokeDetail to extract the type names
    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name);
    // Use destructuring to get the first type as the color
    const [color] = types;

    // Create and return a new Pokemon instance with the extracted details
    return new Pokemon(
        pokeDetail.order, // The number of the Pokémon
        pokeDetail.name,  // The name of the Pokémon
        color,            // The primary color/type of the Pokémon
        types,            // Array of all types of the Pokémon
        pokeDetail.sprites.other['official-artwork'].front_default // URL of the Pokémon's official artwork
    );
}
