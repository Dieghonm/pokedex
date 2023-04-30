import React, { useState } from 'react';
import ThemeContext from './ThemeContext';

const ENDPOINT = 'https://pokeapi.co/api/v2/pokemon'

export default function ThemeProvider({ children }) {
  const [pokemons, setPokemons] = useState();

  const fetchPokemon = (endpoint) => {
    fetch(endpoint? endpoint : ENDPOINT)
      .then(response => response.json())
      .then(response => setPokemons(response))
      .then(console.log('fetch'))
    ;
  }

  return (
    <ThemeContext.Provider value={{ pokemons: pokemons, fetchPokemon }}>
      <div>
        { children }
      </div>
    </ThemeContext.Provider>
  );
}