import React from 'react';
import Link from 'next/link';

export default function Card({ pokemon, nextPokemon }) {
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

  const handleError = (e) => {
    console.log(e.target);
    e.target.onerror = null;
    e.target.src = pokemon.sprites.front_default;
  };

  return (
    <>
      <header>
        <figure>
          <img src="/img/logo_pokemon.png" alt="logo" />
        </figure>
        <div className="inputText">
          <i className="fas fa-search"></i>
          <input type="text" placeholder="Search pokémons..." />
        </div>
        <span className="header-menu">
          <p>Menu</p>
          <i className="fas fa-ellipsis-v"></i>
        </span>
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
          {/* <span className="close">
            <p>Close</p>
            <i className="fa fa-times"></i>
          </span> */}
          <div className="main-content">
            <div>
              <span>
                <h1 className="name">{pokemon.name}</h1>
                <h3>
                  <span className="type">{defineTtypeString()}</span>
                </h3>
                <p className="type">
                  Sadness is literally the very definition and being of sarrow and gloom. She is
                  hardly ever used because Joy is the boss and doesn't want Riley to ever be sad,
                  even when she needs.Because of this, Joy treats Sadness badly.
                </p>
              </span>
              {/* <img src="/img/insideoutlogo.png" alt="Inside-out-logo" /> */}
            </div>
            <footer className="clips">
              <h3 className="type">Images</h3>
              <div className="image-clips">{defineGalery()}</div>
            </footer>
          </div>
        </main>
      </section>
    </>
  );
}
