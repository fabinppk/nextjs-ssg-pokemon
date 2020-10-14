import axios from 'axios';

export const getAllPokemons = async (offset, limit) => {
    const pokemons = await axios
        .get(`${process.env.REACT_APP_URL_API_POKEMON}pokemon?offset=${offset}&limit=${limit}`)
        .then((response) => {
            return response.data.results;
        })
        .catch(() => {});

    return pokemons;
};

export const getPokemon = async (url) => {
    const pokemon = await axios
        .get(`${url}`)
        .then((response) => {
            return response.data;
        })
        .catch(() => {});

    return pokemon;
};

export const getPokemonByName = async (name) => {
    const pokemon = await axios
        .get(`${process.env.REACT_APP_URL_API_POKEMON}pokemon/${name}`)
        .then((response) => {
            return response.data;
        })
        .catch(() => {
            // eslint-disable-next-line
            console.log('Não encontrou pokémon');
        });

    return pokemon;
};

export default { getAllPokemons, getPokemon, getPokemonByName };
