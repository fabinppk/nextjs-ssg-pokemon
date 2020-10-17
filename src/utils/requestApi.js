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
        .get(`https://pokeapi.co/api/v2/pokemon/${name}`)
        .then((response) => {
            return response.data;
        })
        .catch(() => {
            // eslint-disable-next-line
            console.log('Não encontrou pokémon');
        });

    return pokemon;
};

export const getPokemonAreas = async (name) => {
    const areas = await axios
        .get(`${process.env.REACT_APP_URL_API_POKEMON}pokemon/${name}/encounters`)
        .then((response) => {
            return response.data;
        })
        .catch(() => {});

    return areas;
};

export default { getAllPokemons, getPokemon, getPokemonByName, getPokemonAreas };
