function catchPokemon(pokemon) {
    const rate = Math.floor(Math.random() * 100);
    if (rate < 50) {
        return {
            status: 'success',
            message: 'You caught a pokemon!',
            pokemon
        }
    } else {
        return {
            status: 'fail',
            message: 'You failed to catch a pokemon!',
            pokemon
        }
    }
}

function firstLetterUpperCase(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function unique(value, index, self) {
    console.log({ value, index, self });
    return self.indexOf(value) === index;
}

export { catchPokemon, firstLetterUpperCase, unique }