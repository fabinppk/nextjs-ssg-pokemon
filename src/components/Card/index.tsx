import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { getPokemonByName } from '../../utils/requestApi';
import { useRouter } from 'next/router';
import Input from '../Input';

export default function Card({ pokemon, nextPokemon }) {
  const router = useRouter();

  const [searchInput, setSearchInput] = useState('');

  const defineGalery = () => {
    let galery = [];
    galery.push(
      <img
        key={pokemon.sprites.back_default}
        src={pokemon.sprites.back_default}
        alt={pokemon.name}
      />
    );
    galery.push(
      <img key={pokemon.sprites.front_shiny} src={pokemon.sprites.front_shiny} alt={pokemon.name} />
    );
    galery.push(
      <img key={pokemon.sprites.back_shiny} src={pokemon.sprites.back_shiny} alt={pokemon.name} />
    );
    return galery;
  };

  const defineTtypeString = () => {
    let typesString = '';
    pokemon.types.map((type) => {
      if (typesString === '') {
        typesString = `${type.type.name}`;
      } else {
        typesString = `${typesString} - ${type.type.name}`;
      }
    });
    return typesString;
  };

  const defineAttacks = () => {
    return pokemon.moves.map((move, i) => {
      if (i >= 5) return;
      return (
        <p key={move.move.url} className="type">
          - {move.move.name.replace(/-/g, ' ')}
        </p>
      );
    });
  };

  const defineAreas = () => {
    return pokemon.areas.map((area, i) => {
      if (i >= 3) return;
      return (
        <p key={area.location_area.url} className="type">
          - {area.location_area.name.replace(/-/g, ' ')}
        </p>
      );
    });
  };

  const handleError = (e) => {
    e.target.onerror = null;
    e.target.src = pokemon.sprites.front_default;
  };

  const setBodyColor = () => {
    if (!window || !document) return;
    const el = document.querySelectorAll('section main');
    if (!el[0]) return;
    const actualTypeColor = window.getComputedStyle(el[0], null).getPropertyValue('background');
    const pokemonName = el[0].querySelectorAll('.main-content > div .name')[0].textContent;
    const theme = `${actualTypeColor.split(',')[4]},${actualTypeColor.split(',')[5]},${
      actualTypeColor.split(',')[6]
    }`;
    document.querySelectorAll('meta[name="theme-color"')[0].setAttribute('content', theme);
  };

  useEffect(() => {
    const getPokemonByNames = async () => {
      let pokemon = null;
      if (searchInput) {
        pokemon = await getPokemonByName(searchInput.toLowerCase());
        if (pokemon) {
          router.push(`/pokemon/${pokemon.name}`);
        }
      } else if (!pokemon) {
        console.log('We dont find any pokémon. :/');
      }
    };
    setBodyColor();
    getPokemonByNames();
  }, [searchInput]);

  return (
    <>
      <header>
        <figure>
          <img src="/img/logo_pokemon.png" alt="logo" />
        </figure>
        <Input
          value={searchInput}
          onChange={(e) => {
            setSearchInput(e.target.value);
          }}
        />
      </header>
      <section>
        <aside>
          <nav>
            <ul>
              <li>
                <Link href={`/pokemon/${nextPokemon.name}`}>
                  <a>{nextPokemon.name}</a>
                </Link>
              </li>
              <li>{pokemon.name}</li>
            </ul>
          </nav>
          <footer>
            <i className="fas fa-chevron-down"></i>
          </footer>
        </aside>
        <main className={`${pokemon.types[0].type.name}`}>
          <img src={`/img/pokemons/${pokemon.name}.png`} onError={handleError} alt={pokemon.name} />
          <div className="main-content">
            <div>
              <span>
                <h1 className="name">{pokemon.name}</h1>
                <h3>
                  <span className="type">{defineTtypeString()}</span>
                </h3>
                <section className="block-column">
                  <div className="block-areas">
                    <h3 className="type">Attacks:</h3>
                    {defineAttacks()}
                  </div>
                  {pokemon.areas.length > 0 && (
                    <div className="block-areas">
                      <h3 className="type">where to find:</h3>
                      {defineAreas()}
                    </div>
                  )}
                </section>
              </span>
              {/* <img src="/img/insideoutlogo.png" alt="Inside-out-logo" /> */}
            </div>
            <footer className="clips">
              <h3 className="type">Images:</h3>
              <div className="image-clips">{defineGalery()}</div>
            </footer>
          </div>
        </main>
      </section>
    </>
  );
}
