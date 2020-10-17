import React from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import { useRouter } from 'next/router';
import Card from '../../components/Card';
import { getAllPokemons, getPokemonByName, getPokemonAreas } from '../../utils/requestApi';

export default function Pokemon({ pokemon, nextPokemon }) {
  const { isFallback } = useRouter();

  if (isFallback) {
    return <p>Carregando...</p>;
  }

  return (
    <div className="page-content">
      <Card pokemon={pokemon} nextPokemon={nextPokemon} />
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await getAllPokemons(0, 151);

  const paths = response.map((pokemon) => {
    return { params: { name: pokemon.name } };
  });

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { name } = context.params;

  const pokemon = await getPokemonByName(name);
  const areas = await getPokemonAreas(pokemon.id);
  const nextPokemon = await getPokemonByName(parseInt(pokemon.id + 1, 10));

  return {
    props: {
      pokemon: { ...pokemon, areas },
      nextPokemon,
    },
    revalidate: 240,
  };
};
