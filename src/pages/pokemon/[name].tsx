import React from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import { useRouter } from 'next/router';
import Card from '../../components/Card';
import { getAllPokemons, getPokemonByName } from '../../utils/requestApi';

export default function Member({ pokemon, nextPokemon }) {
  const { isFallback } = useRouter();

  if (isFallback) {
    return <p>Carregando...</p>;
  }

  return (
    <div style={{ minWidth: '1366px' }}>
      <Card pokemon={pokemon} nextPokemon={nextPokemon} />
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await getAllPokemons(0, 151);

  const paths = response.map((pikachu) => {
    return { params: { name: pikachu.name } };
  });

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { name } = context.params;

  const response = await getPokemonByName(name);
  const nextPokemon = await getPokemonByName(parseInt(response.id + 1, 10));

  return {
    props: {
      pokemon: response,
      nextPokemon,
    },
    revalidate: 240,
  };
};
